import Color from '@thednp/color';
import {
  getBoundingClientRect,
  focus,
  reflow,
  emulateTransitionEnd,
  ObjectAssign,
  ObjectKeys,
  KeyboardEventHandler,
  PointerEventHandler,
  on,
  off,
} from '@thednp/shorty';

import { type Component, JSX, createSignal, createEffect, onCleanup, startTransition, createMemo } from 'solid-js';
import type { ColorPickerProps } from '../types/types';
import PickerDropdown from '../parts/PickerDropdown';
import MenuDropdown from '../parts/MenuDropdown';
import { PickerContext } from '../parts/ColorPickerContext';
import initialControlPositions from '../util/initialControlPositions';
import offsetLength from '../util/offsetLength';
import { languagePacks, getLanguageStrings } from '../locales/getLanguageStrings';
import Arrow from '../assets/arrow.svg';

// import default color picker style
import './color-picker.css';

let pickerCount = 0;

const DefaultColorPicker: Component<ColorPickerProps> = props => {
  const id = props.id ? props.id : `color-picker-${pickerCount}`;
  const lang = () => props.lang || 'en';
  const theme = () => props.theme || 'dark';
  const format = () => props.format || 'rgb';
  const initValue = () => props.value || 'red';
  const colorPresets = () => props.colorPresets;
  const colorKeywords = () => props.colorKeywords;
  const placeholder = () =>
    props.placeholder ? props.placeholder : locale().placeholder.replace(/%/g, format().toUpperCase());
  const [value, setValue] = createSignal(initValue());
  const [color, setColor] = createSignal(new Color(initValue(), format()));
  const [open, setOpen] = createSignal(undefined as HTMLDivElement | undefined);
  const [drag, setDrag] = createSignal<HTMLElement | undefined>(undefined);
  const [pickerShown, setPickerShown] = createSignal(false);
  const [menuShown, setMenuShown] = createSignal(false);
  const [position, setPosition] = createSignal('');
  const [controlPositions, setControlPositions] = createSignal(initialControlPositions);
  const locale = createMemo(() => {
    if ('en' !== lang() && ObjectKeys(languagePacks).includes(lang())) {
      return getLanguageStrings(lang());
    }
    const langPack = getLanguageStrings(lang());

    if (props.locale && ObjectKeys(props.locale).length === 35) {
      ObjectAssign(langPack, props.locale);
    }

    return langPack;
  });

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

  // update id
  pickerCount += 1;

  let mainRef!: HTMLDivElement;
  let pickerDropdown!: HTMLDivElement;
  let menuDropdown!: HTMLDivElement;
  let input!: HTMLInputElement;

  const pickerClass = () => {
    return `${open() === pickerDropdown ? ' ' + position() : ''}${pickerShown() ? ' show' : ''}`;
  };
  const menuClass = () => {
    return `${open() === menuDropdown ? ' ' + position() : ''}${menuShown() ? ' show' : ''}`;
  };

  // toggle visibility
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
  const hideDropdown = () => {
    if (pickerShown()) hidePicker();
    else if (menuShown()) hideMenu();
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
    updateControlPositions();
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

  /** Event Listeners */
  const handleBlur: JSX.FocusEventHandlerUnion<HTMLDivElement, FocusEvent> = ({ currentTarget, relatedTarget }) => {
    if (relatedTarget && !currentTarget.contains(relatedTarget as HTMLElement)) {
      hideDropdown();
    }
  };

  const handleDismiss: KeyboardEventHandler<Document> = e => {
    if (open() && e.code === 'Escape') hideDropdown();
  };

  const pointerUp: PointerEventHandler = e => {
    const selection = document.getSelection();

    if (!drag() && (!selection || !selection.toString().length) && !mainRef.contains(e.target as Node)) {
      hideDropdown();
    }

    setDrag();
  };

  const updateDropdownPosition = () => {
    const elRect = getBoundingClientRect(input);
    const { top, bottom } = elRect;
    const { offsetHeight: elHeight } = input;
    const { clientHeight } = document.documentElement;
    if (!open()) return;
    const { offsetHeight: dropHeight } = open() as HTMLElement;
    const distanceBottom = clientHeight - bottom;
    const distanceTop = top;
    const bottomExceed = top + dropHeight + elHeight > clientHeight; // show
    const topExceed = top - dropHeight < 0; // show-top

    if ((open() === pickerDropdown || !topExceed) && distanceBottom < distanceTop && bottomExceed) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  };

  const updateControlPositions = createMemo(() => {
    const hsv = color().toHsv();
    const alpha = color().a;
    const hue = hsv.h;
    const saturation = hsv.s;
    const lightness = hsv.v;
    setControlPositions({
      c1x: saturation * offsetLength(),
      c1y: (1 - lightness) * offsetLength(),
      c2y: hue * offsetLength(),
      c3y: (1 - alpha) * offsetLength(),
    });
  });

  const toggleGlobalEvents = (add?: boolean) => {
    const action = add ? on : off;

    action(window, 'scroll', updateControlPositions);
    action(window, 'resize', updateControlPositions);
    action(document, 'keyup', handleDismiss);
    action(document, 'pointerup', pointerUp);
  };

  const hideTransitionEnd = () => {
    setPosition('');
    setOpen();
    focus(input.previousElementSibling as HTMLElement);

    // reset value if not changed
    setValue(color().toString());
  };
  const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
    const newValue = e.currentTarget.value;
    const newColor = new Color(newValue, format());

    if (newValue && newValue.length && newColor.isValid) {
      update(newColor);
    }
  };

  const update = (newColor: Color) => {
    setColor(newColor);
    setValue(newColor.toString());
  };

  createEffect(() => {
    if (pickerShown() || menuShown()) {
      toggleGlobalEvents(true);
    } else {
      toggleGlobalEvents();
    }

    onCleanup(toggleGlobalEvents);
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
        controlPositions,
        setControlPositions,
        updateControlPositions,
        update,
      }}
    >
      <div class={className()} lang={lang()} ref={mainRef} onBlur={handleBlur}>
        <button
          class="picker-toggle btn-appearance"
          aria-expanded={pickerShown()}
          aria-haspopup={true}
          type="button"
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
          autocomplete={'off'}
          spellcheck={false}
          tabIndex={pickerShown() ? -1 : 0}
          placeholder={placeholder()}
          value={value()}
          style={{ 'background-color': value() }}
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
            type="button"
            tabIndex={menuShown() || pickerShown() ? 0 : -1}
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
