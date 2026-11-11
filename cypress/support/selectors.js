/**
 * Centralised selectors. Sauce Demo exposes stable `data-test` attributes,
 * so every selector below uses them (except the burger-menu button, which only has an id).
 */
const byTest = (id) => `[data-test="${id}"]`;

export const SELECTORS = {
  common: {
    title: byTest('title'),
    cartLink: byTest('shopping-cart-link'),
    cartBadge: byTest('shopping-cart-badge'),
    menuButton: '#react-burger-menu-btn',
    logoutLink: byTest('logout-sidebar-link'),
  },
  login: {
    username: byTest('username'),
    password: byTest('password'),
    loginButton: byTest('login-button'),
    error: byTest('error'),
  },
  inventory: {
    item: byTest('inventory-item'),
    itemName: byTest('inventory-item-name'),
    itemDescription: byTest('inventory-item-desc'),
    itemPrice: byTest('inventory-item-price'),
    itemImage: '.inventory_item_img img',
    sortDropdown: byTest('product-sort-container'),
    addToCart: (slug) => byTest(`add-to-cart-${slug}`),
    remove: (slug) => byTest(`remove-${slug}`),
    backToProducts: byTest('back-to-products'),
  },
  cart: {
    item: byTest('inventory-item'),
    itemName: byTest('inventory-item-name'),
    quantity: byTest('item-quantity'),
    continueShopping: byTest('continue-shopping'),
    checkout: byTest('checkout'),
    remove: (slug) => byTest(`remove-${slug}`),
  },
  checkout: {
    firstName: byTest('firstName'),
    lastName: byTest('lastName'),
    postalCode: byTest('postalCode'),
    continue: byTest('continue'),
    cancel: byTest('cancel'),
    error: byTest('error'),
    finish: byTest('finish'),
    subtotal: byTest('subtotal-label'),
    tax: byTest('tax-label'),
    total: byTest('total-label'),
    completeHeader: byTest('complete-header'),
    completeText: byTest('complete-text'),
    backHome: byTest('back-to-products'),
  },
};
