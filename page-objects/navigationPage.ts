import { Page } from "@playwright/test";
import { PageManager } from "./pageManager";

export class NavigationPage extends PageManager{ 

    constructor(page: Page){
        super(page)
    }

  async navigateToDesiredLocationForWeatherInformation(city: string) {
    const searchBar = await this.page
      .locator('[class="search-input"]')
      .isVisible();
    const fillInput = await this.page
      .locator('[class="search-input"]')
      .pressSequentially(city, { delay: 200 });
    await this.page
      .locator(".search-bar-result .search-bar-result__long-name")
      .getByText(city)
      .first()
      .click();
  }

    async navigateToHourlyPage() {
    const hourlyTabElement = this.page.locator(".subnav-item");
    const hourlyTab = await hourlyTabElement.getByText("hourly").click();
  }
}
