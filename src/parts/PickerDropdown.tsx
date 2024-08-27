import Color from '@thednp/color';
import { keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight, getBoundingClientRect, on, off } from '@thednp/shorty';
import { Component, createComponent, createEffect, createSignal, onCleanup, startTransition, Suspense } from 'solid-js';
import type { ControlProps, PickerProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';
import offsetLength from '../util/offsetLength';

const { roundPart } = Color;

const ColorControls: Component<ControlProps> = props => {
  const { drag, setDrag, color, setColor, locale, setValue, format, controlPositions, setControlPositions } =
    usePickerContext();
  let controlsParentRef!: HTMLDivElement;
  const { stringValue } = props;
  const hueGradient = `linear-gradient(
    rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.67%, 
    rgb(0, 255, 0) 33.33%, 
    rgb(0, 255, 255) 50%, 
    rgb(0, 0, 255) 66.67%, 
    rgb(255, 0, 255) 83.33%, 
    rgb(255, 0, 0) 100%
  )`;
  const hue = () => controlPositions().c2y / offsetLength();
  const lightness = () => roundPart(color().toHsv().v * 100);
  const saturation = () => roundPart(color().toHsv().s * 100);
  const alpha = () => 1 - controlPositions().c3y / offsetLength();
  const fill = () => {
    return new Color({
      h: hue(),
      s: 1,
      l: 0.5,
      a: alpha(),
    });
  };
  const fillGradient = () => {
    const roundA = roundPart(alpha() * 100) / 100;

    return `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,${roundA}) 100%),
          linear-gradient(to right, rgba(255,255,255,${roundA}) 0%, ${fill().toRgbString()} 100%), 
          linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)`;
  };

  const appearance = () => {
    const hsl = color().toHsl();
    const hsv = color().toHsv();
    const hue = roundPart(hsl.h * 360);
    const saturationSource = format() === 'hsl' ? hsl.s : hsv.s;
    const saturation = roundPart(saturationSource * 100);
    const lightness = roundPart(hsl.l * 100);
    const hsvl = hsv.v * 100;

    let colorName = 'black';

    // determine color appearance
    /* istanbul ignore else */
    if (lightness === 100 && saturation === 0) {
      colorName = locale().white;
    } else if (lightness === 0) {
      colorName = locale().black;
    } else if (saturation === 0) {
      colorName = locale().grey;
    } else if (hue < 15 || hue >= 345) {
      colorName = locale().red;
    } else if (hue >= 15 && hue < 45) {
      colorName = hsvl > 80 && saturation > 80 ? locale().orange : locale().brown;
    } else if (hue >= 45 && hue < 75) {
      const isGold = hue > 46 && hue < 54 && hsvl < 80 && saturation > 90;
      const isOlive = hue >= 54 && hue < 75 && hsvl < 80;
      colorName = isGold ? locale().gold : locale().yellow;
      colorName = isOlive ? locale().olive : colorName;
    } else if (hue >= 75 && hue < 155) {
      colorName = hsvl < 68 ? locale().green : locale().lime;
    } else if (hue >= 155 && hue < 175) {
      colorName = locale().teal;
    } else if (hue >= 175 && hue < 195) {
      colorName = locale().cyan;
    } else if (hue >= 195 && hue < 255) {
      colorName = locale().blue;
    } else if (hue >= 255 && hue < 270) {
      colorName = locale().violet;
    } else if (hue >= 270 && hue < 295) {
      colorName = locale().magenta;
    } else if (hue >= 295 && hue < 345) {
      colorName = locale().pink;
    }
    return colorName;
  };
  const pointerDown = (e: PointerEvent & { target: Node; currentTarget: HTMLElement }) => {
    if (e.button !== 0) return;

    const { currentTarget, target, pageX, pageY } = e;
    const elements = [...controlsParentRef.children] as [HTMLElement, HTMLElement, HTMLElement];
    const [visual] = [...currentTarget.children] as [HTMLElement, HTMLElement];

    const { left, top } = getBoundingClientRect(visual as HTMLDivElement);
    const { documentElement } = document;
    const offsetX = pageX - documentElement.scrollLeft - left;
    const offsetY = pageY - documentElement.scrollTop - top;

    setDrag(visual);

    /* istanbul ignore else */
    if (elements[0].contains(target)) {
      changeControl1(offsetX, offsetY);
    } else if (elements[1].contains(target)) {
      changeControl2(offsetY);
    } else if (elements[2].contains(target)) {
      changeAlpha(offsetY);
    }
    e.preventDefault();
  };

  const pointerMove = (e: PointerEvent): void => {
    const { pageX, pageY } = e;
    if (!drag()) return;

    const elements = [...controlsParentRef.children] as [HTMLElement, HTMLElement, HTMLElement];
    const controlRect = getBoundingClientRect(drag() as HTMLElement);
    const { documentElement } = document;
    const offsetX = pageX - documentElement.scrollLeft - controlRect.left;
    const offsetY = pageY - documentElement.scrollTop - controlRect.top;

    if (elements[0].contains(drag() as Node)) {
      changeControl1(offsetX, offsetY);
    } else if (elements[1].contains(drag() as Node)) {
      changeControl2(offsetY);
    } else if (elements[2].contains(drag() as Node)) {
      changeAlpha(offsetY);
    }
  };
  const handleScroll = (e: Event) => {
    const { activeElement } = document;

    /* istanbul ignore next */
    if (
      (['pointermove', 'touchmove'].includes(e.type) && drag()) ||
      (activeElement && controlsParentRef.contains(activeElement))
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  const handleKnobs = (e: Event & { code: string; target: Node }) => {
    const { target, code } = e;

    // only react to arrow buttons
    if (![keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight].includes(code)) return;
    e.preventDefault();

    const elements = [...controlsParentRef.children] as [HTMLElement, HTMLElement, HTMLElement];
    /**
     * @see https://stackoverflow.com/questions/70373659/solidjs-computations-created-outside-a-createroot-or-render-will-never-be
     */
    const { activeElement } = document;
    const yRatio = offsetLength() / 360;

    /* istanbul ignore else */
    if (activeElement === target) {
      /* istanbul ignore else */
      if (elements[0].contains(target)) {
        const xRatio = offsetLength() / 100;

        /* istanbul ignore else */
        if ([keyArrowLeft, keyArrowRight].includes(code)) {
          setControlPositions(prev => {
            const c1x = prev.c1x + (code === keyArrowRight ? xRatio : -xRatio);
            changeControl1(c1x, prev.c1y);
            return { ...prev, c1x };
          });
        } else if ([keyArrowUp, keyArrowDown].includes(code)) {
          setControlPositions(prev => {
            const c1y = prev.c1y + (code === keyArrowDown ? yRatio : -yRatio);
            changeControl1(prev.c1x, c1y);
            return { ...prev, c1y };
          });
        }

        // changeControl1(controlPositions().c1x, controlPositions().c1y);
      } else if (elements[1].contains(target)) {
        setControlPositions(prev => {
          const c2y = prev.c2y + ([keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio);
          changeControl2(c2y);

          return { ...prev, c2y };
        });
      } else if (elements[2].contains(target)) {
        setControlPositions(prev => {
          const c3y = prev.c3y + ([keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio);
          changeAlpha(c3y);

          return { ...prev, c3y };
        });
      }
      handleScroll(e);
    }
  };

  const changeControl1 = (X: number, Y: number) => {
    let [offsetX, offsetY] = [0, 0];

    if (X > offsetLength()) offsetX = offsetLength();
    else if (X >= 0) offsetX = X;

    if (Y > offsetLength()) offsetY = offsetLength();
    else if (Y >= 0) offsetY = Y;

    const hue = controlPositions().c2y / offsetLength();
    const saturation = offsetX / offsetLength();
    const lightness = 1 - offsetY / offsetLength();
    const alpha = 1 - controlPositions().c3y / offsetLength();

    // new color
    const newColor = new Color(
      {
        h: hue,
        s: saturation,
        v: lightness,
        a: alpha,
      },
      format(),
    );
    const newValue = newColor.toString();

    setValue(newValue);
    setColor(newColor);
    setControlPositions(prev => ({
      ...prev,
      c1x: offsetX,
      c1y: offsetY,
    }));
  };

  const changeControl2 = (Y: number) => {
    let offsetY = 0;

    if (Y > offsetLength()) offsetY = offsetLength();
    else if (Y >= 0) offsetY = Y;

    const hue = offsetY / offsetLength();
    const saturation = controlPositions().c1x / offsetLength();
    const lightness = 1 - controlPositions().c1y / offsetLength();
    const alpha = 1 - controlPositions().c3y / offsetLength();

    // new color
    const newColor = new Color(
      {
        h: hue,
        s: saturation,
        v: lightness,
        a: alpha,
      },
      format(),
    );

    const newValue = newColor.toString();
    setValue(newValue);
    setColor(newColor);
    setControlPositions(prev => ({
      ...prev,
      c2y: offsetY,
    }));
  };

  const changeAlpha = (Y: number) => {
    let offsetY = 0;

    if (Y > offsetLength()) offsetY = offsetLength();
    else if (Y >= 0) offsetY = Y;

    // update color alpha
    const alpha = 1 - offsetY / offsetLength();
    const newColor = new Color(color().setAlpha(alpha), format());

    const newValue = newColor.toString();
    setValue(newValue);
    setColor(newColor);
    setControlPositions(prev => ({
      ...prev,
      c3y: offsetY,
    }));
  };

  const toggleGlobalEvents = (add?: boolean) => {
    const action = add ? on : off;
    action(document, 'pointermove', pointerMove);
  };
  createEffect(() => {
    if (drag()) toggleGlobalEvents(true);
    else toggleGlobalEvents();
    onCleanup(toggleGlobalEvents);
  });

  return (
    <div class={`color-controls ${format()}`} ref={controlsParentRef}>
      <div class="color-control" role="presentation" tabIndex={-1} onPointerDown={pointerDown}>
        <div class="visual-control visual-control1" style={{ background: fillGradient() }}></div>
        <div
          class="color-pointer knob"
          role="slider"
          tabIndex={0}
          aria-live="polite"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${locale().lightnessLabel} &amp; ${locale().saturationLabel}`}
          aria-valuetext={`${lightness()}% &amp; ${saturation()}%`}
          aria-valuenow={lightness()}
          onKeyDown={handleKnobs}
          style={{ transform: `translate3d(${controlPositions().c1x - 4}px, ${controlPositions().c1y - 4}px, 0px)` }}
        ></div>
      </div>
      <div class="color-control" role="presentation" tabIndex={-1} onPointerDown={pointerDown}>
        <div class="visual-control visual-control2" style={{ background: hueGradient }}></div>
        <div
          class="color-slider knob"
          aria-live="polite"
          role="slider"
          tabIndex={0}
          aria-label={locale().hueLabel}
          aria-valuemin={0}
          aria-valuemax={360}
          aria-description={`${locale().valueLabel}: ${stringValue()}. ${locale().appearanceLabel}: ${appearance()}.`}
          aria-valuetext={`${roundPart(hue() * 100)}°`}
          aria-valuenow={roundPart(hue() * 100)}
          onKeyDown={handleKnobs}
          style={{ transform: `translate3d(0px, ${controlPositions().c2y - 4}px, 0px)` }}
        ></div>
      </div>
      <div class="color-control" role="presentation" tabIndex={-1} onPointerDown={pointerDown}>
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
          aria-label={locale().alphaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${roundPart(alpha() * 100)}%`}
          aria-valuenow={roundPart(alpha() * 100)}
          onKeyDown={handleKnobs}
          style={{ transform: `translate3d(0px, ${controlPositions().c3y - 4}px, 0px)` }}
        ></div>
      </div>
    </div>
  );
};

const RGBForm: Component<PickerProps> = props => {
  const { locale, format, color, update, controlPositions } = usePickerContext();
  const alpha = () => 1 - controlPositions().c3y / offsetLength();
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
          <span class="v-hidden">{locale().redLabel}</span>
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
          <span class="v-hidden">{locale().greenLabel}</span>
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
          <span class="v-hidden">{locale().blueLabel}</span>
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
          <span class="v-hidden">{locale().alphaLabel}</span>
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
  const { format, locale, color, update, controlPositions } = usePickerContext();
  const alpha = () => 1 - controlPositions().c3y / offsetLength();
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
          <span class="v-hidden">{locale().hueLabel}</span>
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
          <span class="v-hidden">{locale().saturationLabel}</span>
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
          <span class="v-hidden">{locale().lightnessLabel}</span>
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
          <span class="v-hidden">{locale().alphaLabel}</span>
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
  const { locale, format, color, update, controlPositions } = usePickerContext();
  const alpha = () => 1 - controlPositions().c3y / offsetLength();
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
          <span class="v-hidden">{locale().hueLabel}</span>
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
          <span class="v-hidden">{locale().whitenessLabel}</span>
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
          <span class="v-hidden">{locale().blacknessLabel}</span>
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
          <span class="v-hidden">{locale().alphaLabel}</span>
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
  const { format, locale, color, update } = usePickerContext();
  const { id } = props;
  const hex = () => color().toHex();
  const stringValue = () => `${locale().hexLabel}: ${hex().toUpperCase()}`;
  const changeHex = (e: Event & { currentTarget: HTMLInputElement }) => {
    const newValue = e.currentTarget.value;
    const newColor = new Color(newValue, format());
    if (newValue && newValue.length && newColor.isValid) {
      update(newColor);
    }
  };

  return (
    <div class={`color-dropdown picker${props.class()}`} role="group" id={`${id}-picker`} ref={props.ref}>
      <ColorControls stringValue={stringValue} />

      <div class={'color-form hex'}>
        <label for="color_hex_hex_1">
          <span aria-hidden={true}>#:</span>
          <span class="v-hidden">{locale().hexLabel}</span>
        </label>
        <input
          id={`color_hex_${id}`}
          type="text"
          class="color-input hex"
          autocomplete="off"
          spellcheck={false}
          value={hex()}
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
