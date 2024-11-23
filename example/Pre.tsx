import { Suspense, type Accessor, type Component } from 'solid-js';
import { ColorKeywords } from '../src/types/types';
import Files from './assets/files.svg';
import Gear from './assets/gear.svg';
import { toggleCollapse } from './util/toggleCollapse';
import copyToClipboard from './util/copyToClipboard';

type PreProps = {
  color: Accessor<string>;
  format: Accessor<string>;
  theme: Accessor<'dark' | 'light'>;
  lang: Accessor<string>;
  presets?: Accessor<{
    hue: number;
    hueSteps: number;
    lightSteps: number;
    saturation: number;
  }>;
  class?: string;
  id?: string;
  keywords?: Accessor<ColorKeywords>;
};

const Pre: Component<PreProps> = props => {
  const id = () => props.id || 'color-picker-sample-code';
  const className = () => props.class;
  const colorString = () => `  value="${props.color()}"`;
  const formatString = () => (props.format() !== 'rgb' ? '  format="' + props.format() + '"' : '');
  const langString = () => (props.lang() !== 'en' ? '  lang="' + props.lang() + '"' : '');
  const themeString = () => (props.theme() !== 'dark' ? '  theme="' + props.theme() + '"' : '');
  const onChangeString = () => `  onChange={(color) => console.log(color)}`;
  const keywordsString = () =>
    props.keywords && props.keywords().length ? '  colorKeywords={' + JSON.stringify(props.keywords()) + '}' : '';
  const presetsString = () =>
    props.presets && props.presets().hueSteps && props.presets().lightSteps
      ? `  colorPresets={${JSON.stringify(props.presets())}}`
      : '';

  // cannot deconstruct class variable
  return (
    <Suspense>
      <div class="position-relative">
        <pre id={id()} class={className()}>
          <span class="d-block">{'<DefaultColorPicker'}</span>
          <span class={'heading-color'}>
            <span class="d-block">{colorString()}</span>
            <span class="d-block">{formatString()}</span>
            <span class="d-block">{langString()}</span>
            <span class="d-block">{themeString()}</span>
            <span class="d-block">{onChangeString()}</span>
            <span class="d-block">{keywordsString()}</span>
            <span class="d-block">{presetsString()}</span>
          </span>
          <span class="d-block">{`/>`}</span>
        </pre>
        <div class="position-absolute d-flex gap-1" style={{ top: '1rem', right: '1rem' }}>
          <button class="btn-option" onClick={copyToClipboard} data-target={id()}>
            <span class="v-hidden">Copy</span>
            <Files fill="currentColor" />
          </button>
          <button class="btn-option" onClick={toggleCollapse} data-target="color-picker-settings">
            <span class="v-hidden">Settings</span>
            <Gear fill="currentColor" />
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default Pre;
