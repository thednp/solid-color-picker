import { ObjectEntries, ObjectKeys, ObjectValues } from '@thednp/shorty';
import Color from '@thednp/color';
import { For, createEffect, createSignal } from 'solid-js';
import Fill from './assets/fill.svg';
import Banner from './assets/banner.svg';
import Plus from './assets/plus.svg';
import './style.css';

import Pre from './Pre';
import { DefaultColorPicker } from '../src';
import { getLanguageStrings } from '../src/locales/getLanguageStrings';
import type { SupportedFormat, SupportedLanguage } from '../src/types/types';
import getLocale from './util/locales';

const App = () => {
  const [format, setFormat] = createSignal<SupportedFormat>('rgb');
  const [lang, setLang] = createSignal<SupportedLanguage>('en');
  // const [direction, setDirection] = createSignal<'rtl' | 'ltr' | null>(null);
  const [instanceColor, setInstanceColor] = createSignal('red');
  const [theme, setTheme] = createSignal<'dark' | 'light'>('dark');
  const favicon = () => document.getElementById('favicon');
  const locale = () => getLanguageStrings(lang());
  const [hue, setHue] = createSignal(0);
  const [lightSteps, setLightSteps] = createSignal(10);
  const [hueSteps, setHueSteps] = createSignal(12);
  const [saturation, setSaturation] = createSignal(100);
  const presets = () => ({ hue: hue(), hueSteps: hueSteps(), lightSteps: lightSteps(), saturation: saturation() });
  const [keywords, setKeywords] = createSignal<{ [x: string]: string }[]>([
    { default: 'rgb(37, 84, 189)' },
    { complementary: 'rgb(189, 142, 37)' },
  ]);
  const [colorLabel, setColorLabel] = createSignal('');
  const [colorValue, setColorValue] = createSignal('');
  const [palette, setPalette] = createSignal(true);
  const appLocale = () => getLocale(lang());
  const resetKeywordForm = () => {
    setColorValue('');
    setColorLabel('');
  };
  createEffect(() => {
    const newLang = lang();
    if (newLang === 'ar') {
      // setDirection('rtl');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      // setDirection(null);
      document.documentElement.removeAttribute('dir');
    }
  });
  const onChange = (color: string) => {
    const newColor = new Color(color);
    const newColor90 = new Color(color).spin(90);
    const newColor180 = new Color(color).spin(180);
    const newColor270 = new Color(color).spin(270);
    setInstanceColor(color);
    document.documentElement.style.setProperty('--color', newColor.toRgbString());
    document.documentElement.style.setProperty('--color90', newColor90.toRgbString());
    document.documentElement.style.setProperty('--color180', newColor180.toRgbString());
    document.documentElement.style.setProperty('--color270', newColor270.toRgbString());
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
            <h1 class="v-hidden">Solid Color Picker</h1>
            <Banner class="logo mx-auto" />
          </div>
        </div>
      </header>
      <main class="container">
        <div class="row">
          <div class="col col-lg-6 mx-auto">
            <label class="v-hidden" for="my-color-picker">
              Default Color Picker
            </label>
            <DefaultColorPicker
              id="my-color-picker"
              format={format()}
              theme={theme()}
              lang={lang()}
              value={'rgb(37, 84, 189)'}
              onChange={onChange}
              colorKeywords={keywords().length ? keywords() : undefined}
              colorPresets={palette() ? presets() : undefined}
            />
            <Pre
              id={'color-picker-sample-code'}
              class={'position-relative mb-3'}
              color={instanceColor}
              format={format}
              lang={lang}
              theme={theme}
              presets={palette() ? presets : undefined}
              keywords={keywords().length ? keywords : undefined}
            />
          </div>
        </div>

        <div class="collapse" id="color-picker-settings">
          <div class="row">
            <div class="col col-lg-6 d-flex mb-3 mx-auto">
              <span>{locale().formatLabel}</span>
              <div class="btn-toolbar gap-1 ms-auto">
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
            <div class="col col-lg-6 d-flex mb-3 mx-auto">
              <span>{appLocale().theme}</span>
              <div class="btn-toolbar ms-auto">
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
              <div class="d-flex mb-3 gap-1">
                <div class="col d-flex gap-1">
                  <input
                    id={`enable_palette`}
                    class="m-0"
                    type="checkbox"
                    autocomplete="off"
                    checked={palette()}
                    onChange={() => setPalette(!palette())}
                  />
                  <label class="m-0" for="enable_palette">
                    {appLocale().palette}
                  </label>
                </div>
                <div class="col ms-auto">
                  <div class="d-flex gap-1">
                    <div class="col">
                      <label for="hue_select" class="v-hidden">
                        {locale().hueLabel}
                      </label>
                      <input
                        id={`hue_select`}
                        type="number"
                        class="input"
                        autocomplete="off"
                        min={0}
                        max={359}
                        step={1}
                        spellcheck={false}
                        placeholder={locale().hueLabel}
                        value={hue()}
                        onChange={e => setHue(Number(e.target.value))}
                      />
                    </div>
                    <div class="col">
                      <label for="hueSteps_select" class="v-hidden">
                        {appLocale().hueSteps}
                      </label>
                      <input
                        id={`hueSteps_select`}
                        type="number"
                        class="input"
                        autocomplete="off"
                        min={1}
                        max={24}
                        step={1}
                        spellcheck={false}
                        value={hueSteps()}
                        placeholder={appLocale().hueSteps}
                        onChange={e => setHueSteps(Number(e.target.value))}
                      />
                    </div>
                    <div class="col">
                      <label class="v-hidden" for="lightSteps_select">
                        {appLocale().ligthSteps}
                      </label>
                      <input
                        id={`lightSteps_select`}
                        type="number"
                        class="input"
                        autocomplete="off"
                        min={1}
                        max={24}
                        step={1}
                        spellcheck={false}
                        value={lightSteps()}
                        placeholder={appLocale().ligthSteps}
                        onChange={e => setLightSteps(Number(e.target.value))}
                      />
                    </div>
                    <div class="col">
                      <label for="saturation_select" class="v-hidden">
                        {locale().saturationLabel}
                      </label>
                      <input
                        id={`saturation_select`}
                        type="number"
                        class="input"
                        autocomplete="off"
                        min={1}
                        max={100}
                        step={1}
                        spellcheck={false}
                        value={saturation()}
                        placeholder={locale().saturationLabel}
                        onChange={e => setSaturation(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-6 mx-auto">
              <div class="d-flex mb-3">
                <div class="col me-auto">{locale().presetsLabel}</div>
                <div class="col d-flex align-items-center gap-1">
                  <label for="add_key_label">
                    <span class="v-hidden">{appLocale().label}</span>
                  </label>
                  <input
                    id={`add_key_label`}
                    type="string"
                    class="input"
                    autocomplete="off"
                    spellcheck={false}
                    placeholder={appLocale().label}
                    value={colorLabel()}
                    onChange={e => setColorLabel(e.target.value)}
                  />
                  <label for="add_key_value">
                    <span class="v-hidden">{appLocale().value}</span>
                  </label>
                  <input
                    id={`add_key_value`}
                    type="string"
                    class="input"
                    autocomplete="off"
                    spellcheck={false}
                    placeholder={appLocale().value}
                    value={colorValue()}
                    onChange={e => setColorValue(e.target.value)}
                  />
                  <button
                    class="btn-option m-0 p-0"
                    onClick={() => {
                      const newColor = new Color(colorValue() || colorLabel());
                      if (!colorValue() && !colorLabel()) {
                        return alert(appLocale().noColor);
                      }
                      if (!newColor.isValid) {
                        const temp = colorValue() || colorLabel();
                        resetKeywordForm();
                        return alert(appLocale().invalidColor.replace(/\%/g, temp));
                      }
                      if (keywords().some(k => ObjectValues(k)[0] === colorLabel())) {
                        const temp = colorLabel();
                        resetKeywordForm();
                        return alert(appLocale().invalidLabel.replace(/\%/g, temp));
                      }
                      setKeywords([
                        ...keywords(),
                        !colorValue() ? { [colorLabel()]: colorLabel() } : { [colorLabel()]: colorValue() },
                      ]);
                      resetKeywordForm();
                    }}
                  >
                    <span class="v-hidden">Add</span>
                    <Plus style={{ 'vertical-align': 'middle' }} />
                  </button>
                </div>
              </div>
              {keywords().length ? (
                <div class="d-flex justify-content-end mb-3">
                  <div class="btn-toolbar gap-1">
                    <For each={keywords()}>
                      {kwd => {
                        const [k] = ObjectEntries(kwd)[0] as [string, string];
                        return (
                          <button
                            class="btn"
                            onClick={() => setKeywords(keywords().filter(kw => ObjectKeys(kw)[0] !== k))}
                          >
                            {k}
                          </button>
                        );
                      }}
                    </For>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-6 d-flex justify-content-between mx-auto mb-3">
              <span>{appLocale().language}</span>
              <div class="btn-toolbar scrollable">
                <button class={`btn${lang() === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>
                  EN
                </button>
                <button class={`btn${lang() === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>
                  RU
                </button>
                <button class={`btn${lang() === 'ar' ? ' active' : ''}`} onClick={() => setLang('ar')}>
                  AR
                </button>
                <button class={`btn${lang() === 'fr' ? ' active' : ''}`} onClick={() => setLang('fr')}>
                  FR
                </button>
                <button class={`btn${lang() === 'de' ? ' active' : ''}`} onClick={() => setLang('de')}>
                  DE
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
