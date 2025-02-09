import { Page, expect } from "@playwright/test";

export class ProductsPage {
  constructor(page: Page) {
    this.page = page;
  }

  getProduct(productTitle: string) {
    const productName = this.page.locator('.inventory_item_name ', { hasText: productTitle });
    return this.page.locator('.inventory_item', { has: productName });
  }

  async addToShoppingCart(productTitle: string) {
    const product = this.getProduct(productTitle);
    const addToCartButton =  product.locator('button', { hasText: 'Add to cart' });
    const removeButton = product.locator('button', { hasText: 'Remove' });

    expect(removeButton).toBeHidden();
    await addToCartButton.click();
    await expect(addToCartButton).toBeHidden();
    await expect(removeButton).toBeVisible();
  }

  async removeFromShoppingCart(productTitle: string) {
    const product = this.getProduct(productTitle);
    const addToCartButton =  product.locator('button', { hasText: 'Add to cart' });
    const removeButton = product.locator('button', { hasText: 'Remove' });

    expect(addToCartButton).toBeHidden();
    await removeButton.click();
    await expect(removeButton).toBeHidden();
    await expect(addToCartButton).toBeVisible();
  }
}
