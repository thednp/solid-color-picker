import Color from '@thednp/color';
import { addListener, removeListener } from '@thednp/event-listener';
import {
  getWindow,
  getElementsByClassName,
  getDocumentElement,
  getBoundingClientRect,
  reflow,
  emulateTransitionEnd,
  getDocument,
  keyArrowUp,
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keySpace,
  keyEnter,
  getElementStyle,
  focus,
  ObjectAssign,
  ObjectKeys,
} from '@thednp/shorty';

import type { Component } from 'solid-js';
import { createSignal, createEffect, onCleanup, startTransition, createMemo } from 'solid-js';
import type { ColorPickerProps } from '../types/types';
import PickerDropdown from '../parts/PickerDropdown';
import MenuDropdown from '../parts/MenuDropdown';
import { PickerContext } from '../parts/ColorPickerContext';
import initialControlPositions from '../util/initialControlPositions';
import { languagePacks, getLanguageStrings } from '../locales/getLanguageStrings';
import Arrow from '../assets/arrow.svg';

// import default color picker style
import './color-picker.css';

let pickerCount = 0;
const { roundPart } = Color;

const DefaultColorPicker: Component<ColorPickerProps> = props => {
  const id = props.id ? props.id : `color-picker-${pickerCount}`;
  const lang = () => props.lang || 'en';
  const theme = () => props.theme || 'dark';
  const format = () => props.format || 'rgb';
  const initValue = () => props.value || 'red';
  const locale = createMemo(() => {
    if (props.lang && 'en' !== props.lang && ObjectKeys(languagePacks).includes(props.lang)) {
      return getLanguageStrings(props.lang);
    }
    const langPack = getLanguageStrings(lang());

    if (props.locale && ObjectKeys(props.locale).length === 35) {
      ObjectAssign(langPack, props.locale);
    }

    return langPack;
  });
  const colorPresets = () => props.colorPresets;
  const colorKeywords = () => props.colorKeywords;
  const placeholder = () =>
    props.placeholder ? props.placeholder : locale().placeholder.replace(/%/g, format().toUpperCase());
  const [offsetWidth, setOffsetWidth] = createSignal(300);
  const [offsetHeight, setOffsetHeight] = createSignal(300);
  const [value, setValue] = createSignal(initValue());
  const [color, setColor] = createSignal(new Color(value(), format()));
  const [open, setOpen] = createSignal(undefined as HTMLDivElement | undefined);
  const [drag, setDrag] = createSignal<HTMLElement | undefined>(undefined);
  const [pickerShown, setPickerShown] = createSignal(false);
  const [menuShown, setMenuShown] = createSignal(false);
  const [position, setPosition] = createSignal('');
  const [controlPositions, setControlPositions] = createSignal(initialControlPositions);
  // allow this to be readily available on typing on inputs
  const isDark = () => {
    const temp = new Color(value());
    return temp.isDark && temp.a > 0.33;
  };
  const className = () =>
    [
      'color-picker',
      ...[props.class ? props.class.split(/\s/) : ''],
      isDark() ? 'txt-dark' : 'txt-light',
      theme() === 'light' ? ' light' : '',
      open() ? 'open' : '',
    ]
      .filter(c => c)
      .join(' ');
  pickerCount += 1;

  let pickerDropdown!: HTMLDivElement;
  let menuDropdown!: HTMLDivElement;
  let input!: HTMLInputElement;

  const controls = () => {
    return [...getElementsByClassName('color-control', pickerDropdown)] as [HTMLElement, HTMLElement, HTMLElement];
  };

  const visuals = () => {
    return [...getElementsByClassName('visual-control', pickerDropdown)] as [HTMLElement, HTMLElement, HTMLElement];
  };

  const knobs = () => {
    return [
      ...getElementsByClassName('color-pointer', pickerDropdown),
      ...getElementsByClassName('color-slider', pickerDropdown),
    ] as [HTMLElement, HTMLElement, HTMLElement];
  };

  const inputs = () => {
    return [...getElementsByClassName('color-input', pickerDropdown)] as [HTMLElement, HTMLElement, HTMLElement];
  };
  const hue = () => controlPositions().c2y / offsetHeight();
  const lightness = () => roundPart(color().toHsv().v * 100);
  const saturation = () => roundPart(color().toHsv().s * 100);
  const alpha = () => 1 - controlPositions().c3y / offsetHeight();
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

  const updateDropdownPosition = () => {
    const elRect = getBoundingClientRect(input);
    const { top, bottom } = elRect;
    const { offsetHeight: elHeight } = input;
    const windowHeight = getDocumentElement(input).clientHeight;
    const dropdown = open();
    if (!dropdown) return;
    const { offsetHeight: dropHeight } = dropdown;
    const distanceBottom = windowHeight - bottom;
    const distanceTop = top;
    const bottomExceed = top + dropHeight + elHeight > windowHeight; // show
    const topExceed = top - dropHeight < 0; // show-top

    if ((dropdown === pickerDropdown || !topExceed) && distanceBottom < distanceTop && bottomExceed) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  };
  const pickerClass = () => {
    return `${open() === pickerDropdown ? ' ' + position() : ''}${pickerShown() ? ' show' : ''}`;
  };
  const menuClass = () => {
    return `${open() === menuDropdown ? ' ' + position() : ''}${menuShown() ? ' show' : ''}`;
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

  const updateControlPositions = createMemo(() => {
    const hsv = color().toHsv();
    const alpha = color().a;
    const hue = hsv.h;
    const saturation = hsv.s;
    const lightness = hsv.v;
    setControlPositions({
      c1x: saturation * offsetWidth(),
      c1y: (1 - lightness) * offsetHeight(),
      c2y: hue * offsetHeight(),
      c3y: (1 - alpha) * offsetHeight(),
    });
  });
  const hideDropdown = () => {
    if (pickerShown()) hidePicker();
    else if (menuShown()) hideMenu();
  };

  /** Event Listeners */
  // handleBlur must be function to allow accessing THIS
  function handleBlur(this: HTMLElement, { relatedTarget }: FocusEvent) {
    if (relatedTarget && !this.contains(relatedTarget as HTMLElement)) {
      hideDropdown();
    }
  }
  const menuKeyHandler = (e: KeyboardEvent & { target: HTMLElement; code: string }) => {
    const { target, code } = e;
    const { previousElementSibling, nextElementSibling, parentElement } = target;
    const isColorOptionsMenu =
      typeof menuDropdown !== 'undefined' && parentElement && menuDropdown.contains(parentElement);
    const allSiblings = parentElement ? [...parentElement.children] : [];
    const columnsCount =
      isColorOptionsMenu && getElementStyle(parentElement, 'grid-template-columns').split(' ').length;
    const currentIndex = allSiblings.indexOf(target);
    const previousElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex - columnsCount];
    const nextElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex + columnsCount];

    if ([keyArrowDown, keyArrowUp, keySpace].includes(code)) {
      // prevent scroll when navigating the menu via arrow keys / Space
      e.preventDefault();
    }
    if (isColorOptionsMenu) {
      if (previousElement && code === keyArrowUp) {
        focus(previousElement as HTMLElement);
      } else if (nextElement && code === keyArrowDown) {
        focus(nextElement as HTMLElement);
      } else if (previousElementSibling && code === keyArrowLeft) {
        focus(previousElementSibling as HTMLElement);
      } else if (nextElementSibling && code === keyArrowRight) {
        focus(nextElementSibling as HTMLElement);
      }
    } else if (previousElementSibling && [keyArrowLeft, keyArrowUp].includes(code)) {
      focus(previousElementSibling as HTMLElement);
    } else if (nextElementSibling && [keyArrowRight, keyArrowDown].includes(code)) {
      focus(nextElementSibling as HTMLElement);
    }

    if ([keyEnter, keySpace].includes(code)) {
      target.click();
    }
  };
  const handleScroll = (e: Event) => {
    const { activeElement } = getDocument(e.target as HTMLElement);

    updateDropdownPosition();

    /* istanbul ignore next */
    if (
      (['pointermove', 'touchmove'].includes(e.type) && drag()) ||
      (activeElement && [...knobs()].includes(activeElement as HTMLElement))
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  const handleDismiss = (e: KeyboardEvent) => {
    if (open() && e.code === 'Escape') hideDropdown();
  };
  const pointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const { currentTarget, target, pageX, pageY } = e;
    const controlWrappers = [...controls()];
    const idx = controlWrappers.indexOf(currentTarget as HTMLElement);
    const [v1, v2, v3] = visuals();
    const [k1, k2, k3] = knobs();
    const visual = visuals()[idx];
    const { left, top } = getBoundingClientRect(visual as HTMLDivElement);
    const html = getDocumentElement(v1);
    const offsetX = pageX - html.scrollLeft - left;
    const offsetY = pageY - html.scrollTop - top;

    /* istanbul ignore else */
    if (visual === v1 || target === k1) {
      setDrag(visual);
      changeControl1(offsetX, offsetY);
    } else if (visual === v2 || target === k2) {
      setDrag(visual);
      changeControl2(offsetY);
    } else if (visual === v3 || target === k3) {
      setDrag(visual);
      changeAlpha(offsetY);
    }
    e.preventDefault();
  };
  const pointerUp = (e: PointerEvent) => {
    const [v1] = visuals();
    const doc = getDocument(v1);
    const [parent] = getElementsByClassName('color-picker open', doc);
    const selection = doc.getSelection();

    if (!drag() && (!selection || !selection.toString().length) && (!parent || !parent.contains(e.target as Node))) {
      hideDropdown();
    }

    setDrag();
  };
  const pointerMove = (e: PointerEvent): void => {
    const [v1, v2, v3] = visuals();
    const { pageX, pageY } = e;

    if (!drag()) return;

    const controlRect = getBoundingClientRect(drag() as HTMLElement);
    const win = getDocumentElement(v1);
    const offsetX = pageX - win.scrollLeft - controlRect.left;
    const offsetY = pageY - win.scrollTop - controlRect.top;

    if (drag() === v1) {
      changeControl1(offsetX, offsetY);
    }

    if (drag() === v2) {
      changeControl2(offsetY);
    }

    if (drag() === v3) {
      changeAlpha(offsetY);
    }
  };
  const handleKnobs = (e: Event & { code: string }) => {
    const { target, code } = e;

    // only react to arrow buttons
    if (![keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight].includes(code)) return;
    e.preventDefault();

    const [k1, k2, k3] = knobs();
    /**
     * @see https://stackoverflow.com/questions/70373659/solidjs-computations-created-outside-a-createroot-or-render-will-never-be
     */
    const [{ offsetWidth, offsetHeight }] = visuals();
    const { activeElement } = getDocument(k1);
    const currentKnob = [k1, k2, k3].find(x => x === activeElement);
    const yRatio = offsetHeight / 360;

    /* istanbul ignore else */
    if (currentKnob) {
      /* istanbul ignore else */
      if (target === k1) {
        const xRatio = offsetWidth / 100;

        /* istanbul ignore else */
        if ([keyArrowLeft, keyArrowRight].includes(code)) {
          setControlPositions({
            ...controlPositions(),
            c1x: controlPositions().c1x + (code === keyArrowRight ? xRatio : -xRatio),
          });
        } else if ([keyArrowUp, keyArrowDown].includes(code)) {
          setControlPositions({
            ...controlPositions(),
            c1y: controlPositions().c1y + (code === keyArrowDown ? yRatio : -yRatio),
          });
        }

        changeControl1(controlPositions().c1x, controlPositions().c1y);
      } else if (target === k2) {
        setControlPositions({
          ...controlPositions(),
          c2y: controlPositions().c2y + ([keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio),
        });
        changeControl2(controlPositions().c2y);
      } else if (target === k3) {
        setControlPositions({
          ...controlPositions(),
          c3y: controlPositions().c3y + ([keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio),
        });
        changeAlpha(controlPositions().c3y);
      }
      handleScroll(e);
    }
  };

  const changeControl1 = (X: number, Y: number) => {
    let [offsetX, offsetY] = [0, 0];

    if (X > offsetWidth()) offsetX = offsetWidth();
    else if (X >= 0) offsetX = X;

    if (Y > offsetHeight()) offsetY = offsetHeight();
    else if (Y >= 0) offsetY = Y;

    const hue = controlPositions().c2y / offsetHeight();
    const saturation = offsetX / offsetWidth();
    const lightness = 1 - offsetY / offsetHeight();
    const alpha = 1 - controlPositions().c3y / offsetHeight();

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

    setValue(newColor.toString());
    setColor(newColor);
    setControlPositions({
      ...controlPositions(),
      c1x: offsetX,
      c1y: offsetY,
    });
  };

  const changeControl2 = (Y: number) => {
    let offsetY = 0;

    if (Y > offsetHeight()) offsetY = offsetHeight();
    else if (Y >= 0) offsetY = Y;

    const hue = offsetY / offsetHeight();
    const saturation = controlPositions().c1x / offsetWidth();
    const lightness = 1 - controlPositions().c1y / offsetHeight();
    const alpha = 1 - controlPositions().c3y / offsetHeight();

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

    setValue(newColor.toString());
    setColor(newColor);
    setControlPositions({
      ...controlPositions(),
      c2y: offsetY,
    });
  };

  const changeAlpha = (Y: number) => {
    let offsetY = 0;

    if (Y > offsetHeight()) offsetY = offsetHeight();
    else if (Y >= 0) offsetY = Y;

    // update color alpha
    const alpha = 1 - offsetY / offsetHeight();
    const newColor = new Color(color().setAlpha(alpha), format());

    setValue(newColor.toString());
    setColor(newColor);
    setControlPositions({
      ...controlPositions(),
      c3y: offsetY,
    });
  };

  const toggleEvents = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    const win = getWindow(input);
    const doc = win.document;
    const [c1, c2, c3] = controls();
    const [k1, k2, k3] = knobs();
    const parent = c1.closest('.color-picker');
    action(win, 'scroll', handleScroll);
    action(win, 'resize', handleResize);
    action(doc, 'keyup', handleDismiss as EventListener);
    action(doc, 'pointerup', pointerUp as EventListener);
    action(doc, 'pointermove', pointerMove as EventListener);
    [c1, c2, c3].forEach(c => action(c, 'pointerdown', pointerDown as EventListener));
    [k1, k2, k3].forEach(k => action(k, 'keydown', handleKnobs as EventListener));
    if (parent) action(parent, 'focusout', handleBlur as EventListener);
    // when no presets/keywords, the menu won't be rendered
    if (typeof menuDropdown !== 'undefined') action(menuDropdown, 'keydown', menuKeyHandler as EventListener);
  };

  const hideTransitionEnd = () => {
    setPosition('');
    setOpen();
    // reset value if not changed
    setValue(color().toString());
  };
  const showMenu = () => {
    setOpen(menuDropdown);
    setPosition('bottom');
    reflow(menuDropdown as HTMLElement);
    startTransition(() => {
      updateDropdownPosition();
      setMenuShown(true);
      setPickerShown(false);
    });
  };
  const hideMenu = () => {
    setMenuShown(false);
    reflow(menuDropdown as HTMLElement);
    emulateTransitionEnd(menuDropdown as HTMLElement, hideTransitionEnd);
  };
  const toggleMenu = () => {
    if (open() !== menuDropdown) {
      showMenu();
    } else {
      hideMenu();
    }
  };
  const showPicker = () => {
    setOpen(pickerDropdown);
    setPosition('bottom');
    reflow(pickerDropdown);
    // update control positions
    handleResize();
    startTransition(() => {
      updateDropdownPosition();
      setPickerShown(true);
      setMenuShown(false);
      input.focus();
    });
  };
  const hidePicker = () => {
    setPickerShown(false);
    reflow(pickerDropdown);
    emulateTransitionEnd(pickerDropdown, hideTransitionEnd);
  };
  const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
    const newValue = e.currentTarget.value;
    const newColor = new Color(newValue, format());
    if (newValue && newValue.length && newColor.isValid) {
      update(newColor);
    }
  };
  const handleResize = () => {
    const [v1] = visuals();
    const getHeight = window.innerWidth >= 980 ? 300 : 230;
    const getWidth = typeof v1 !== 'undefined' && v1.offsetWidth ? v1.offsetWidth : getHeight;
    setOffsetHeight(getHeight);
    setOffsetWidth(getWidth);
    startTransition(updateControlPositions);
  };
  const update = (newColor: Color) => {
    setColor(newColor);
    setValue(newColor.toString());
  };

  createEffect(() => {
    if (pickerShown() || menuShown()) {
      toggleEvents(true);
    } else if (!pickerShown() && !menuShown()) {
      toggleEvents();
    }

    onCleanup(toggleEvents);
  });

  createMemo(() => {
    if (typeof props.onChange === 'function') {
      props.onChange(value());
    }
  });
  createMemo(() => {
    update(new Color(value(), format()));
  });

  return (
    <PickerContext.Provider
      value={{
        format,
        locale,
        value,
        setValue,
        color,
        setColor,
        drag,
        setDrag,
        visuals,
        knobs,
        inputs,
        controlPositions,
        setControlPositions,
        updateControlPositions,
        appearance,
        update,
        hue,
        saturation,
        lightness,
        alpha,
        fill,
        fillGradient,
      }}
    >
      <div class={className()} lang={lang()}>
        <button
          class="picker-toggle btn-appearance"
          aria-expanded={pickerShown()}
          aria-haspopup={true}
          onClick={showPicker}
        >
          <span class="v-hidden">{`${locale().pickerLabel}. ${locale().formatLabel}: ${format().toUpperCase()}`}</span>
        </button>
        <input
          ref={input}
          type="text"
          name={id}
          id={id}
          class="color-preview btn-appearance"
          autocomplete="off"
          spellcheck={false}
          placeholder={placeholder()}
          value={value()}
          tabindex={-1}
          style={`background-color: ${value()}`}
          onFocus={showPicker}
          onChange={handleChange}
        />
        <PickerDropdown id={id} class={pickerClass} ref={pickerDropdown} />

        <MenuDropdown
          id={id}
          class={menuClass}
          ref={menuDropdown}
          colorPresets={colorPresets}
          colorKeywords={colorKeywords}
        >
          <button
            class="menu-toggle btn-appearance"
            tabindex={menuShown() || pickerShown() ? 0 : -1}
            aria-expanded={menuShown()}
            aria-haspopup={true}
            onClick={toggleMenu}
          >
            <span class="v-hidden">{locale().toggleLabel}</span>
            <Arrow />
          </button>
        </MenuDropdown>
      </div>
    </PickerContext.Provider>
  );
};

export default DefaultColorPicker;
