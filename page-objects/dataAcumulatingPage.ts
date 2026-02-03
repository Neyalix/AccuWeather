import { Locator, Page } from "@playwright/test";


export class DataAcumulatingPage {
  readonly page: Page
  readonly hourseOfTheDay: Locator;
  readonly tempOfTheDay: Locator;
  readonly airQualityOfTheDay: Locator;
  readonly windOfTheDay: Locator;
  readonly weatherOfTheDay: Locator;

  constructor(page: Page) {
    this.page = page
    this.hourseOfTheDay = page.locator(".hourly-card-subcontaint .date");
    this.tempOfTheDay = page.locator(".temp");
    this.airQualityOfTheDay = page
      .locator(".hourly-detailed-card-header .panel")
      .getByText("Air Quality")
      .locator(".value");
    this.windOfTheDay = page
      .locator(".hourly-detailed-card-header .panel")
      .getByText("Wind")
      .locator(".value");
    this.weatherOfTheDay = page.locator(
      ".hourly-detailed-card-header  .phrase",
    );
  }

  async collectHoursOfTheDayRemaining() {
    // const leftHours = this.page.locator('.hourly-card-subcontaint .date')
    await this.hourseOfTheDay.first().waitFor({ state: "visible" });
    return this.hourseOfTheDay;
  }

  async collectTemperatureForEachHour() {
    // const temps = this.page.locator('.temp')
    await this.tempOfTheDay.first().waitFor({ state: "visible" });
    return this.tempOfTheDay;
  }

  async collectAirQualityForEachHour() {
    // const airQualityInfoPerHour = this.page.locator('.hourly-detailed-card-header .panel').getByText('Air Quality').locator('.value')
    await this.airQualityOfTheDay.first().waitFor({ state: "visible" });
    return this.airQualityOfTheDay;
  }

  async collectTheWindInfoForEachHour() {
    // const windInfoPerHour = this.page.locator('.hourly-detailed-card-header .panel').getByText('Wind').locator('.value')
    await this.windOfTheDay.first().waitFor({ state: "visible" });
    return this.windOfTheDay;
  }

  async gatherTheWeatherConditionForEachHour() {
    // const weatherCondition = this.page.locator('.hourly-detailed-card-header  .phrase')
    await this.weatherOfTheDay.first().waitFor({ state: "visible" });
    return this.weatherOfTheDay;
  }

  async combinedAllAcumulatedData(page: Page) {
    const leftHours = await this.collectHoursOfTheDayRemaining();
    const airQualityInfoPerHour = await this.collectAirQualityForEachHour();
    const temps = await this.collectTemperatureForEachHour();
    const windInfoPerHour = await this.collectTheWindInfoForEachHour();
    const weatherCondition = await this.gatherTheWeatherConditionForEachHour();
    const count = await leftHours.count();

    const weatherData = [];
    for (let i = 0; i < count; i++) {
      const tempPerHour = await temps.nth(i).innerText();
      const hoursOfTheDay = await leftHours.nth(i).innerText();
      const airQualityPerHour = await airQualityInfoPerHour.nth(i).innerText();
      const windPerHour = await windInfoPerHour.nth(i).innerText();
      const conditionPerHour = await weatherCondition.nth(i).innerText();

      weatherData.push({
        hour: hoursOfTheDay,
        temp: tempPerHour,
        air: airQualityPerHour,
        wind: windPerHour,
        condition: conditionPerHour,
      });
    }
    return weatherData;
  }
  async takeAverageTemperatureFromTheHourlyTemperature(weatherData: any[]) {
    let total = 0;
    let count = weatherData.length;
    for (let t = 0; t < count; t++) {
      let tempString = weatherData[t].temp;
      let cleanTempPerHourWithoutSymbols = Number(tempString.replace("°", ""));

      total += cleanTempPerHourWithoutSymbols;
    }
    total /= count
    return total;
  }
}
