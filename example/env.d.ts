declare module '*.svg' {
  import type { JSX } from 'solid-js';
  const content: JSX.Component<JSX.CoreSVGAttributes<SVGSVGElement>>;
  export default content;
}
