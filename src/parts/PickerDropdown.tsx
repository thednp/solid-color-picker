import Color from '@thednp/color';
import { Component, createComponent, createEffect, createSignal, startTransition, Suspense } from 'solid-js';
import type { ControlProps, PickerProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';

const { roundPart } = Color;

const ColorControls: Component<ControlProps> = props => {
  const { locale, format, controlPositions, appearance, hue, saturation, lightness, alpha, fill, fillGradient } =
    usePickerContext();
  const { stringValue } = props;
  const hueGradient =
    'linear-gradient(rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.67%, rgb(0, 255, 0) 33.33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.67%, rgb(255, 0, 255) 83.33%, rgb(255, 0, 0) 100%)';

  return (
    <div class={`color-controls ${format()}`}>
      <div class="color-control" role="presentation" tabIndex={-1}>
        <div class="visual-control visual-control1" style={{ background: fillGradient() }}></div>
        <div
          class="color-pointer knob"
          role="slider"
          tabIndex={0}
          aria-live="polite"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${locale().colorPickerLabels.lightnessLabel} &amp; ${
            locale().colorPickerLabels.saturationLabel
          }`}
          aria-valuetext={`${lightness()}% &amp; ${saturation()}%`}
          aria-valuenow={lightness()}
          style={{ transform: `translate3d(${controlPositions().c1x - 4}px, ${controlPositions().c1y - 4}px, 0px)` }}
        ></div>
      </div>
      <div class="color-control" role="presentation" tabIndex={-1}>
        <div class="visual-control visual-control2" style={{ background: hueGradient }}></div>
        <div
          class="color-slider knob"
          aria-live="polite"
          role="slider"
          tabIndex={0}
          aria-label={locale().colorPickerLabels.hueLabel}
          aria-valuemin={0}
          aria-valuemax={360}
          aria-description={`${locale().colorPickerLabels.valueLabel}: ${stringValue()}. ${
            locale().colorPickerLabels.appearanceLabel
          }: ${appearance()}.`}
          aria-valuetext={`${roundPart(hue() * 100)}°`}
          aria-valuenow={roundPart(hue() * 100)}
          style={{ transform: `translate3d(0px, ${controlPositions().c2y - 4}px, 0px)` }}
        ></div>
      </div>
      <div class="color-control" role="presentation" tabIndex={-1}>
        <div
          class="visual-control visual-control3"
          style={{
            background: `linear-gradient(${fill().setAlpha(1).toRgbString()} 0%, ${fill()
              .setAlpha(0)
              .toRgbString()} 100%)`,
          }}
        ></div>
        <div
          class="color-slider knob"
          aria-live="polite"
          role="slider"
          tabIndex={0}
          aria-label={locale().colorPickerLabels.alphaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${roundPart(alpha() * 100)}%`}
          aria-valuenow={roundPart(alpha() * 100)}
          style={`transform: translate3d(0px, ${controlPositions().c3y - 4}px, 0px);`}
        ></div>
      </div>
    </div>
  );
};

