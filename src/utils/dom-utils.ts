import { Locator, Page } from "@playwright/test";

/**
 * Get a Locator by the provided data-test ID attribute.
 *
 * @param page - The Playwright Page object.
 * @param testId - The value of the data-test attribute.
 * @returns A Playwright Locator instance.
 */

export function getByTest(page: Page, testId: string): Locator {
  return page.locator(`[data-test="${testId}"]`);
}
