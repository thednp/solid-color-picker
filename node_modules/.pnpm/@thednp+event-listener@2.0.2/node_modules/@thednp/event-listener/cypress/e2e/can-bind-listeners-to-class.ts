/// <reference types="cypress" />
import * as Listener from '../../src/index';
import Sample from '../fixtures/sample';

describe('Test Binding Class Objects to Listeners', () => {
  before(() => {
    cy.visit('cypress/test.html')
  });

  it('can work with class `this` bind', () => {
    cy.document()
      .should(doc => {
        if (doc.body) {
          new Sample(doc.body);
          (doc.body.children[0] as HTMLElement).click();
        }
      })
      .and(doc => {
        expect(doc.body.innerHTML).to.equal('<strong>Hello World! We have 1 visitors</strong>');
        expect(Listener.registry.click).to.be.instanceOf(Map);
      });
  });
});
