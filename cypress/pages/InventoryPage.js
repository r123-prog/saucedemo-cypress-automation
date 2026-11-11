import BasePage from './BasePage';
import { SELECTORS as S } from '../support/selectors';
import { parseCurrency } from '../support/utils';

export default class InventoryPage extends BasePage {
  assertLoaded() {
    this.assertUrlContains('/inventory.html').assertTitle('Products');
    cy.get(S.inventory.item).should('have.length.greaterThan', 0);
    return this;
  }

  getProductNames() {
    return cy.get(S.inventory.itemName).then(($els) => Cypress._.map($els, (el) => el.innerText.trim()));
  }

  getProductPrices() {
    return cy.get(S.inventory.itemPrice).then(($els) => Cypress._.map($els, (el) => parseCurrency(el.innerText)));
  }

  addToCart(slug) {
    cy.get(S.inventory.addToCart(slug)).click();
    return this;
  }

  removeFromCart(slug) {
    cy.get(S.inventory.remove(slug)).click();
    return this;
  }

  sortBy(optionValue) {
    cy.get(S.inventory.sortDropdown).select(optionValue);
    return this;
  }

  openProductDetails(name) {
    cy.contains(S.inventory.itemName, name).click();
    return this;
  }

  backToProducts() {
    cy.get(S.inventory.backToProducts).click();
    return this;
  }
}
