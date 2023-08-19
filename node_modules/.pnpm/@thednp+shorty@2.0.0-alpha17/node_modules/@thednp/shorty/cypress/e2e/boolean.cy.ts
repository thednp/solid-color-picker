/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test boolean folder', () => {
    const {
      // these are impossible to test 100% of the branches
      isApple,
      isMobile,
      isFirefox,
      support3DTransform,
      supportAnimation,
      supportPassive,
      supportTouch,
      supportTransform,
      supportTransition,
      // querySelectorAll, getWindow
    } = SHORTY;
    cy
      .window()
      .then(() => {
        expect(isApple, 'isApple').to.be.false;
        expect(isMobile, 'isMobile').to.be.false;
        if (Cypress.isBrowser('firefox')) {
          expect(isFirefox, 'isFirefox').to.be.true;
        } else {
          expect(isFirefox, 'isFirefox').to.be.false;
        }
        expect(support3DTransform, 'support3DTransform').to.be.true;
        expect(supportAnimation, 'supportAnimation').to.be.true;
        expect(supportPassive, 'supportPassive').to.be.true;
        expect(supportTouch, 'supportTouch').to.be.false;
        expect(supportTransform, 'supportTransform').to.be.true;
        expect(supportTransition, 'supportTransition').to.be.true;
      });
  });
});