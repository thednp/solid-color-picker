const copyToClipboard = (e: MouseEvent & { currentTarget: HTMLButtonElement, target: Element }) => {
    const btn = e.target.closest('button') as HTMLButtonElement;
    const pre = document.getElementById(btn.dataset.target as string);
    if (pre) {
        const textContent = pre.textContent?.replace(/\s\s/g, '\n  ').replace('/>', '\n/>') as string;
        console.log(textContent)
        navigator.clipboard.writeText(textContent);
    }
}

export default copyToClipboard;
