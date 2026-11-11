import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import { roundCents } from '../../support/utils';

describe('Checkout', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  let products;
  let customers;
  let messages;

  before(() => {
    cy.fixture('products').then((data) => (products = data.items));
    cy.fixture('customers').then((data) => (customers = data));
    cy.fixture('messages').then((data) => (messages = data.checkout));
  });

  /** Adds products, opens the cart and starts checkout. */
  const startCheckout = (selected) => {
    cy.addToCart(selected.map((p) => p.slug));
    inventoryPage.openCart();
    cartPage.proceedToCheckout();
    checkoutPage.assertInformationStep();
  };

  beforeEach(() => {
    cy.loginAsStandardUser();
    inventoryPage.assertLoaded();
  });

  it('CHK-001 completes an order successfully', () => {
    startCheckout([products[0]]);
    checkoutPage.fillCustomerInformation(customers.valid).continue();
    checkoutPage.assertOverviewStep().assertTotals(products[0].price).finish();
    checkoutPage.assertOrderComplete(messages.orderComplete);
  });

  it('CHK-002 calculates the totals for several products', () => {
    const selected = products.slice(0, 3);
    const expectedSubtotal = roundCents(selected.reduce((sum, p) => sum + p.price, 0));
    startCheckout(selected);
    checkoutPage.fillCustomerInformation(customers.valid).continue();
    checkoutPage.assertOverviewStep().assertTotals(expectedSubtotal);
  });

  it('CHK-003 empties the cart after the order is placed', () => {
    startCheckout([products[0]]);
    checkoutPage.fillCustomerInformation(customers.valid).continue().finish();
    checkoutPage.assertOrderComplete(messages.orderComplete).backHome();
    inventoryPage.assertLoaded().assertCartCount(0);
  });

  it('CHK-004 requires a first name', () => {
    startCheckout([products[0]]);
    checkoutPage.fillCustomerInformation(customers.missingFirstName).continue();
    checkoutPage.assertErrorMessage(messages.firstNameRequired).assertInformationStep();
  });

  it('CHK-005 requires a last name', () => {
    startCheckout([products[0]]);
    checkoutPage.fillCustomerInformation(customers.missingLastName).continue();
    checkoutPage.assertErrorMessage(messages.lastNameRequired).assertInformationStep();
  });

  it('CHK-006 requires a postal code', () => {
    startCheckout([products[0]]);
    checkoutPage.fillCustomerInformation(customers.missingPostalCode).continue();
    checkoutPage.assertErrorMessage(messages.postalCodeRequired).assertInformationStep();
  });

  it('CHK-007 reports the first missing field when the form is empty', () => {
    startCheckout([products[0]]);
    checkoutPage.continue();
    checkoutPage.assertErrorMessage(messages.firstNameRequired);
  });

  it('CHK-008 cancel returns to the cart with items intact', () => {
    startCheckout([products[0]]);
    checkoutPage.cancel();
    cartPage.assertLoaded().assertContainsProduct(products[0].name);
  });
});
