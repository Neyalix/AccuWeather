import { Page } from "@playwright/test";
import { PageManager } from "./pageManager.ts";

export class HourlyPage extends PageManager {

  constructor(page: Page) {
    super(page);
  }

  async navigateToHourlyPage() {
    const hourlyTabElement = this.page.locator(".subnav-item");
    const hourlyTab = await hourlyTabElement.getByText("hourly").click();
  }
}
