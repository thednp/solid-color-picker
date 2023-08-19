/// <reference types="cypress" />
import * as Listener from '../../src/index';
import clickListener from '../fixtures/clickListener';

describe('Test Adding Listeners', () => {
  beforeEach(() => {
    cy.visit('cypress/test.html')
  });

  it('can do `addListener` click', () => {
    cy.document()
      .should(doc => {
        if (doc.body) {
          Listener.on(doc.body, 'click', clickListener);
        }
      })
      .get('b')
      .trigger('click', { force: true })
      .get('b')
      .should(b => {
        expect(b[0].innerHTML).to.equal('<b>click</b>');
        expect(Listener.registry.click).to.be.instanceOf(Map);
      })
      .get('body')
      .trigger('click', { force: true })
      .document()
      .should(doc => {
        expect(doc.body.innerHTML).to.equal('<b>click</b>');
        expect(Listener.registry.click).to.be.instanceOf(Map);
      });
  });

  it('can do `addListener` scroll', () => {
    cy.window()
      .should(win => {
        if (win) {
          Listener.on(win, 'scroll', function (e) {
            console.log({ target: e.target, currentTarget: e.currentTarget, win: win });
            win.document.body.innerHTML = '<b>scroll</b>';
          });
        }
      })
      .window()
      .scrollTo('bottom')
      .document()
      .should(doc => {
        if (doc.body) {
          expect(doc.body.innerHTML).to.equal('<b>scroll</b>');
          expect(doc.body.ownerDocument.defaultView?.scrollY).to.not.equal(0);
          expect(Listener.registry.scroll).to.be.instanceOf(Map);
        }
      });
  });
});
