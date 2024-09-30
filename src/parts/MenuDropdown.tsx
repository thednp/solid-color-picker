import {
  focus,
  ObjectEntries,
  getElementStyle,
  hasClass,
  keyArrowDown,
  keyArrowUp,
  keySpace,
  keyArrowLeft,
  keyArrowRight,
  keyEnter,
} from '@thednp/shorty';
import Color from '@thednp/color';
import ColorPicker from '@thednp/color-picker';
import { type Component, type JSX, Accessor, For, Show, splitProps } from 'solid-js';
import type { ColorKeywords, ColorPresets, KeyProps, MenuProps, PresetsProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';
import Arrow from '../assets/Arrow';

const { ColorPalette } = ColorPicker;

const PresetsMenu: Component<PresetsProps> = props => {
  const [local, other] = splitProps(props, ['colorPresets']);
  const { locale, value, setColor, format } = usePickerContext();
  const colors = () =>
    new ColorPalette(
      local.colorPresets().hue,
      local.colorPresets().hueSteps,
      local.colorPresets().lightSteps,
      local.colorPresets().saturation,
    ).colors;
  const colorsCount = () => colors().length;
  const fit = () => local.colorPresets().lightSteps;
  const isMultiLine = () => colorsCount() > fit();
  const rowCountHover = () => {
    if (isMultiLine() && colorsCount() > fit() * 4) return 5;
    if (isMultiLine() && colorsCount() > fit() * 3) return 4;
    if (isMultiLine() && colorsCount() > fit() * 2) return 3;
    return 2;
  };
  const rowCount = () => rowCountHover() - (colorsCount() <= fit() * 3 ? 1 : 2);
  const finalClass = () =>
    `color-options` +
    (isMultiLine() && colorsCount() > rowCount() * fit() ? ' scrollable' : '') +
    (isMultiLine() ? ' multiline' : '');

  const style = () => {
    const gap = isMultiLine() ? '1px' : '0.25rem';
    const optionSize = fit() > 5 && isMultiLine() ? 1.5 : isMultiLine() ? 1.75 : 2;
    const menuHeight = `${rowCount() * optionSize}rem`;
    const menuHeightHover = `calc(${rowCountHover()} * ${optionSize}rem + ${rowCountHover() - 1} * ${gap})`;

    return {
      '--grid-item-size': `${optionSize}rem`,
      '--grid-fit': fit(),
      '--grid-gap': gap,
      '--grid-height': menuHeight,
      '--grid-hover-height': menuHeightHover,
    };
  };

  return (
    <ul
      class={finalClass()}
      role="listbox"
      aria-label={locale().presetsLabel}
      style={style()}
      onKeyDown={other.keyHandler}
    >
      <For each={colors()}>
        {color => {
          const newColor = () => new Color(color, format());
          const newValue = () => newColor().toString();
          const isActive = () => newValue() === value();
          const getClass = () => `color-option${isActive() ? ' active' : ''}`;
          return (
            <li
              tabIndex={0}
              role="option"
              aria-selected={isActive()}
              class={getClass()}
              data-value={newValue()}
              onClick={() => setColor(newColor())}
              style={{ 'background-color': color.toRgbString() }}
            >
              {newValue()}
            </li>
          );
        }}
      </For>
    </ul>
  );
};

const KeywordsMenu: Component<KeyProps> = props => {
  const [local, other] = splitProps(props, ['colorKeywords']);
  const { locale, value, setColor, format } = usePickerContext();

  return (
    <ul class="color-defaults" role="listbox" aria-label={locale().defaultsLabel} onKeyDown={other.keyHandler}>
      <For each={local.colorKeywords()}>
        {key => {
          const [label, val] = typeof key === 'string' ? [key, key] : (ObjectEntries(key)[0] as [string, string]);
          const isActive = () => [key, val].some(x => x === value());
          const className = () => `color-option${isActive() ? ' active' : ''}`;
          return (
            <li
              class={className()}
              onClick={() => setColor(new Color(val, format()))}
              tabIndex={0}
              role="option"
              data-value={val}
              aria-selected={isActive()}
            >
              {label}
            </li>
          );
        }}
      </For>
    </ul>
  );
};

const MenuDropdown: Component<MenuProps> = props => {
  const [local, other] = splitProps(props, ['id', 'class', 'ref', 'toggleMenu', 'expanded', 'locale']);
  const id = () => `${local.id}-menu`;
  const menuClass = () => `color-dropdown menu${local.class()}`;
  const keyHandler: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = e => {
    const { target, currentTarget, code } = e as typeof e & {
      target: EventTarget &
        HTMLElement & {
          previousElementSibling: HTMLElement | null;
          nextElementSibling?: HTMLElement | null;
          parentElement: HTMLElement;
        };
    };
    const { previousElementSibling, nextElementSibling, parentElement } = target;
    const isColorOptionsMenu = hasClass(currentTarget, 'color-options');
    const allSiblings = [...parentElement.children] as (EventTarget & HTMLElement)[];
    const columnsCount = (isColorOptionsMenu && Number(getElementStyle(parentElement, '--grid-fit') || 0)) || 0;
    const currentIndex = allSiblings.indexOf(target as HTMLElement);
    // @eslint-ignore
    const previousElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex - columnsCount];
    // @eslint-ignore
    const nextElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex + columnsCount];

    // @eslint-ignore
    if ([keyArrowDown, keyArrowUp, keySpace].includes(code)) {
      // prevent scroll when navigating the menu via arrow keys / Space
      e.preventDefault();
    }
    // istanbul ignore else @preserve
    if (isColorOptionsMenu) {
      // istanbul ignore else @preserve
      if (previousElement && code === keyArrowUp) {
        focus(previousElement);
      } else if (nextElement && code === keyArrowDown) {
        focus(nextElement);
      } else if (previousElementSibling && code === keyArrowLeft) {
        focus(previousElementSibling);
      } else if (nextElementSibling && code === keyArrowRight) {
        focus(nextElementSibling);
      }
    } else if (previousElementSibling && [keyArrowLeft, keyArrowUp].includes(code)) {
      focus(previousElementSibling);
    } else if (nextElementSibling && [keyArrowRight, keyArrowDown].includes(code)) {
      focus(nextElementSibling);
    }

    if ([keyEnter, keySpace, 'NumpadEnter'].includes(code)) {
      target.click();
    }
  };

  return (
    <Show when={other.colorKeywords() || other.colorPresets()}>
      <button
        class="menu-toggle btn-appearance"
        type="button"
        tabIndex={local.expanded ? 0 : -1}
        aria-expanded={local.expanded}
        aria-haspopup={true}
        onClick={local.toggleMenu}
      >
        <span class="v-hidden">{local.locale().toggleLabel}</span>
        <Arrow />
      </button>
      <div id={id()} ref={local.ref} class={menuClass()}>
        <Show when={typeof other.colorPresets !== 'undefined' && other.colorPresets()}>
          <PresetsMenu colorPresets={other.colorPresets as Accessor<ColorPresets>} keyHandler={keyHandler} />
        </Show>
        <Show when={typeof other.colorKeywords !== 'undefined' && other.colorKeywords()}>
          <KeywordsMenu colorKeywords={other.colorKeywords as Accessor<ColorKeywords>} keyHandler={keyHandler} />
        </Show>
      </div>
    </Show>
  );
};

export default MenuDropdown;
