/// <reference types="vite/client" />

// Asset module declarations commonly needed for Vite projects
declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

// Allow importing SVGs as React components and as URLs
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
