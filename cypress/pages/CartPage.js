import BasePage from './BasePage';
import { SELECTORS as S } from '../support/selectors';

export default class CartPage extends BasePage {
  assertLoaded() {
    this.assertUrlContains('/cart.html').assertTitle('Your Cart');
    return this;
  }

  assertItemCount(count) {
    cy.get(S.cart.item).should('have.length', count);
    return this;
  }

  assertContainsProduct(name) {
    cy.contains(S.cart.itemName, name).should('be.visible');
    return this;
  }

  assertDoesNotContainProduct(name) {
    cy.contains(S.cart.itemName, name).should('not.exist');
    return this;
  }

  assertQuantity(name, quantity) {
    cy.contains(S.cart.item, name).find(S.cart.quantity).should('have.text', String(quantity));
    return this;
  }

  removeItem(slug) {
    cy.get(S.cart.remove(slug)).click();
    return this;
  }

  continueShopping() {
    cy.get(S.cart.continueShopping).click();
    return this;
  }

  proceedToCheckout() {
    cy.get(S.cart.checkout).click();
    return this;
  }
}
