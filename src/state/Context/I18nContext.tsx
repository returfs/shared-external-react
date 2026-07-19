import React, { useEffect } from 'react';
import i18next, { type i18n as I18nInstance, type Resource } from 'i18next';
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
  Trans as I18nextTrans,
} from 'react-i18next';

export const DEFAULT_LOCALE = 'en';

/**
 * One shared i18next instance for the whole app. Because extensions externalise
 * this package as a federated singleton, the host and every extension resolve to
 * this exact instance, so they share one active locale and one catalogue set.
 * Mirrors how the host governs the accent theme via ThemeContext.
 */
export const i18n: I18nInstance = i18next.createInstance();

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    // Namespaces are added lazily by the host (per surface) and by extensions
    // (ext:<id>), so we start empty and never block render on a missing key.
    ns: [],
    defaultNS: 'common',
    resources: {},
    interpolation: { escapeValue: false },
    // We inline catalogues synchronously (SSR-friendly), so suspense is off.
    react: { useSuspense: false },
    returnNull: false,
  });
}

/**
 * Register a catalogue for a host surface, e.g. addResources('en', 'settings', {...}).
 * Safe to call repeatedly; later calls deep-merge over earlier ones.
 */
export function addResources(
  locale: string,
  namespace: string,
  resources: Record<string, unknown>,
): void {
  i18n.addResourceBundle(locale, namespace, resources, true, true);
}

/**
 * Register a catalogue owned by an extension. Namespaced as `ext:<id>` so a
 * third-party extension can never collide with core or another extension.
 */
export function addExtensionCatalog(
  extensionId: string,
  locale: string,
  resources: Record<string, unknown>,
): void {
  addResources(locale, `ext:${extensionId}`, resources);
}

interface I18nProviderProps {
  /** Active locale. Host resolves this (cookie > SSR > setting > default). */
  locale?: string;
  /** Optional catalogues to register on mount, keyed by locale then namespace. */
  resources?: Resource;
  children: React.ReactNode;
}

export const I18nProvider = ({
  locale = DEFAULT_LOCALE,
  resources,
  children,
}: I18nProviderProps) => {
  // Register any provided catalogues once, before first paint, so SSR and the
  // initial client render agree.
  if (resources) {
    for (const [loc, namespaces] of Object.entries(resources)) {
      for (const [ns, bundle] of Object.entries(namespaces)) {
        if (!i18n.hasResourceBundle(loc, ns)) {
          addResources(loc, ns, bundle as Record<string, unknown>);
        }
      }
    }
  }

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

/**
 * Translate within a namespace: `const t = useT('settings')`.
 * Defaults to the `common` namespace when none is given.
 */
export const useT = (namespace: string = 'common') => {
  const { t, i18n: instance } = useTranslation(namespace);
  return Object.assign(t, { i18n: instance });
};

export const Trans = I18nextTrans;
