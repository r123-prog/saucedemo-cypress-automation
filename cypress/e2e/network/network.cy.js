
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import { SELECTORS as S } from '../../support/selectors';

describe('Network | cy.intercept()', () => {
  const inventoryPage = new InventoryPage();
  const ASSET_URL = '**/static/media/*';

  it('NET-001 loads product images successfully (spy)', () => {
    cy.intercept('GET', ASSET_URL).as('productAssets');

    cy.loginAsStandardUser();
    inventoryPage.assertLoaded();

    cy.get(S.inventory.itemImage)
      .should('have.length.greaterThan', 0)
      .each(($img) => {
        cy.wrap($img)
          .should('be.visible')
          .and(($image) => {
            expect($image[0].naturalWidth).to.be.greaterThan(0);
          });
      });
  });

  it('NET-002 keeps the catalogue usable when images fail to load (stub)', () => {
    cy.intercept('GET', ASSET_URL, {
      statusCode: 404,
      body: ''
    }).as('brokenAssets');

    cy.loginAsStandardUser();

    cy.get(S.inventory.item).should('have.length.greaterThan', 0);
    cy.get(S.inventory.itemName).first().should('be.visible');
    cy.get(S.inventory.itemPrice).first().should('be.visible');
  });

  it('NET-003 does not depend on third-party telemetry (blocked globally)', () => {
    cy.intercept(
      { method: 'POST', url: '**/events.backtrace.io/**' },
      { statusCode: 500 }
    ).as('telemetryDown');

    new LoginPage()
      .visit()
      .login(Cypress.env('standardUser'), Cypress.env('demoPassword'));

    inventoryPage.assertLoaded();
  });
});

