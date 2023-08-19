/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test event folder', () => {
    const {
      // on, off are called by one
      one,
      getElementsByClassName,
    } = SHORTY;

    cy
      .get('.alert')
      .should(($alert) => {

        if ($alert[0]){
          const [el] = $alert;
          const [btn] = getElementsByClassName('btn-close', el);
          const doc = btn.ownerDocument;
          console.log(doc, btn)
  
          one(el, 'click', function handle(e) {
            const message = doc.createElement('p');
            message.innerText += 'click fired for ' + (e.currentTarget as HTMLElement).tagName;
            el.append(message);
            // console.log(e.target, e.currentTarget);
          });
  
          one(btn, 'click', function handle(e) {
            const message = doc.createElement('p');
            message.innerText = 'click fired for ' + (e.target as HTMLElement).tagName;
            el.append(message);
          });
        }
      })
      .get('.btn-close')
      .click({ force: true })
      .should(btn => {
        expect(btn[0], 'event target').be.equal((btn[0].ownerDocument as Document).activeElement);
      })
      .get('.alert')
      .should('contain', 'click fired for BUTTON');
  });
});