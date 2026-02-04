import { expect, test } from "@playwright/test";
import { DataAcumulatingPage } from "../page-objects/hourlyDataAcumulatingPage";
import { HelperBase } from "../page-objects/helperBase";
import { NavigationPage } from "../page-objects/navigationPage";
import { WeatherForTodayPage } from "../page-objects/todaysWeatherPage";


test.beforeEach(async ({ page }) => {
  await page.goto("https://www.accuweather.com/");
});

test.describe("Accumulate Data", () => {
  test.beforeEach(async ({ page }) => {
    const waitForRequest = new HelperBase(page);
    await waitForRequest.waitForPrivacySettingsConfirmation();
    await waitForRequest.waitForRequestFromAdvertWebsiteAndBlockIt();
  });
  test("Get the actual data for Current Weather from Tab - Today, navigate to Sofia", async ({page}) => {
    
    const navigateTo = new NavigationPage(page);
    const weatherForToday = new WeatherForTodayPage(page)

    await navigateTo.navigateToDesiredLocationForWeatherInformation("Sofia");
    await expect(page).toHaveURL(/.*sofia.*/)
    const todaysWeather = await weatherForToday.gatherWeatherInformationForToday()
    expect(todaysWeather.length).toBeGreaterThan(0)
    expect(todaysWeather[0]).not.toBeNull()
    const managedWeatherData = todaysWeather.join("\n");
    console.log(managedWeatherData);
  });
});

test.describe("Bonus Task", () => {
  test.beforeEach(async ({ page }) => {
    const waitForRequest = new HelperBase(page);

    await waitForRequest.waitForRequestFromAdvertWebsiteAndBlockIt();
    await waitForRequest.waitForPrivacySettingsConfirmation();
  });
  test("Collect hourly params from Sofia", async ({ page }) => {  
    const navigateTo = new NavigationPage(page);
    const weatherInformation = new DataAcumulatingPage(page);

    navigateTo.navigateToDesiredLocationForWeatherInformation("Sofia");

    await navigateTo.navigateToHourlyPage();
    await expect(page).toHaveURL(/.*hourly*./)
    const weatherInfo2 =
      await weatherInformation.combinedAllAcumulatedData();
    const avTemp =
      await weatherInformation.takeAverageTemperatureFromTheHourlyTemperature(weatherInfo2);
      expect(avTemp).not.toBeNaN();
    console.table(weatherInfo2);
    console.log(
      `The average temperature for the rest of the day is: ${avTemp.toFixed(0)}°`,
    );
  });
});
