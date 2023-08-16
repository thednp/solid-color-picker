import Color from '@thednp/color';
import ColorPicker from '@thednp/color-picker';
import { Component, For } from 'solid-js';
import type { ColorPresets, MenuProps } from '../types/types';
import { usePickerContext } from './ColorPickerContext';

const { ColorPalette } = ColorPicker;

const PresetsMenu: Component<MenuProps> = props => {
  const { value, setValue, setColor, updateControlPositions } = usePickerContext();
  const { colorPickerLabels, colorPresets } = props;
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
    <ul
      class={finalClass}
      role="listbox"
      aria-label={colorPickerLabels.presetsLabel}
      style={`--grid-item-size: ${optionSize}rem; --grid-fit: ${fit}; --grid-gap: ${gap}; --grid-height: ${menuHeight}; --grid-hover-height: ${menuHeightHover};`}
    >
      <For each={colors}>
        {color => {
          const newColor = new Color(color, props.format);
          const newValue = newColor.toString();
          const isActive = () => newValue === value();
          return (
            <li
              tabindex="0"
              role="option"
              aria-selected={isActive()}
              class={`color-option${isActive() ? ' active' : ''}`}
              onClick={() => {
                setValue(newValue);
                setColor(newColor);

                updateControlPositions();
              }}
              style={`background-color: ${color.toRgbString()};`}
            >
              {newValue}
            </li>
          );
        }}
      </For>
    </ul>
  );
};

const KeywordsMenu: Component<MenuProps> = props => {
  const { colorPickerLabels, format } = props;
  const { value, setValue, update } = usePickerContext();

  return (
    <ul class="color-defaults" role="listbox" aria-label={colorPickerLabels.defaultsLabel}>
      <For each={props.colorKeywords}>
        {key => {
          const { label, value: val } = typeof key === 'object' ? key : { label: key, value: key };
          const isActive = () => val === value();
          return (
            <li
              class={`color-option${isActive() ? ' active' : ''}`}
              onClick={() => {setValue(val); update(new Color(val, format))}}
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
  );
};

const MenuDropdown: Component<MenuProps> = props => {
  // console.log(props)
  return (props.colorKeywords && props.colorKeywords.length) || props.colorPresets ? (
    <div id={`${props.id}-menu`} ref={props.ref} class={`color-dropdown menu${props.class()}`}>
      {props.colorPresets ? <PresetsMenu {...props} /> : null}
      {props.colorKeywords && props.colorKeywords.length ? <KeywordsMenu {...props} /> : null}
    </div>
  ) : null;
};

export default MenuDropdown;
