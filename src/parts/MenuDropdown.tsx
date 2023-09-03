import Color from '@thednp/color';
import ColorPicker from '@thednp/color-picker';
import { Component, For, JSX, Suspense } from 'solid-js';
import type { KeyProps, MenuProps, PresetsProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';
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

const { ColorPalette } = ColorPicker;

const PresetsMenu: Component<PresetsProps> = props => {
  const { locale, value, update, format } = usePickerContext();
  const { colorPresets, keyHandler } = props;
  const colors = () =>
    new ColorPalette(colorPresets().hue, colorPresets().hueSteps, colorPresets().lightSteps, colorPresets().saturation)
      .colors;
  const colorsCount = () => colors().length;
  const fit = () => colorPresets().lightSteps;
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
    <Suspense>
      <ul class={finalClass()} role="listbox" aria-label={locale().presetsLabel} style={style()} onKeyDown={keyHandler}>
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
                onClick={() => update(newColor())}
                style={{ 'background-color': color.toRgbString() }}
              >
                {newValue()}
              </li>
            );
          }}
        </For>
      </ul>
    </Suspense>
  );
};

const KeywordsMenu: Component<KeyProps> = props => {
  const { colorKeywords, keyHandler } = props;
  const { locale, value, update, format } = usePickerContext();

  return (
    <Suspense>
      <ul class="color-defaults" role="listbox" aria-label={locale().defaultsLabel} onKeyDown={keyHandler}>
        <For each={colorKeywords()}>
          {key => {
            const [label, val] = typeof key === 'string' ? [key, key] : (ObjectEntries(key)[0] as [string, string]);
            const isActive = () => val === value();
            const className = () => `color-option${isActive() ? ' active' : ''}`;
            return (
              <li
                class={className()}
                onClick={() => update(new Color(val, format()))}
                tabIndex={0}
                role="option"
                aria-selected={isActive()}
              >
                {label}
              </li>
            );
          }}
        </For>
      </ul>
    </Suspense>
  );
};

const MenuDropdown: Component<MenuProps> = props => {
  const { colorKeywords, colorPresets } = props;
  const id = () => `${props.id}-menu`;
  const menuClass = () => `color-dropdown menu${props.class()}`;
  const keyHandler: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = e => {
    const { target, currentTarget, code } = e;
    const { previousElementSibling, nextElementSibling, parentElement } = target as HTMLElement & {
      previousElementSibling: HTMLElement | null;
      nextElementSibling?: HTMLElement | null;
      parentElement: HTMLElement;
    };
    const isColorOptionsMenu = hasClass(currentTarget, 'color-options');
    const allSiblings = [...parentElement.children];
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
        focus(previousElementSibling);
      } else if (nextElementSibling && code === keyArrowRight) {
        focus(nextElementSibling as HTMLElement);
      }
    } else if (previousElementSibling && [keyArrowLeft, keyArrowUp].includes(code)) {
      focus(previousElementSibling as HTMLElement);
    } else if (nextElementSibling && [keyArrowRight, keyArrowDown].includes(code)) {
      focus(nextElementSibling as HTMLElement);
    }

    if ([keyEnter, keySpace, 'NumpadEnter'].includes(code)) {
      (target as HTMLElement).click();
    }
  };
  return (
    <>
      {(typeof colorKeywords !== 'undefined' && colorKeywords()) ||
      (typeof colorPresets !== 'undefined' && colorPresets()) ? (
        <>
          {props.children}
          <div id={id()} ref={props.ref} class={menuClass()}>
            {typeof colorPresets !== 'undefined' && colorPresets() ? (
              <PresetsMenu {...({ ...props, keyHandler } as PresetsProps)} />
            ) : null}
            {typeof colorKeywords !== 'undefined' && colorKeywords() ? (
              <KeywordsMenu {...({ ...props, keyHandler } as KeyProps)} />
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MenuDropdown;
