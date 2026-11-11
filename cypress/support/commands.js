import { SELECTORS as S } from './selectors';

/**
 * cy.login(username, password)
 *
 * Logs in through the UI and waits for the inventory page.
 *
 * Why not cy.session()? saucedemo.com is a static single-page app hosted on GitHub Pages:
 * the server answers every deep link (e.g. /inventory.html) with HTTP 404 and the app is only
 * reachable through client-side navigation starting from "/". cy.session() restores cookies
 * and then needs a deep-link cy.visit() to prove the session is valid, which can never return
 * 2xx on this host. Logging in through "/" is the only reliable, honest way to reach an
 * authenticated state, and it takes about a second.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get(S.login.username).type(username);
  cy.get(S.login.password).type(password, { log: false });
  cy.get(S.login.loginButton).click();
  cy.url().should('include', '/inventory.html');
  cy.get(S.common.title).should('have.text', 'Products');
});

/** cy.loginAsStandardUser() - logs in with the public demo credentials from Cypress env. */
Cypress.Commands.add('loginAsStandardUser', () => {
  cy.login(Cypress.env('standardUser'), Cypress.env('demoPassword'));
});

/** cy.addToCart(['slug-1', 'slug-2']) - adds products from the inventory page. */
Cypress.Commands.add('addToCart', (slugs) => {
  [].concat(slugs).forEach((slug) => cy.get(S.inventory.addToCart(slug)).click());
});
