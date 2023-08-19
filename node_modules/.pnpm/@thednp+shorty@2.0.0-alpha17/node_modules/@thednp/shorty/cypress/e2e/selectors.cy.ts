/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

import CustomElem from '../fixtures/custom-elem';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html')
    .wait(100);
  });

  it('Test selectors folder', () => {
    const {
      closest,
      getCustomElements,
      getElementById,
      getElementsByClassName,
      getElementsByTagName,
      matches,
      querySelector,
      querySelectorAll,
    } = SHORTY;

    cy
      .get('.alert')
      .then($alert => {
        const [el] = $alert;
        const win = el.ownerDocument.defaultView;

        const CE = new CustomElem();
        win.document.body.append(CE);

        expect(querySelectorAll('div'), 'querySelectorAll(div)').to.have.length(0);
        expect(querySelectorAll('div', win.document), 'querySelectorAll(div, parent)').to.have.length(1);

        expect(querySelector(), 'querySelector()').to.be.null;
        expect(querySelector(el), 'querySelector(node)').to.equal(el);
        expect(querySelector('.alert'), 'querySelector(selector)').to.be.null;
        expect(querySelector('.alert', win.document), 'querySelector(selector, parent)').to.eq(el);

        expect(closest(el), 'closest()').to.be.null;
        expect(closest(el, 'wombat'), 'closest(invalid)').to.be.null;
        expect(closest(el, 'body'), 'closest(body)').to.eq(win.document.body);

        expect(getCustomElements(), 'getCustomElements()').to.deep.equal([]);
        expect(getCustomElements(win.document), 'getCustomElements(expected)').to.deep.equal([CE]);

        expect(getElementById(), 'getElementById()').to.be.null;
        expect(getElementById('alertDemo'), 'getElementById(id)').to.be.null;
        expect(
          getElementById('alertDemo', win.document),
          'getElementById(id, parent)',
        ).to.be.instanceOf(win.HTMLDivElement);

        expect(getElementsByClassName(), 'getElementsByClassName()').to.be.instanceOf(
          HTMLCollection,
        );
        expect(
          getElementsByClassName('alert'),
          'getElementsByClassName(selector)',
        ).to.be.instanceOf(HTMLCollection);
        expect(
          getElementsByClassName('alert', win.document),
          'getElementsByClassName(selector, parent)',
        ).to.be.instanceOf(win.HTMLCollection);

        expect(getElementsByTagName(), 'getElementsByTagName()').to.be.instanceOf(HTMLCollection);
        expect(getElementsByTagName('div'), 'getElementsByTagName(selector)').to.be.instanceOf(
          HTMLCollection,
        );
        expect(
          getElementsByTagName('div', win.document),
          'getElementsByTagName(selector, parent)',
        ).to.be.instanceOf(win.HTMLCollection);

        expect(
          [...getElementsByClassName('alert', win.document)].filter(x => matches(x, 'div')),
          'matches(node, selector)',
        ).to.deep.equal([el]);
      });
  });
});