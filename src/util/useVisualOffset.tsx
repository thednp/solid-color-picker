import { createSignal, createEffect, onCleanup, startTransition } from 'solid-js';
import { addListener, removeListener } from '@thednp/event-listener';
import { usePickerContext } from '../parts/ColorPickerContext';

export default function useVisualOffset() {
  const { visuals, updateControlPositions } = usePickerContext();
  const [v1] = visuals();
  const screenWidth = () => window.innerWidth;
  const getHeight = () => (screenWidth() >= 980 ? 300 : 230);
  const getWidth = () => (typeof v1 !== 'undefined' && v1.offsetWidth ? v1.offsetWidth : getHeight());
  const [offsetHeight, setOffsetHeight] = createSignal(getHeight());
  const [offsetWidth, setOffsetWidth] = createSignal(getWidth());
  const listenerOptions = { passive: true };

  const handleResize = () => {
    setOffsetHeight(getHeight());
    setOffsetWidth(getWidth());
    startTransition(updateControlPositions);
  };

  createEffect(() => {
    addListener(window, 'resize', handleResize, listenerOptions);
    onCleanup(() => {
      removeListener(window, 'resize', handleResize, listenerOptions);
    });
  });

  return { offsetHeight, offsetWidth };
}
