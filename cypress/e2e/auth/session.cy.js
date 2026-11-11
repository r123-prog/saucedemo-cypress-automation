import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Authentication | Logout and session handling', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  let messages;

  before(() => {
    cy.fixture('messages').then((data) => (messages = data.login));
  });

  describe('with an authenticated user', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      inventoryPage.assertLoaded();
    });

    it('AUTH-010 logs out and returns to the login page', () => {
      inventoryPage.logout();
      loginPage.assertLoginFormVisible();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });

    it('AUTH-011 keeps the session after a page reload', () => {
      cy.reload();
      inventoryPage.assertLoaded();
    });

    it('AUTH-012 allows logging back in after logout', () => {
      inventoryPage.logout();
      loginPage.assertLoginFormVisible();
      loginPage.login(Cypress.env('standardUser'), Cypress.env('demoPassword'));
      inventoryPage.assertLoaded();
    });

    it('AUTH-013 denies access to protected pages after logout', () => {
      inventoryPage.logout();
      // The host answers deep links with HTTP 404 by design (static SPA hosting), so the
      // status check is disabled for THIS navigation only; the assertions below verify the
      // app's real behaviour: the login form and the "must be logged in" error are shown.
      cy.visit('/inventory.html', { failOnStatusCode: false });
      loginPage.assertLoginFormVisible().assertErrorMessage(messages.protectedPage);
    });
  });

  describe('without a session', () => {
    it('AUTH-014 blocks unauthenticated visitors from the inventory page', () => {
      // Same deep-link behaviour as AUTH-013 (see comment there).
      cy.visit('/inventory.html', { failOnStatusCode: false });
      loginPage.assertLoginFormVisible().assertErrorMessage(messages.protectedPage);
    });
  });
});
