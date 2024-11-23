/**
 * A simple utility to type text into input elements.
 * It will split the string provided and replace spaces with Space keyboard key
 * and will trigger a dispatch for each keyboard key found in the string.
 * @param target A button, input element or editable element
 * @param value the text to type
 *
 * @example
 * write(target, "hsl 150 0 0")
 * write(target, "hslSpace150Space0Space0Enter")
 */
const write = <T extends HTMLElement = HTMLElement>(target: T, value: string) => {
    const text = value.trim();

    target.focus();
    if (target instanceof HTMLInputElement) target.select();
    if (['Space', 'Enter'].some(x => text === x) && target.tagName === 'BUTTON') {
        target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        // target.dispatchEvent(new KeyboardEvent('keyup', { key: text, code: text, bubbles: true }));
    } else {
        if (target instanceof HTMLInputElement) {
            const newValue = text.replace(/Enter|Escape/g, '').replace(/Space/g, ' ');
            target.setAttribute('value', newValue);
            target.value = newValue;
            target.offsetWidth;
            // console.log(newValue)
            target.dispatchEvent(new Event('input', { bubbles: true }));
            if (['Escape', 'Enter'].some(x => text.endsWith(x))) {
                target.dispatchEvent(new Event('change', { bubbles: true }));
                const last = text.endsWith("Escape") ? "Escape" : "Enter";
                target.dispatchEvent(new KeyboardEvent('keyup', { key: last, code: last, bubbles: true }));
            }

        }
    }
}

export default write;
