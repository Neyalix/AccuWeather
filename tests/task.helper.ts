import { Page } from "@playwright/test";
/**
 * 
 * @param page Function which navigates to the search bar of the website, search for 'Sofia' and chooses the correct city, 
 * to show Weather information.
 */
export async function navigateToSofia(page: Page){

        const searchBar = await page.locator('[class="search-input"]').isVisible()
        const fillInput = await page.locator('[class="search-input"]').pressSequentially('Sofia', {delay: 200})
        await page.getByText('Sofia, Sofia-Capital BG').click()

}
/**
 * 
 * @param page Collects current information for time, temperature, wind speed and air quality.
 * @returns an array of thus data in managed format.
 */
export async function acumulateDataForToday(page:Page) {
        
        const currentTimeElement =  page.locator('.cur-con-weather-card__subtitle')
        const currentTime = await currentTimeElement.textContent()
        const actualTempElement = page.locator('.temp-container .temp')
        const actualTemp = await actualTempElement.textContent()
        const windSpeedElement = page.locator('//*[@class="value"]')
        const windSpeed = await windSpeedElement.nth(1).textContent()
        const airQualityElement = page.locator('//*[@class="value"]')
        const airQuality = await airQualityElement.nth(3).textContent()

            return  [
           `Temperature: ${actualTemp}`,
           `Wind: ${windSpeed}`,
           `Air Quality: ${airQuality}`,
           `Curent time: ${currentTime?.trim()}`
        ];


}