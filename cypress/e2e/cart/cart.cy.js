import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';

describe('Shopping Cart', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  let products;

  before(() => {
    cy.fixture('products').then((data) => (products = data.items));
  });

  beforeEach(() => {
    cy.loginAsStandardUser();
    inventoryPage.assertLoaded();
  });

  it('CART-001 lists exactly the products that were added', () => {
    const selected = products.slice(0, 2);
    cy.addToCart(selected.map((p) => p.slug));
    inventoryPage.openCart();
    cartPage.assertLoaded().assertItemCount(selected.length);
    selected.forEach((p) => cartPage.assertContainsProduct(p.name));
  });

  it('CART-002 shows a quantity of 1 for each added product', () => {
    const selected = products.slice(0, 2);
    cy.addToCart(selected.map((p) => p.slug));
    inventoryPage.openCart();
    selected.forEach((p) => cartPage.assertQuantity(p.name, 1));
  });

  it('CART-003 removes a product from the cart', () => {
    const [first, second] = products;
    cy.addToCart([first.slug, second.slug]);
    inventoryPage.openCart();
    cartPage.removeItem(first.slug).assertDoesNotContainProduct(first.name).assertItemCount(1);
    cartPage.assertContainsProduct(second.name).assertCartCount(1);
  });

  it('CART-004 returns to the catalogue with Continue Shopping and keeps the cart', () => {
    cy.addToCart(products[0].slug);
    inventoryPage.openCart();
    cartPage.continueShopping();
    inventoryPage.assertLoaded().assertCartCount(1);
  });

  it('CART-005 persists cart contents after a page reload', () => {
    cy.addToCart(products[0].slug);
    inventoryPage.openCart();
    cy.reload();
    cartPage.assertLoaded().assertContainsProduct(products[0].name).assertCartCount(1);
  });

  it('CART-006 persists cart contents while navigating between pages', () => {
    cy.addToCart([products[0].slug, products[1].slug]);
    inventoryPage.openProductDetails(products[2].name);
    inventoryPage.backToProducts();
    inventoryPage.assertCartCount(2);
  });

  it('CART-007 shows an empty cart with no badge when nothing was added', () => {
    inventoryPage.assertCartCount(0).openCart();
    cartPage.assertLoaded().assertItemCount(0);
  });
});
