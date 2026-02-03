import { Page } from "@playwright/test";

export class HourlyPage {
  
  readonly page: Page

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHourlyPage() {
    const hourlyTabElement = this.page.locator(".subnav-item");
    const hourlyTab = await hourlyTabElement.getByText("hourly").click();
  }
}
