/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test attr folder', () => {
    const {
      getAttribute,
      setAttribute,
      hasAttribute,
      removeAttribute,
      getAttributeNS,
      setAttributeNS,
      hasAttributeNS,
      removeAttributeNS,
      querySelector,
    } = SHORTY;

    cy
      .get('.alert')
      .should($element => {
        const el = $element[0];
        expect(getAttribute(el, 'class'), 'getAttribute').to.have.length.above(0);
        setAttribute(el, 'data-att', 'momo');
        expect(hasAttribute(el, 'data-att'), 'hasAttribute').to.be.true;
        removeAttribute(el, 'data-att');
        expect(hasAttribute(el, 'data-att'), 'hasAttribute').to.be.false;
      });
    cy.get('svg').should($svg => {
      console.log(querySelector('svg'));
      const svg = $svg[0] as HTMLElement;
      const ns = 'http://www.w3.org/2000/svg';
      expect(hasAttributeNS(ns, svg, 'transform'), 'hasAttributeNS').to.be.false;
      setAttributeNS(ns, svg, 'transform', 'scale(0.99)');
      expect(getAttributeNS(ns, svg, 'transform'), 'getAttributeNS').to.eq('scale(0.99)');
      removeAttributeNS(ns, svg, 'transform');
      expect(getAttributeNS(ns, svg, 'transform'), 'getAttributeNS').to.be.null;
    });
  });
});