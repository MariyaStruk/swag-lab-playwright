import { Page, expect } from "@playwright/test";

export class ShoppingCartPage {
  constructor(page: Page) {
    this.page = page;
  }

  checkBage(count: string) {
   const bage = this.page.locator('.shopping_cart_badge');

   if (count) {
    expect(bage).toHaveText(count);
   } else {
    expect(bage).toBeHidden();
   }
  }
}