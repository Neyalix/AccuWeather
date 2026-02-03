import { Page } from "@playwright/test";

export class WeatherForTodayPage {
  readonly page :Page

  constructor(page: Page) {
    this.page = page
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
    const windSpeedElement = this.page.locator('//*[@class="value"]');
    const windSpeed = await windSpeedElement.nth(1).textContent();
    const airQualityElement = this.page.locator('//*[@class="value"]');
    const airQuality = await airQualityElement.nth(2).textContent();

    const currentWeatherData = [
      `Temperature: ${actualTemp}`,
      `Wind: ${windSpeed}`,
      `Air Quality: ${airQuality}`,
      `Curent time: ${currentTime?.trim()}`,
    ];

    return currentWeatherData;
  }
}
