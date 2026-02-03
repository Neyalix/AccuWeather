import { test } from "@playwright/test";
import { DataAcumulatingPage } from "../page-objects/dataAcumulatingPage";
import { HelperBase } from "../page-objects/helperBase";
import { WeatherForTodayPage } from "../page-objects/todaysWeatherPage";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.accuweather.com/");
});

test.describe("Accumulate Data", () => {
  test.beforeEach(async ({ page }) => {
    const waitForRequest = new HelperBase(page);

    await waitForRequest.waitForPrivacySettingsConfirmation();
    await waitForRequest.waitForRequestFromAdvertWebsiteAndBlockIt();
  });
  test("Get the actual data for Current Weather from Tab - Today", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm
      .navigateTo()
      .navigateToDesiredLocationForWeatherInformation("Sofia");
    // const navigateTo = new NavigationPage(page);
    // const weatherForToday = new WeatherForTodayPage(page)
    await pm.weatherForToday().gatherWeatherInformationForToday();

    // await navigateTo.navigateToDesiredLocationForWeatherInformation("Sofia");
    const todaysWeather = await pm
      .weatherForToday()
      .gatherWeatherInformationForToday();

    const managedWeatherData = todaysWeather.join("\n");
    console.log(managedWeatherData);
  });
});

test.describe("Bonus Task", () => {
  test.beforeEach(async ({ page }) => {
    const waitForRequest = new HelperBase(page);

    await waitForRequest.waitForPrivacySettingsConfirmation();
    await waitForRequest.waitForRequestFromAdvertWebsiteAndBlockIt();
  });
  test("Collect hourly params", async ({ page }) => {
    const pm = new PageManager(page);
    await pm
      .navigateTo()
      .navigateToDesiredLocationForWeatherInformation("Sofia");
    await pm.navigateTo().navigateToHourlyPage();
    // const navigateTo = new NavigationPage(page);
    // const navigateToHourly = new HourlyPage(page);
    const weatherInformation = new DataAcumulatingPage(page);

    // navigateTo.navigateToDesiredLocationForWeatherInformation("London");

    // await navigateToHourly.navigateToHourlyPage();
    const weatherInfo2 =
      await weatherInformation.combinedAllAcumulatedData(page);
    const avTemp =
      await weatherInformation.takeAverageTemperatureFromTheHourlyTemperature(
        weatherInfo2,
      );
    console.table(weatherInfo2);
    console.log(
      `The average temperature for the rest of the day is: ${avTemp.toFixed(0)}°`,
    );
  });
});
