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
/**
 * Method which locates the hour in the hourly banner
 * @returns the hour
 */
  async collectHoursOfTheDayRemaining() {
    await this.hourseOfTheDay.first().waitFor({ state: "visible" });
    return this.hourseOfTheDay;
  }
/**
 * collect the temperature for the given hour
 * @returns the temp
 */
  async collectTemperatureForEachHour() {
    await this.tempOfTheDay.first().waitFor({ state: "visible" });
    return this.tempOfTheDay;
  }
/**
 * Collects the ait quality per hour
 * @returns the air quality
 */
  async collectAirQualityForEachHour() {
    await this.airQualityOfTheDay.first().waitFor({ state: "visible" });
    return this.airQualityOfTheDay;
  }
/**
 * Collects the win info for the hour
 * @returns the wind condition
 */
  async collectTheWindInfoForEachHour() {
    await this.windOfTheDay.first().waitFor({ state: "visible" });
    return this.windOfTheDay;
  }
/**
 * Collects weather condition per hour
 * @returns ewather condition
 */
  async gatherTheWeatherConditionForEachHour() {
    await this.weatherOfTheDay.first().waitFor({ state: "visible" });
    return this.weatherOfTheDay;
  }
/**
 * 
 * @param page This Method collect all the elements from the locators and stores them in a collection
 * @returns collection of arrays for each category for the rest of the day
 */
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
/**
 * 
 * @param weatherData Exportonly the temperature from the collection, replace the char and parse it into a number
 * @returns average temperature for the day
 */
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
