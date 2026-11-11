import BasePage from './BasePage';
import { SELECTORS as S } from '../support/selectors';

export default class LoginPage extends BasePage {
  visit() {
    cy.visit('/');
    return this;
  }

  enterUsername(username) {
    if (username) cy.get(S.login.username).type(username);
    return this;
  }

  enterPassword(password) {
    if (password) cy.get(S.login.password).type(password, { log: false });
    return this;
  }

  submit() {
    cy.get(S.login.loginButton).click();
    return this;
  }

  login(username, password) {
    return this.enterUsername(username).enterPassword(password).submit();
  }

  assertErrorMessage(message) {
    cy.get(S.login.error).should('be.visible').and('contain.text', message);
    return this;
  }

  assertLoginFormVisible() {
    cy.get(S.login.username).should('be.visible');
    cy.get(S.login.password).should('be.visible');
    cy.get(S.login.loginButton).should('be.visible');
    return this;
  }
}
