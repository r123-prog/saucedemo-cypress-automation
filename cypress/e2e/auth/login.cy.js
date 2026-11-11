import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Authentication | Login', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const password = () => Cypress.env('demoPassword');
  let users;
  let messages;

  before(() => {
    cy.fixture('users').then((data) => (users = data));
    cy.fixture('messages').then((data) => (messages = data.login));
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('AUTH-001 logs in with valid credentials', () => {
    loginPage.login(Cypress.env('standardUser'), password());
    inventoryPage.assertLoaded();
  });

  it('AUTH-002 rejects an invalid username', () => {
    loginPage.login(users.invalidUsername.username, users.invalidUsername.password);
    loginPage.assertErrorMessage(messages.invalidCredentials);
    cy.url().should('not.include', '/inventory.html');
  });

  it('AUTH-003 rejects an invalid password', () => {
    loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    loginPage.assertErrorMessage(messages.invalidCredentials);
    cy.url().should('not.include', '/inventory.html');
  });

  it('AUTH-004 requires a username when both fields are empty', () => {
    loginPage.submit();
    loginPage.assertErrorMessage(messages.usernameRequired);
  });

  it('AUTH-005 requires a password when only the username is provided', () => {
    loginPage.login(Cypress.env('standardUser'), '');
    loginPage.assertErrorMessage(messages.passwordRequired);
  });

  it('AUTH-006 requires a username when only the password is provided', () => {
    loginPage.login('', password());
    loginPage.assertErrorMessage(messages.usernameRequired);
  });

  it('AUTH-007 blocks the locked-out user', () => {
    loginPage.login(Cypress.env('lockedOutUser'), password());
    loginPage.assertErrorMessage(messages.lockedOut);
    cy.url().should('not.include', '/inventory.html');
  });
});
