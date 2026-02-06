import { Locator, Page } from "@playwright/test";

export class WeatherForTodayPage {
  readonly page :Page
  readonly conditionElement: Locator

  constructor(page: Page) {
    this.page = page
    this.conditionElement = this.page.locator('//*[@class="value"]');
  }
/**
 * 
 * @param page Collects current information for time, temperature, wind speed and air quality.
 * @returns an array of thus data in managed format.
 */
  async gatherWeatherInformationForToday() {
    const currentTimeElement = this.page.locator(
      ".cur-con-weather-card__subtitle",
    );
    const currentTime = await currentTimeElement.textContent();
    const actualTempElement = this.page.locator(".temp-container .temp");
    const actualTemp = await actualTempElement.textContent();
    const windSpeed = await this.conditionElement.nth(1).textContent();
    const airQuality = await this.conditionElement.nth(2).textContent();

    const currentWeatherData = [
      `Temperature: ${actualTemp}`,
      `Wind: ${windSpeed}`,
      `Air Quality: ${airQuality}`,
      `Curent time: ${currentTime?.trim()}`,
    ];

    return currentWeatherData;
  }
}
