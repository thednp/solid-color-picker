/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

import CustomElem from '../fixtures/custom-elem';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test get folder', () => {
    const {
      getBoundingClientRect,
      getDocument,
      getDocumentBody,
      getDocumentElement,
      getDocumentHead,
      getElementAnimationDelay,
      getElementAnimationDuration,
      getElementTransitionDelay,
      getElementTransitionDuration,
      getElementStyle,
      getNodeScroll,
      getParentNode,
      getRectRelativeToOffsetParent,
      getUID,
      getWindow,
      ObjectValues,
    } = SHORTY;

    cy
      .get('.alert')
      .should($element => {
        const element = $element[0];
        element.style.transform = 'scale(1.01)';
        const win = getWindow(element);
        const CE = new CustomElem();
        CE.className = 'btn btn-outline-primary';
        win.document.body.append(CE);

        // we round values so all browsers return same values
        let { x, y, top, left, right, bottom, width, height } = getBoundingClientRect(
          element,
          true,
        );
        expect(
          ObjectValues([x, y, top, left, right, bottom, width, height]).map(Math.round),
          'getBoundingClientRect',
        ).to.deep.equal([63, 87, 87, 63, 927, 204, 864, 117]);
        element.style.transform = '';

        expect(getWindow(), 'getWindow').to.be.instanceOf(Window); // root WINDOW
        expect(getWindow(element.ownerDocument), 'getWindow(document)').to.be.instanceOf(
          win.Window,
        );
        expect(getWindow(CE), 'getWindow(CustomElement)').to.be.instanceOf(win.Window);
        expect(getWindow(CE.shadowRoot), 'getWindow(CustomElement.shadowRoot)').to.be.instanceOf(
          win.Window,
        );
        expect(getWindow(win.top), 'getWindow(window)').to.be.instanceOf(win.top.Window);

        expect(getDocument(), 'getDocument()').to.be.instanceOf(Document);
        expect(getDocument(element), 'getDocument(node)').to.be.instanceOf(win.Document);
        expect(getDocument(win.document), 'getDocument(document)').to.be.instanceOf(win.Document);
        expect(getDocument(win), 'getDocument(window)').to.be.instanceOf(win.Document);

        expect(getDocumentBody(element), 'getDocumentBody').to.be.instanceOf(win.HTMLBodyElement);
        expect(getDocumentElement(element), 'getDocumentElement').to.be.instanceOf(
          win.HTMLHtmlElement,
        );
        expect(getDocumentHead(element), 'getDocumentHead').to.be.instanceOf(win.HTMLHeadElement);

        expect(getElementAnimationDelay(element), 'getElementAnimationDelay').to.equal(0);

        expect(getElementAnimationDuration(element), 'getElementAnimationDuration').to.equal(0);

        CE.style.animation = 'animate-me 1s ease 0.5s';
        expect(getElementAnimationDelay(CE), 'getElementAnimationDelay - seconds').to.equal(500);

        expect(getElementAnimationDuration(CE), 'getElementAnimationDuration - seconds').to.equal(
          1000,
        );

        CE.style.animation = 'animate-me 1200ms ease 400ms';
        expect(getElementAnimationDelay(CE), 'getElementAnimationDelay - miliseconds').to.equal(
          400,
        );

        expect(
          getElementAnimationDuration(CE),
          'getElementAnimationDuration - miliseconds',
        ).to.equal(1200);

        element.style.transition = 'opacity .145s linear .1s';
        expect(getElementTransitionDelay(element), 'getElementTransitionDelay - seconds').to.equal(
          100,
        );
        expect(
          getElementTransitionDuration(element),
          'getElementTransitionDuration - seconds',
        ).to.equal(145);

        element.style.transition = 'opacity 140ms linear 10ms';
        expect(
          getElementTransitionDelay(element),
          'getElementTransitionDelay- miliseconds',
        ).to.equal(10);

        expect(
          getElementTransitionDuration(element),
          'getElementTransitionDuration- miliseconds',
        ).to.equal(140);

        element.style.transition = '';

        expect(getElementStyle(element, 'color'), 'getElementStyle(color)').to.equal(
          'rgb(102, 77, 3)',
        );

        expect(getNodeScroll(win), 'getNodeScroll(window)').to.deep.equal({ x: 0, y: 0 });
        expect(getNodeScroll(element), 'getNodeScroll(element)').to.deep.equal({ x: 0, y: 0 });
        expect(
          getNodeScroll(element.offsetParent as HTMLElement),
          'getNodeScroll(element.offsetParent)',
        ).to.deep.equal({ x: 0, y: 0 });
        expect(getNodeScroll(getDocumentBody(element)), 'getNodeScroll(body)').to.deep.equal({
          x: 0,
          y: 0,
        });

        expect(getParentNode(getDocumentElement()), 'getParentNode()').to.be.instanceOf(
          HTMLHtmlElement,
        ); // root HTML
        expect(getParentNode(win), 'getParentNode(window)').to.be.instanceOf(win.HTMLHtmlElement);
        expect(getParentNode(getDocumentBody(element)), 'getParentNode(body)').to.be.instanceOf(
          win.HTMLHtmlElement,
        );
        expect(getParentNode(element), 'getParentNode(node)').to.have.class('container');
        expect(getParentNode(CE), 'getParentNode(CustomElement)').to.be.instanceOf(
          win.HTMLBodyElement,
        );
        expect(
          getParentNode(CE.shadowRoot),
          'getParentNode(CustomElement.shadowRoot)',
        ).to.be.instanceOf(CustomElem);

        ({ x, y, width, height } = getRectRelativeToOffsetParent(
          element,
          getDocumentElement(win),
          getNodeScroll(getDocumentElement(win)),
        ));

        expect(
          [x, y, width, height].map(Math.round),
          'getRectRelativeToOffsetParent',
        ).to.deep.equal([68, 88, 864, 117]);

        expect(getUID(element), 'getUID()').to.eq(0);
        expect(getUID(element, 'Alert'), 'getUID(key) - set & returns').to.eq(0);
        expect(getUID(element, 'Alert'), 'getUID(key) - returns').to.eq(0);
        expect(getUID(win, 'Alert'), 'getUID(key) - set & returns').to.eq(1);
        expect(getUID(win, 'Alert'), 'getUID(key) - returns').to.eq(1);
      });
  });
});