const RGBForm: Component<PickerProps> = props => {
  const { locale, format, color, update, alpha } = usePickerContext();
  const { id } = props;
  const rgb = () => {
    let { r, g, b, a } = color().toRgb();
    [r, g, b] = [r, g, b].map(roundPart) as [number, number, number];
    a = roundPart(alpha() * 100);
    return { r, g, b, a };
  };
  const stringValue = () => {
    const { r, g, b } = rgb();
    return `${format().toUpperCase()}: ${r} ${g} ${b}`;
  };

  const changeRed = (e: Event) =>
    update(new Color({ ...color(), r: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeGreen = (e: Event) =>
    update(new Color({ ...color(), g: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeBlue = (e: Event) =>
    update(new Color({ ...color(), b: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeAlpha = (e: Event) =>
    update(new Color({ ...color(), a: Number((e.currentTarget as HTMLInputElement).value) / 100 }, format()));

  return (
    <div class={`color-dropdown picker${props.class()}`} role="group" id={`${id}-picker`} ref={props.ref}>
      <ColorControls stringValue={stringValue} />
      <div class="color-form rgb">
        <label for={`color_rgb_red_${id}`}>
          <span aria-hidden={true}>R:</span>
          <span class="v-hidden">{locale().colorPickerLabels.redLabel}</span>
        </label>
        <input
          id={`color_rgb_red_${id}`}
          type="number"
          class="color-input red"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={255}
          step={1}
          value={rgb().r}
          onChange={changeRed}
        />
        <label for={`color_rgb_green_${id}`}>
          <span aria-hidden={true}>G:</span>
          <span class="v-hidden">{locale().colorPickerLabels.greenLabel}</span>
        </label>
        <input
          id={`color_rgb_green_${id}`}
          type="number"
          class="color-input green"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={255}
          step={1}
          value={rgb().g}
          onChange={changeGreen}
        />
        <label for={`color_rgb_blue_${id}`}>
          <span aria-hidden={true}>B:</span>
          <span class="v-hidden">{locale().colorPickerLabels.blueLabel}</span>
        </label>
        <input
          id={`color_rgb_blue_${id}`}
          type="number"
          class="color-input blue"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={255}
          step={1}
          value={rgb().b}
          onChange={changeBlue}
        />
        <label for={`color_rgb_alpha_${id}`}>
          <span aria-hidden={true}>A:</span>
          <span class="v-hidden">{locale().colorPickerLabels.alphaLabel}</span>
        </label>
        <input
          id={`color_rgb_alpha_${id}`}
          type="number"
          class="color-input alpha"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={rgb().a}
          onChange={changeAlpha}
        />
      </div>
    </div>
  );
};

const HSLForm: Component<PickerProps> = props => {
  const { format, locale, color, update, alpha } = usePickerContext();
  const { id } = props;
  const hsl = () => {
    let { h, s, l, a } = color().toHsl();
    [h, s, l] = [h, s, l].map((cl, i) => roundPart(cl * (i ? 100 : 360))) as [number, number, number];
    a = roundPart(alpha() * 100);
    return { h, s, l, a };
  };
  const stringValue = () => {
    const { h, s, l } = hsl();
    return `${format().toUpperCase()}: ${h}° ${s}% ${l}%`;
  };

  const changeHue = (e: Event) =>
    update(new Color({ ...color(), h: Number((e.target as HTMLInputElement).value) }, format()));
  const changeSaturation = (e: Event) =>
    update(new Color({ ...color(), s: Number((e.target as HTMLInputElement).value) }, format()));
  const changeLightness = (e: Event) =>
    update(new Color({ ...color(), l: Number((e.target as HTMLInputElement).value) }, format()));
  const changeAlpha = (e: Event) =>
    update(new Color({ ...color(), a: Number((e.target as HTMLInputElement).value) / 100 }, format()));

  return (
    <div class={`color-dropdown picker${props.class()}`} role="group" id={`${id}-picker`} ref={props.ref}>
      <ColorControls stringValue={stringValue} />

      <div class="color-form hsl">
        <label for={`color_hsl_hue_${id}`}>
          <span aria-hidden={true}>H:</span>
          <span class="v-hidden">{locale().colorPickerLabels.hueLabel}</span>
        </label>
        <input
          id={`color_hsl_hue_${id}`}
          type="number"
          class="color-input hue"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={360}
          step={1}
          value={hsl().h}
          onChange={changeHue}
        />
        <label for={`color_hsl_saturation_${id}`}>
          <span aria-hidden={true}>S:</span>
          <span class="v-hidden">{locale().colorPickerLabels.saturationLabel}</span>
        </label>
        <input
          id={`color_hsl_saturation_${id}`}
          type="number"
          class="color-input saturation"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hsl().s}
          onChange={changeSaturation}
        />
        <label for={`color_hsl_lightness_${id}`}>
          <span aria-hidden={true}>L:</span>
          <span class="v-hidden">{locale().colorPickerLabels.lightnessLabel}</span>
        </label>
        <input
          id={`color_hsl_lightness_${id}`}
          type="number"
          class="color-input lightness"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hsl().l}
          onChange={changeLightness}
        />
        <label for={`color_hsl_alpha_${id}`}>
          <span aria-hidden={true}>A:</span>
          <span class="v-hidden">{locale().colorPickerLabels.alphaLabel}</span>
        </label>
        <input
          id={`color_hsl_alpha_${id}`}
          type="number"
          class="color-input alpha"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hsl().a}
          onChange={changeAlpha}
        />
      </div>
    </div>
  );
};

const HWBForm: Component<PickerProps> = props => {
  const { locale, format, color, update, alpha } = usePickerContext();
  const { id } = props;
  const hwb = () => {
    let { h, w, b, a } = color().toHwb();
    [h, w, b] = [h, w, b].map((cl, i) => roundPart(cl * (i ? 100 : 360))) as [number, number, number];
    a = roundPart(alpha() * 100);
    return { h, w, b, a };
  };
  const stringValue = () => {
    const { h, w, b } = hwb();
    return `${format().toUpperCase()}: ${h}° ${w}% ${b}%`;
  };

  const changeHue = (e: Event) =>
    update(new Color({ ...color(), h: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeWhiteness = (e: Event) =>
    update(new Color({ ...color(), w: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeBlackness = (e: Event) =>
    update(new Color({ ...color(), b: Number((e.currentTarget as HTMLInputElement).value) }, format()));
  const changeAlpha = (e: Event) =>
    update(new Color({ ...color(), a: Number((e.currentTarget as HTMLInputElement).value) / 100 }, format()));

  return (
    <div class={`color-dropdown picker${props.class()}`} role="group" id={`${id}-picker`} ref={props.ref}>
      <ColorControls stringValue={stringValue} />

      <div class="color-form hwb">
        <label for={`color_hwb_hue_${id}`}>
          <span aria-hidden={true}>H:</span>
          <span class="v-hidden">{locale().colorPickerLabels.hueLabel}</span>
        </label>
        <input
          id={`color_hwb_hue_${id}`}
          type="number"
          class="color-input hue"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={360}
          step={1}
          value={hwb().h}
          onChange={changeHue}
        />
        <label for={`color_hwb_whiteness_${id}`}>
          <span aria-hidden={true}>W:</span>
          <span class="v-hidden">{locale().colorPickerLabels.whitenessLabel}</span>
        </label>
        <input
          id={`color_hwb_whiteness_${id}`}
          type="number"
          class="color-input whiteness"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hwb().w}
          onChange={changeWhiteness}
        />
        <label for={`color_hwb_blackness-${id}`}>
          <span aria-hidden={true}>B:</span>
          <span class="v-hidden">{locale().colorPickerLabels.blacknessLabel}</span>
        </label>
        <input
          id={`color_hwb_blackness-${id}`}
          type="number"
          class="color-input blackness"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hwb().b}
          onChange={changeBlackness}
        />
        <label for={`color_hwb_alpha_${id}`}>
          <span aria-hidden={true}>A:</span>
          <span class="v-hidden">{locale().colorPickerLabels.alphaLabel}</span>
        </label>
        <input
          id={`color_hwb_alpha_${id}`}
          type="number"
          class="color-input alpha"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hwb().a}
          onChange={changeAlpha}
        />
      </div>
    </div>
  );
};

const HEXForm: Component<PickerProps> = props => {
  const { format, locale, color, update, setValue } = usePickerContext();
  const { id } = props;
  const hex = () => color().toHex();
  const stringValue = () => `${locale().colorPickerLabels.hexLabel}: ${hex().toUpperCase()}`;
  const changeHex = (e: Event & { currentTarget: HTMLInputElement }) => {
    const newValue = e.currentTarget.value;
    const newColor = new Color(newValue, format());
    if (newValue && newValue.length && newColor.isValid) {
      update(newColor);
    }
  };
  const inputHex = (e: Event & { currentTarget: HTMLInputElement }) => {
    const newValue = e.currentTarget.value;
    const newColor = new Color(newValue, format());
    if (newValue && newValue.length && newColor.isValid) {
      setValue(newValue);
    }
  };

  return (
    <div class={`color-dropdown picker${props.class()}`} role="group" id={`${id}-picker`} ref={props.ref}>
      <ColorControls stringValue={stringValue} />

      <div class={'color-form hex'}>
        <label for="color_hex_hex_1">
          <span aria-hidden={true}>#:</span>
          <span class="v-hidden">{locale().colorPickerLabels.hexLabel}</span>
        </label>
        <input
          id={`color_hex_${id}`}
          type="text"
          class="color-input hex"
          autocomplete="off"
          spellcheck={false}
          min={0}
          max={100}
          step={1}
          value={hex()}
          onInput={inputHex}
          onChange={changeHex}
        />
      </div>
    </div>
  );
};

const PartSelection = {
  rgb: RGBForm,
  hex: HEXForm,
  hsl: HSLForm,
  hwb: HWBForm,
};

const PickerDropdown: Component<PickerProps> = props => {
  const { format } = usePickerContext();
  const getPart = () => createComponent(PartSelection[format()], props);
  const [part, setPart] = createSignal(getPart());
  createEffect(() => {
    startTransition(() => {
      setPart(getPart());
    });
  });
  return <Suspense>{part()}</Suspense>;
};

export default PickerDropdown;
