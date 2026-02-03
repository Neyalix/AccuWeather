import { Page } from "@playwright/test"

export class NavigationPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page;
  }
/**
 * 
 * @param page Function which navigates to the search bar of the website, enters a argoment city in the test, 
 * to show Weather information.
 */
  async navigateToDesiredLocationForWeatherInformation(city: string) {
    const searchBar = await this.page.locator('[class="search-input"]').isVisible()
    const fillInput = await this.page.locator('[class="search-input"]').pressSequentially(city, { delay: 200 })
    await this.page.locator(".search-bar-result .search-bar-result__long-name").getByText(city).first().click()
  }

  /**
 * 
 * @param page With this function we navigate to the hourly tab once we are in Sofia
 */
  async navigateToHourlyPage() {
    const hourlyTabElement = this.page.locator(".subnav-item");
    const hourlyTab = await hourlyTabElement.getByText("hourly").click();
  }
}
