import { Page } from "@playwright/test";

/**
 * 
 * @param page With this function we navigate to the hourly tab once we are in Sofia
 */
export async function hourlyNavigation(page:Page) {
    const hourlyTabElement = page.locator('.subnav-item')
    const hourlyTab = await hourlyTabElement.getByText('hourly').click()
}
/**
 * 
 * @param page Function which finds all needed elemnts, collects data from them, 
 * store them in arrays and store them into Multidimensional array.
 * @returns Arrays with information about the weather conditions per hour.
 */
export async function dataAcumulationPerHour(page:Page){
        const leftHours = page.locator('.hourly-card-subcontaint .date')
        await leftHours.first().waitFor({state: 'visible'})
        const count = await leftHours.count()
        const temps = page.locator('.temp')
        await temps.first().waitFor({state: 'visible'})
        const airQualityInfoPerHour = page.locator('.hourly-detailed-card-header .panel').getByText('Air Quality').locator('.value')
        await airQualityInfoPerHour.first().waitFor({state: 'visible'})
        const windInfoPerHour = page.locator('.hourly-detailed-card-header .panel').getByText('Wind').locator('.value')
        await windInfoPerHour.first().waitFor({state: 'visible'})
        const weatherCondition = page.locator('.hourly-detailed-card-header  .phrase')
        await weatherCondition.first().waitFor({state: 'visible'})

        const weatherData = []
        for(let i = 0; i < count; i++){             
        
        const tempPerHour = await temps.nth(i).innerText()
        const hoursOfTheDay = await leftHours.nth(i).innerText()
        const airQualityPerHour = await airQualityInfoPerHour.nth(i).innerText()
        const windPerHour = await windInfoPerHour.nth(i).innerText()
        const conditionPerHour = await weatherCondition.nth(i).innerText()
            
            weatherData.push({
                hour: hoursOfTheDay,
                temp: tempPerHour,
                air: airQualityPerHour,
                wind: windPerHour,
                condition: conditionPerHour
            })
           
        }
        return weatherData
        // console.table(weatherData)
}
/**
 * 
 * @param averageTempForTheRestOfTheDay This finction takes the weatherData array from the main function, 
 * which contains 4 arrays with different conditions
 * Collects the array of temperature, removes the ° symbol, parse it to a number and accumulate all numbers
 * into  a single digit then divide it to the array count 
 * @returns Average temperature for the rest of the day
 */
export function averageTempForTheRestOfTheDay(weatherData: any[]):number {
    let total = 0
    let count = weatherData.length
    for(let t = 0; t < count; t++){
            let tempString = weatherData[t].temp
            let cleanTempPerHourWithoutSymbols = Number(tempString.replace('°', ''))

            total += cleanTempPerHourWithoutSymbols
        }
        return total / count
}
   