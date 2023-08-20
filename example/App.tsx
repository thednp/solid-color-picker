import Color from '@thednp/color';
import Fill from './assets/fill.svg';
import Banner from './assets/banner.svg';
import './light.css';
import './style.css';

import { DefaultColorPicker } from '../src';
import { createSignal } from 'solid-js';
import Pre from './Pre';
import type { SupportedFormat, SupportedLanguage } from '../src/types/types';

const App = () => {
  const [format, setFormat] = createSignal<SupportedFormat>('rgb');
  const [lang, setLang] = createSignal<SupportedLanguage>('en');
  const [instanceColor, setInstanceColor] = createSignal('red');
  const onChange = (color: string) => {
    const newColor = new Color(color);
    setInstanceColor(color);
    document.documentElement.style.setProperty('--color', newColor.toRgbString());
    document.documentElement.style.setProperty('--color90', new Color(color).spin(90).toRgbString());
    document.documentElement.style.setProperty('--color180', new Color(color).spin(180).toRgbString());
    document.documentElement.style.setProperty('--color270', new Color(color).spin(270).toRgbString());
    document.documentElement.style.setProperty(
      '--text-color',
      newColor.isDark && newColor.a > 0.33 ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
    );
    document.documentElement.style.setProperty(
      '--heading-color',
      newColor.isDark && newColor.a > 0.33 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
    );
    document.documentElement.style.setProperty(
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
          <div class="col col-lg-6 mx-auto" style={{ display: 'flex', 'justify-content': 'space-between' }}>
            <div class="btn-toolbar mb-1">
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
              lang={lang()}
              value={'red'}
              onChange={onChange}
              colorKeywords={['red', 'green', 'yellow']}
              colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
            />
            <Pre color={instanceColor} format={format} />
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-6 mx-auto text-center btn-toolbar scrollable mb-1">
            <button class={`btn${lang() === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>
              EN
            </button>
            <button class={`btn${lang() === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>
              RU
            </button>
            <button class={`btn${lang() === 'fr' ? ' active' : ''}`} onClick={() => setLang('fr')}>
              FR
            </button>
            <button class={`btn${lang() === 'es' ? ' active' : ''}`} onClick={() => setLang('es')}>
              ES
            </button>
            <button class={`btn${lang() === 'ro' ? ' active' : ''}`} onClick={() => setLang('ro')}>
              RO
            </button>
            <button class={`btn${lang() === 'pl' ? ' active' : ''}`} onClick={() => setLang('pl')}>
              PL
            </button>
            <button class={`btn${lang() === 'pt' ? ' active' : ''}`} onClick={() => setLang('pt')}>
              PT
            </button>
            <button class={`btn${lang() === 'ja' ? ' active' : ''}`} onClick={() => setLang('ja')}>
              JP
            </button>
            <button class={`btn${lang() === 'zh' ? ' active' : ''}`} onClick={() => setLang('zh')}>
              ZH
            </button>
            <button class={`btn${lang() === 'ko' ? ' active' : ''}`} onClick={() => setLang('ko')}>
              KO
            </button>
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
