import 'bootstrap/scss/bootstrap-reboot.scss';
import 'bootstrap/scss/bootstrap-grid.scss';
import '@thednp/color-picker/src/scss/color-picker.scss';

import { DefaultColorPicker } from '../src';

const App = () => {
  const onChange = (color: string) => {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.setAttribute(
        'href',
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="${encodeURIComponent(
          color,
        )}"><path d="M0 32a32 32 0 1 0 64 0a32 32 0 1 0 -64 0M21.83 47.18v-30.3q0 -4.65 2.66 -6.79T33 7.96c2.78 -0.15 5.55 0.42 8.04 1.67c0.23 0.13 0.45 0.28 0.66 0.43q2.85 2.1 2.85 6.9v9.97l-6.37 0.82v-9.22q0 -2.55 -0.98 -3.94t-4.05 -1.39q-2.93 0 -3.86 1.46t-0.94 3.79v27.23q0 1.95 1.05 3.23t3.75 1.27q2.77 0 3.9 -1.27t1.13 -3.23v-8.7l6.38 -0.75v10.95q0 3.98 -2.92 6.15t-8.4 2.17c-2.79 0.17 -5.57 -0.45 -8.03 -1.79C25.01 53.6 24.82 53.47 24.64 53.33q-2.81 -2.17 -2.81 -6.15z"></path></svg>`,
      );
    }
  };
  return (
    <div class="container" style={{ padding: '70vh 0' }}>
      <div class="row">
        <div class="col">
          <label for="my-id-red">Default Color Picker</label>
          <DefaultColorPicker
            id="my-id-red"
            value={'red'}
            onChange={onChange}
            colorKeywords={['red', 'green', 'yellow']}
            colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
          />
          <p>This is where we are working on.</p>
        </div>
        <div class="col">
          <label for="my-id-green">Default Color Picker</label>
          <DefaultColorPicker
            id="my-id-green"
            value={'green'}
            format="hsl"
            onChange={onChange}
            colorKeywords={['red', 'green', 'yellow']}
            colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
          />
          <p>This is where we are working on.</p>
        </div>
        <div class="col">
          <label for="my-id-blue">Default Color Picker</label>
          <DefaultColorPicker
            id="my-id-blue"
            value={'blue'}
            format="hwb"
            onChange={onChange}
            colorKeywords={['red', 'green', 'yellow']}
            colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
          />
          <p>This is where we are working on.</p>
        </div>
        <div class="col">
          <label for="my-id-hex">Default Color Picker</label>
          <DefaultColorPicker
            id="my-id-hex"
            class='light'
            value={'orange'}
            format="hex"
            onChange={onChange}
            colorKeywords={['red', 'green', 'yellow']}
            colorPresets={{ hue: 0, hueSteps: 12, lightSteps: 10 }}
          />
          <p>This is where we are working on.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
