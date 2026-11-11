import InventoryPage from '../../pages/InventoryPage';
import { SELECTORS as S } from '../../support/selectors';
import { isSorted } from '../../support/utils';

describe('Product Management | Catalogue', () => {
  const inventoryPage = new InventoryPage();
  let products;

  before(() => {
    cy.fixture('products').then((data) => (products = data.items));
  });

  beforeEach(() => {
    cy.loginAsStandardUser();
    inventoryPage.assertLoaded();
  });

  it('PROD-001 displays all products with name, price, image and add button', () => {
    cy.get(S.inventory.item).should('have.length', products.length);
    products.forEach((product) => {
      cy.contains(S.inventory.item, product.name).within(() => {
        cy.get(S.inventory.itemPrice).should('have.text', `$${product.price}`);
        cy.get(S.inventory.itemDescription).should('not.be.empty');
        cy.get('img').should('be.visible');
        cy.get(S.inventory.addToCart(product.slug)).should('be.visible').and('contain.text', 'Add to cart');
      });
    });
  });

  it('PROD-002 shows matching details when a product is opened', () => {
    const product = products[0];
    inventoryPage.openProductDetails(product.name);
    cy.url().should('include', '/inventory-item.html');
    cy.get(S.inventory.itemName).should('have.text', product.name);
    cy.get(S.inventory.itemPrice).should('have.text', `$${product.price}`);
    cy.get(S.inventory.itemDescription).should('be.visible');
    inventoryPage.backToProducts();
    inventoryPage.assertLoaded();
  });

  describe('sorting', () => {
    it('PROD-003 sorts by name A to Z', () => {
      inventoryPage.sortBy('az');
      inventoryPage.getProductNames().then((names) => expect(isSorted(names, 'asc')).to.be.true);
    });

    it('PROD-004 sorts by name Z to A', () => {
      inventoryPage.sortBy('za');
      inventoryPage.getProductNames().then((names) => expect(isSorted(names, 'desc')).to.be.true);
    });

    it('PROD-005 sorts by price low to high', () => {
      inventoryPage.sortBy('lohi');
      inventoryPage.getProductPrices().then((prices) => expect(isSorted(prices, 'asc')).to.be.true);
    });

    it('PROD-006 sorts by price high to low', () => {
      inventoryPage.sortBy('hilo');
      inventoryPage.getProductPrices().then((prices) => expect(isSorted(prices, 'desc')).to.be.true);
    });
  });

  describe('adding and removing from the inventory page', () => {
    it('PROD-007 adds a product to the cart', () => {
      const { slug } = products[0];
      inventoryPage.addToCart(slug).assertCartCount(1);
      cy.get(S.inventory.remove(slug)).should('be.visible').and('contain.text', 'Remove');
    });

    it('PROD-008 adds several products and updates the cart badge', () => {
      cy.addToCart(products.slice(0, 3).map((p) => p.slug));
      inventoryPage.assertCartCount(3);
    });

    it('PROD-009 removes a product from the inventory page', () => {
      const { slug } = products[0];
      inventoryPage.addToCart(slug).removeFromCart(slug).assertCartCount(0);
      cy.get(S.inventory.addToCart(slug)).should('be.visible');
    });
  });
});
