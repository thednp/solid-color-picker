/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test class folder', () => {
    const { addClass, hasClass, removeClass } = SHORTY;
    cy
      .get('.alert')
      .then($alert => {
        const alert = $alert[0];

        addClass(alert, 'to-be-removed');
        expect(hasClass(alert, 'to-be-removed')).to.be.true;
        removeClass(alert, 'show');
        expect(hasClass(alert, 'show')).to.be.false;
      })
      .wait(200)
      .get('.alert')
      .should('be.hidden');
  });
});