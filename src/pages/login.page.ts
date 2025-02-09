import { expect } from '@playwright/test';
import { Locator, Page } from "@playwright/test";
import { UserCredentials } from '../interfaces/user-credentials.ts'
import users from '../fixtures/users.json';


export class LoginPage {
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly errorMessageContainer: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.userNameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.errorMessageContainer = page.locator('.error-message-container')
  }

  async login() {
    await this.fillCredentials(users.success);
    await this.submit();
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async shouldBeVisible() {
    await expect(this.page.getByText('Login')).toBeVisible();
  }

  async fillCredentials(credentials: UserCredentials) {
    await this.userNameField.fill(credentials.username);
    await this.passwordField.fill(credentials.password);
  }

  async submit() {
    await this.page.getByRole('button', { hasText: 'Login' }).click();
  }

  async shouldHaveError(errorMessage: string) {
    await expect(this.errorMessageContainer).toHaveText(errorMessage);
  }
}