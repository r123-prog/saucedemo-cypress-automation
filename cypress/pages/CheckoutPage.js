import BasePage from './BasePage';
import { SELECTORS as S } from '../support/selectors';
import { parseCurrency, roundCents } from '../support/utils';

export default class CheckoutPage extends BasePage {
  fillCustomerInformation({ firstName, lastName, postalCode }) {
    if (firstName) cy.get(S.checkout.firstName).type(firstName);
    if (lastName) cy.get(S.checkout.lastName).type(lastName);
    if (postalCode) cy.get(S.checkout.postalCode).type(postalCode);
    return this;
  }

  continue() {
    cy.get(S.checkout.continue).click();
    return this;
  }

  cancel() {
    cy.get(S.checkout.cancel).click();
    return this;
  }

  finish() {
    cy.get(S.checkout.finish).click();
    return this;
  }

  assertInformationStep() {
    this.assertUrlContains('/checkout-step-one.html').assertTitle('Checkout: Your Information');
    return this;
  }

  assertOverviewStep() {
    this.assertUrlContains('/checkout-step-two.html').assertTitle('Checkout: Overview');
    return this;
  }

  assertErrorMessage(message) {
    cy.get(S.checkout.error).should('be.visible').and('contain.text', message);
    return this;
  }

  /** Verifies item total equals the expected sum and that total = item total + tax. */
  assertTotals(expectedSubtotal) {
    cy.get(S.checkout.subtotal).invoke('text').then((subtotalText) => {
      expect(parseCurrency(subtotalText), 'item total').to.equal(roundCents(expectedSubtotal));
      cy.get(S.checkout.tax).invoke('text').then((taxText) => {
        cy.get(S.checkout.total).invoke('text').then((totalText) => {
          const subtotal = parseCurrency(subtotalText);
          const tax = parseCurrency(taxText);
          expect(parseCurrency(totalText), 'order total').to.equal(roundCents(subtotal + tax));
        });
      });
    });
    return this;
  }

  assertOrderComplete(expectedHeader) {
    this.assertUrlContains('/checkout-complete.html').assertTitle('Checkout: Complete!');
    cy.get(S.checkout.completeHeader).should('have.text', expectedHeader);
    cy.get(S.checkout.completeText).should('be.visible');
    return this;
  }

  backHome() {
    cy.get(S.checkout.backHome).click();
    return this;
  }
}
