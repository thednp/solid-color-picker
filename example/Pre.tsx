import type { Accessor, Component } from 'solid-js';

type PreProps = {
  color: Accessor<string>;
  format: Accessor<string>;
  theme: Accessor<'dark' | 'light'>;
  lang: Accessor<string>;
  class?: string;
};

const Pre: Component<PreProps> = props => {
  const { lang, color, format, theme } = props;

  // cannot deconstruct class variable
  return (
    <pre class={props.class}>
      <span class="d-block">{`<DefaultColorPicker`}</span>
      <span style={{ color: 'var(--heading-color)' }}>
        {`  value="${color()}"
  format="${format()}"
  lang="${lang()}"
  theme="${theme()}"
  onChange={(color) => console.log(color)}
  colorKeywords={['red', 'green', 'yellow']}
  colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}`}
      </span>
      <span class="d-block">{`/>`}</span>
    </pre>
  );
};

export default Pre;
