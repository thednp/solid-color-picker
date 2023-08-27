type Callback = (t?: HTMLElement) => void;
const Timers = new Map<HTMLElement, NodeJS.Timeout>();

export const showCollapse = (collapse: HTMLElement, callback?: Callback) => {
    const timer = Timers.get(collapse as HTMLElement);

    if (!timer && !collapse.classList.contains('show')) {
        const btn = document.querySelector(`[data-target="${collapse.id}"]`);
        const parent = document.getElementById(collapse.dataset.parent as string);
        const currentOpen = parent
            ? [...parent.querySelectorAll(`[data-parent="${collapse.dataset.parent}"]`)].find(p => (p.children[0] as HTMLElement).classList.contains('show'))
            : null;

        const afterCallback = () => {
            collapse.classList.remove('collapsing');
            Object.assign(collapse.style, { height: '' });
            Timers.delete(collapse);
        }
        clearTimeout(timer);
        if (btn) {
            btn.classList.add('active');
            btn.setAttribute('expanded', 'true');
        }
        if (currentOpen) hideCollapse(currentOpen as HTMLElement);
        collapse.classList.add('show');
        collapse.classList.add('collapsing');
        window.requestAnimationFrame(() => {
            Object.assign(collapse.style, { height: collapse.scrollHeight + 'px' });
            Timers.set(
                collapse,
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback(collapse);
                        setTimeout(() => afterCallback(), 0);
                    } else afterCallback();
                }, 350),
            );
        });
    }
};

export const hideCollapse = (collapse: HTMLElement, callback?: Callback) => {
    const timer = Timers.get(collapse as HTMLElement);
    if (collapse && !timer && collapse.classList.contains('show')) {
        const btn = document.querySelector(`[data-target="${collapse.id}"]`);
        const afterCallback = () => {
            collapse.classList.remove('collapsing');
            Object.assign(collapse.style, { height: '' });
            if (btn) {
                btn.classList.remove('active');
                btn.setAttribute('expanded', 'false');
            }
            collapse.classList.remove('show');
            Timers.delete(collapse);
        }

        clearTimeout(timer);
        Object.assign(collapse.style, { height: collapse.scrollHeight + 'px' });
        window.requestAnimationFrame(() => {
            collapse.classList.add('collapsing');
            Object.assign(collapse.style, { height: '0px' });
            Timers.set(
                collapse,
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback(collapse);
                        setTimeout(afterCallback, 1)
                    } else {
                        afterCallback();
                    }
                }, 350),
            );
        });
    }
};

export const toggleCollapse = (e: MouseEvent & { currentTarget: HTMLButtonElement, target: Element }) => {
    e.preventDefault();
    const btn = e.target.closest('button') as HTMLButtonElement;
    const collapse = document.getElementById(btn.dataset.target as string);

    if (collapse) {
        if (collapse.classList.contains('show')) {
            hideCollapse(collapse);
        } else {
            showCollapse(collapse);
        }
    }
};
