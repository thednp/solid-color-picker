import Color from '@thednp/color';
import Fill from './assets/fill.svg';
import Banner from './assets/banner.svg';
import './style.css';

import { DefaultColorPicker } from '../src';
import { createSignal } from 'solid-js';
import Pre from './Pre';
import type { SupportedFormat, SupportedLanguage } from '../src/types/types';

const App = () => {
  const [format, setFormat] = createSignal<SupportedFormat>('rgb');
  const [lang, setLang] = createSignal<SupportedLanguage>('en');
  const [direction, setDirection] = createSignal<'rtl' | 'ltr' | null>(null);
  const [instanceColor, setInstanceColor] = createSignal('red');
  const [theme, setTheme] = createSignal<'dark' | 'light'>('dark');
  const favicon = () => document.getElementById('favicon');
  const onChange = (color: string) => {
    const newColor = new Color(color);
    setInstanceColor(color);
    document.documentElement.style.setProperty('--color', newColor.toRgbString());
    document.documentElement.style.setProperty('--color90', new Color(color).spin(90).toRgbString());
    document.documentElement.style.setProperty('--color180', new Color(color).spin(180).toRgbString());
    document.documentElement.style.setProperty('--color270', new Color(color).spin(270).toRgbString());
    (favicon() as HTMLElement).setAttribute(
      'href',
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="${newColor.toRgbString()}"><path d="M0 32a32 32 0 1 0 64 0a32 32 0 1 0 -64 0M21.83 47.18v-30.3q0 -4.65 2.66 -6.79T33 7.96c2.78 -0.15 5.55 0.42 8.04 1.67c0.23 0.13 0.45 0.28 0.66 0.43q2.85 2.1 2.85 6.9v9.97l-6.37 0.82v-9.22q0 -2.55 -0.98 -3.94t-4.05 -1.39q-2.93 0 -3.86 1.46t-0.94 3.79v27.23q0 1.95 1.05 3.23t3.75 1.27q2.77 0 3.9 -1.27t1.13 -3.23v-8.7l6.38 -0.75v10.95q0 3.98 -2.92 6.15t-8.4 2.17c-2.79 0.17 -5.57 -0.45 -8.03 -1.79C25.01 53.6 24.82 53.47 24.64 53.33q-2.81 -2.17 -2.81 -6.15z"></path></svg>`,
    );
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
            <div class="btn-toolbar mb-1">
              <button class={`btn${theme() === 'dark' ? ' active' : ''}`} onClick={() => setTheme('dark')}>
                Dark
              </button>
              <button class={`btn${theme() === 'light' ? ' active' : ''}`} onClick={() => setTheme('light')}>
                Light
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
              theme={theme()}
              lang={lang()}
              value={'red'}
              onChange={onChange}
              colorKeywords={['red', 'green', 'yellow']}
              colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
            />
            <Pre class={'color-picker-sample-code'} color={instanceColor} format={format} lang={lang} theme={theme} />
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-6 mx-auto mb-3" style={{ display: 'flex', 'justify-content': 'space-between' }}>
            <div class="btn-toolbar">
              <button
                class={`btn${direction() === 'rtl' ? ' active' : ''}`}
                onClick={() => {
                  if (direction() === 'rtl') {
                    document.documentElement.removeAttribute('dir');
                    setDirection(null);
                  } else {
                    document.documentElement.setAttribute('dir', 'rtl');
                    setDirection('rtl');
                  }
                }}
              >
                {direction() === 'rtl' ? 'RTL' : 'LTR'}
              </button>
            </div>
            <div class="btn-toolbar scrollable">
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
