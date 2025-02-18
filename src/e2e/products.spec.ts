import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { ShoppingCartPage } from '../pages/shoppingCart.page';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let shoppingCartPage: ShoppingCartPage;

test.describe('shopping cart', () => {
  test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productsPage = new ProductsPage(page);
      shoppingCartPage = new ShoppingCartPage(page);
      await loginPage.goto();
      await loginPage.login();
    })

    test('should add and remove products from cart', async ({ page }) => {
      await shoppingCartPage.checkBage('');
      await productsPage.addToShoppingCart('Sauce Labs Backpack');
      await shoppingCartPage.checkBage('1');
      await productsPage.addToShoppingCart('Sauce Labs Bike Light');
      await shoppingCartPage.checkBage('2');
      await productsPage.removeFromShoppingCart('Sauce Labs Backpack');
      await shoppingCartPage.checkBage('1');
    })

    test('should open the product page', async ({ page }) => {
      await productsPage.openProduct('Sauce Labs Backpack');
      const product = page.getByText('Back to products');
      await expect(product).toBeVisible();
    })

    test('should add and remove product to cart from the product page', async ({ page }) => {
      await productsPage.openProduct('Sauce Labs Backpack');
      await shoppingCartPage.checkBage('');
      const addToCartButton = page.locator('button', { hasText: 'Add to cart' });
      await addToCartButton.click();
      await shoppingCartPage.checkBage('1');
      const removeButton = page.locator('button', { hasText: 'Remove' });
      await removeButton.click();
      await shoppingCartPage.checkBage('');
      const backToProductsButton = page.locator('button',{ hasText: 'Back to products' } );
      await backToProductsButton.click();
    })
})
