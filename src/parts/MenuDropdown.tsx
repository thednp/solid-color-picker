import Color from '@thednp/color';
import ColorPicker from '@thednp/color-picker';
import { Component, For, Suspense } from 'solid-js';
import type { ColorPresets, MenuProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';

const { ColorPalette } = ColorPicker;

const PresetsMenu: Component<MenuProps> = props => {
  const { locale, value, update, format } = usePickerContext();
  // const { colorPickerLabels } = ;
  const { colorPresets } = props;
  const { hue, hueSteps, lightSteps, saturation } = colorPresets as ColorPresets;
  const { colors } = new ColorPalette(hue, hueSteps, lightSteps, saturation);
  const colorsCount = colors.length;
  const fit = lightSteps || [9, 10].find(x => colorsCount >= x * 2 && !(colorsCount % x)) || 5;
  const isMultiLine = colorsCount > fit;
  let rowCountHover = 2;
  rowCountHover = isMultiLine && colorsCount > fit * 2 ? 3 : rowCountHover;
  rowCountHover = isMultiLine && colorsCount > fit * 3 ? 4 : rowCountHover;
  rowCountHover = isMultiLine && colorsCount > fit * 4 ? 5 : rowCountHover;
  const rowCount = rowCountHover - (colorsCount <= fit * 3 ? 1 : 2);
  const isScrollable = isMultiLine && colorsCount > rowCount * fit;
  let finalClass = `color-options`;
  finalClass += isScrollable ? ' scrollable' : '';
  finalClass += isMultiLine ? ' multiline' : '';
  const gap = isMultiLine ? '1px' : '0.25rem';
  let optionSize = isMultiLine ? 1.75 : 2;
  optionSize = fit > 5 && isMultiLine ? 1.5 : optionSize;
  const menuHeight = `${rowCount * optionSize}rem`;
  const menuHeightHover = `calc(${rowCountHover} * ${optionSize}rem + ${rowCountHover - 1} * ${gap})`;

  return (
    <Suspense>
      <ul
        class={finalClass}
        role="listbox"
        aria-label={locale().presetsLabel}
        style={{
          '--grid-item-size': `${optionSize}rem`,
          '--grid-fit': fit,
          '--grid-gap': gap,
          '--grid-height': menuHeight,
          '--grid-hover-height': menuHeightHover,
        }}
      >
        <For each={colors}>
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

const KeywordsMenu: Component<MenuProps> = props => {
  const { colorKeywords } = props;
  const { locale, value, setValue, update, format } = usePickerContext();

  return (
    <Suspense>
      <ul class="color-defaults" role="listbox" aria-label={locale().defaultsLabel}>
        <For each={colorKeywords}>
          {key => {
            const { label, value: val } =
              typeof key === 'object' ? key : { label: key, value: new Color(key, format()).toString() };
            const isActive = () => val === value();
            return (
              <li
                class={`color-option${isActive() ? ' active' : ''}`}
                onClick={() => {
                  setValue(val);
                  update(new Color(val, format()));
                }}
                tabindex="0"
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
  return (props.colorKeywords && props.colorKeywords.length) || props.colorPresets ? (
    <Suspense>
      {props.children}
      <div id={`${props.id}-menu`} ref={props.ref} class={`color-dropdown menu${props.class()}`}>
        {props.colorPresets ? <PresetsMenu {...props} /> : null}
        {props.colorKeywords && props.colorKeywords.length ? <KeywordsMenu {...props} /> : null}
      </div>
    </Suspense>
  ) : null;
};

export default MenuDropdown;
