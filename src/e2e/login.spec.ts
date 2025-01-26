import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import users from '../fixtures/users.json';

let loginPage: any;

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  })

  test('should login with credential', async ({ page }) => {
    await loginPage.fillCredentials(users.success);
    await loginPage.submit();
    await expect(page.getByText('Products')).toBeVisible();
  })

  test('should have required fields', async () => {
    await loginPage.submit();
    loginPage.shouldHaveError('Epic sadface: Username is required');
    loginPage.shouldBeVisible();
  })

  test('should not login locked out user', async () => {
    await loginPage.fillCredentials(users.locked_user);
    await loginPage.submit();
    await loginPage.shouldHaveError('Epic sadface: Sorry, this user has been locked out.');
    await loginPage.shouldBeVisible();
  })
})
