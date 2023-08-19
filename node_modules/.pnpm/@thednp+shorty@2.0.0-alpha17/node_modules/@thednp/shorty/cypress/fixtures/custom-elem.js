const CEP = document.createElement('p');
CEP.innerText = 'Sample Custom Element';

export default class CustomElem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.append(CEP);
  }
  disconnectedCallback() {
    this.shadowRoot.innerHTML = '';
  }
}

customElements.define('custom-elem', CustomElem);
