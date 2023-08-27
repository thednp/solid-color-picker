import Color from '@thednp/color';
import ColorPicker from '@thednp/color-picker';
import { Component, For, Suspense } from 'solid-js';
import type { KeyProps, MenuProps, PresetsProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';
import { ObjectEntries } from '@thednp/shorty';

const { ColorPalette } = ColorPicker;

const PresetsMenu: Component<PresetsProps> = props => {
  const { locale, value, update, format } = usePickerContext();
  const { colorPresets } = props;
  const colors = () =>
    new ColorPalette(colorPresets().hue, colorPresets().hueSteps, colorPresets().lightSteps, colorPresets().saturation)
      .colors;
  const colorsCount = () => colors().length;
  const fit = () => colorPresets().lightSteps;
  const isMultiLine = () => colorsCount() > fit();
  const rowCountHover = () =>{
      if (isMultiLine() && colorsCount() > fit() * 4) return 5;
      if (isMultiLine() && colorsCount() > fit() * 3) return 4;
      if (isMultiLine() && colorsCount() > fit() * 2) return 3
      return 2;
    }
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
      <ul class={finalClass()} role="listbox" aria-label={locale().presetsLabel} style={style()}>
        <For each={colors()}>
          {color => {
            const newColor = () => new Color(color, format());
            const newValue = () => newColor().toString();
            const isActive = () => newValue() === value();
            const getClass = () => `color-option${isActive() ? ' active' : ''}`;
            return (
              <li
                tabindex="0"
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
  const { colorKeywords } = props;
  const { locale, value, update, format } = usePickerContext();

  return (
    <Suspense>
      <ul class="color-defaults" role="listbox" aria-label={locale().defaultsLabel}>
        <For each={colorKeywords()}>
          {key => {
            const [label, val] = typeof key === 'string' ? [key, key] : (ObjectEntries(key)[0] as [string, string]);        
            const isActive = () => val === value();
            const className = () => `color-option${isActive() ? ' active' : ''}`; 
            return (
              <li
                class={className()}
                onClick={() => update(new Color(val, format()))}
                tabindex={0}
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
  return (
    <>
      {(colorKeywords && colorKeywords()) || (colorPresets && colorPresets()) ? (
        <>    
          {props.children}
          <div id={id()} ref={props.ref} class={menuClass()}>
            {colorPresets && colorPresets() ? <PresetsMenu {...(props as PresetsProps)} /> : null}
            {colorKeywords && colorKeywords() ? <KeywordsMenu {...(props as KeyProps)} /> : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MenuDropdown;
