import Color from '@thednp/color';
import Fill from './assets/fill.svg';
import Banner from './assets/banner.svg';
import './light.css';
import './style.css';

import { DefaultColorPicker } from '../src';
import { createSignal } from 'solid-js';
import Pre from './Pre';
import { SupportedFormat } from '../src/types/types';

const App = () => {
  const [format, setFormat] = createSignal<SupportedFormat>('rgb');
  const [instanceColor, setInstanceColor] = createSignal('red');
  const onChange = (color: string) => {
    const newColor = new Color(color);
    setInstanceColor(color);
    document.body.style.setProperty('--color', newColor.toRgbString());
    document.body.style.setProperty('--color90', new Color(color).spin(90).toRgbString());
    document.body.style.setProperty('--color180', new Color(color).spin(180).toRgbString());
    document.body.style.setProperty('--color270', new Color(color).spin(270).toRgbString());
    document.body.style.setProperty(
      '--text-color',
      newColor.isDark && newColor.a > 0.33 ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
    );
    document.body.style.setProperty(
      '--heading-color',
      newColor.isDark && newColor.a > 0.33 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
    );
    document.body.style.setProperty(
      '--bg-color',
      newColor.isDark && newColor.a > 0.33 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.10)',
    );
  };
  return (
    <>
      <div class="fill-wrapper">
        <Fill class="fill" />
      </div>
      <header class="container">
        <div class="row">
          <div class="col col-lg-6 mx-auto mb-5" style={{ 'padding-top': '15vh' }}>
            <h1 class="visually-hidden">Solid Color Picker</h1>
            <Banner class="logo mx-auto" />
          </div>
        </div>
      </header>
      <main class="container">
        <div class="row">
          <div class="col col-lg-6 mx-auto">
            <div class="btn-toolbar mb-3">
              <button class={`btn${format() === 'rgb' ? ' active' : ''}`} onClick={() => setFormat('rgb')}>
                RGB
              </button>
              <button class={`btn${format() === 'hsl' ? ' active' : ''}`} onClick={() => setFormat('hsl')}>
                HSL
              </button>
              <button class={`btn${format() === 'hwb' ? ' active' : ''}`} onClick={() => setFormat('hwb')}>
                HWB
              </button>
              <button class={`btn${format() === 'hex' ? ' active' : ''}`} onClick={() => setFormat('hex')}>
                HEX
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-6 mx-auto">
            <label class="visually-hidden" for="my-id-red">
              Default Color Picker
            </label>
            <DefaultColorPicker
              id="my-id-red"
              format={format()}
              value={'red'}
              onChange={onChange}
              colorKeywords={['red', 'green', 'yellow']}
              colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
            />
            <Pre color={instanceColor} format={format} />
          </div>
        </div>
      </main>
      <footer class="d-block">
        <div class="row">
          <div class="col col-lg-6 mx-auto">
            <div class="d-flex justify-content-between">
              <p class="copy">
                <a target="_blank" href="https://github.com/thednp">
                  thednp
                </a>{' '}
                © {new Date().getFullYear()}
              </p>
              <p class="links">
                <a
                  target="_blank"
                  href="https://github.com/thednp/solid-color-picker"
                  title="Solid Color Picker on Github"
                >
                  Github
                </a>
                {' / '}
                <a
                  target="_blank"
                  href="https://www.npmjs.com/package/@thednp/solid-color-picker"
                  title="Solid Color Picker on NPM"
                >
                  NPM
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
