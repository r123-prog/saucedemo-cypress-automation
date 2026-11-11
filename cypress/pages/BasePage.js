import { SELECTORS as S } from '../support/selectors';

/** Behaviour shared by every page after login (header, cart badge, side menu). */
export default class BasePage {
  assertTitle(text) {
    cy.get(S.common.title).should('have.text', text);
    return this;
  }

  assertUrlContains(path) {
    cy.url().should('include', path);
    return this;
  }

  openCart() {
    cy.get(S.common.cartLink).click();
    return this;
  }

  assertCartCount(count) {
    if (count === 0) {
      cy.get(S.common.cartBadge).should('not.exist');
    } else {
      cy.get(S.common.cartBadge).should('have.text', String(count));
    }
    return this;
  }

  logout() {
    cy.get(S.common.menuButton).click();
    cy.get(S.common.logoutLink).should('be.visible').click();
    return this;
  }
}
