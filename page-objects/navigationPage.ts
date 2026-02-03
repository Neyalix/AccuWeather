import { Locator, Page } from "@playwright/test"

export class NavigationPage {
  readonly page: Page
  readonly searchbarNav: Locator
  readonly hourlyTab: Locator
  constructor(page: Page) {
    this.page = page;
    this.searchbarNav = page.locator('[class="search-input"]');
    this.hourlyTab = page.locator(".subnav-item");
  }
/**
 * 
 * @param page Function which navigates to the search bar of the website, enters a argoment city in the test, 
 * to show Weather information.
 */
  async navigateToDesiredLocationForWeatherInformation(city: string) {
    
    const searchBar = await this.searchbarNav.isVisible()
    const fillInput = await this.searchbarNav.pressSequentially(city, { delay: 200 })
    await this.page.locator(".search-bar-result .search-bar-result__long-name").getByText(city).first().click()
  }

  /**
 * 
 * @param page With this method we navigate to the hourly tab once we are in Sofia
 */
  async navigateToHourlyPage() {
    const hourlyTab = await this.hourlyTab.getByText("hourly").click();
  }
}
