import { Page } from "@playwright/test"

export class NavigationPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToDesiredLocationForWeatherInformation(city: string) {
    const searchBar = await this.page.locator('[class="search-input"]').isVisible()
    const fillInput = await this.page.locator('[class="search-input"]').pressSequentially(city, { delay: 200 })
    await this.page.locator(".search-bar-result .search-bar-result__long-name").getByText(city).first().click()
  }
}
