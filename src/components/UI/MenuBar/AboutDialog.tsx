import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../Dialog';

/** Minimal manifest shape the App menu + About dialog need. */
export interface AboutManifest {
  displayName: string;
  version?: string;
  description?: string;
  author?: string | { name: string; email?: string; url?: string };
}

export interface AboutDialogProps {
  manifest: AboutManifest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function authorName(author: AboutManifest['author']): string | null {
  if (!author) return null;
  return typeof author === 'string' ? author : author.name;
}

/**
 * Returfs-standard "About {extension}" dialog, opened from the App menu. Renders
 * the extension's identity from its manifest. Controlled so the App menu's About
 * item drives it (see `useExtensionMenuBar`).
 */
export function AboutDialog({
  manifest,
  open,
  onOpenChange,
}: AboutDialogProps) {
  const author = authorName(manifest.author);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>{manifest.displayName}</DialogTitle>
          {manifest.description && (
            <DialogDescription>{manifest.description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-1 text-sm">
          {manifest.version && (
            <div className="flex justify-between gap-4">
              <span className="opacity-60">Version</span>
              <span>{manifest.version}</span>
            </div>
          )}
          {author && (
            <div className="flex justify-between gap-4">
              <span className="opacity-60">Author</span>
              <span>{author}</span>
            </div>
          )}
        </div>

        <p className="text-xs opacity-50">Powered by Returfs</p>
      </DialogContent>
    </Dialog>
  );
}
