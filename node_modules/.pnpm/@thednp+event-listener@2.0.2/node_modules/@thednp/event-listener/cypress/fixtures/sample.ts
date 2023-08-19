import * as Listener from '../../src/index';

export default class Sample {
  public element: HTMLElement;
  public count: number;
  constructor(target: HTMLElement) {
    this.element = target;
    this.count = 0;

    // class bind
    this.sayHi = this.sayHi.bind(this);
    this.getCount = this.getCount.bind(this);

    Listener.on(this.element, 'click', this.sayHi);
  }
  sayHi() {
    this.count += 1;
    this.element.innerHTML = `<strong>Hello World!${' We have ' + this.getCount() + ' visitors'}</strong>`;
  }
  getCount() {
    return this.count;
  }
}
