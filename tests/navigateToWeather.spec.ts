import { test, expect } from '@playwright/test';
import { handleAds } from './adBlocker.helper';
import { acumulateDataForToday, navigateToSofia } from './task.helper';
import { privacyNotiveConfirmation } from './privacy.helper';
import {  hourlyNavigation } from './bonus.helper';
import { averageTempForTheRestOfTheDay, dataAcumulationPerHour } from './bonus.helper';



test.beforeEach(async({page}) => {
    await page.goto('https://www.accuweather.com/') 

})


test.describe('Accumulate Data', () => {
    test.beforeEach(async({page}) => {
        await privacyNotiveConfirmation(page)
        await handleAds(page)
    
    })
    test('Get the actual data for Current Weather from Tab - Today', async({page}) => {
        
        await navigateToSofia(page) 
        const acumulatedData = await acumulateDataForToday(page)
        const managedWeatherData = acumulatedData.join('\n')
        console.log(managedWeatherData)
    }) 
   
})

test.describe('Bonus Task', () => {
    test.beforeEach(async({page}) => {
        await privacyNotiveConfirmation(page)
        await handleAds(page)
    })
    test('Collect hourly params', async({page}) => {
        await navigateToSofia(page)
        await hourlyNavigation(page)
  
        const weather = await dataAcumulationPerHour(page)
        const avTemp = averageTempForTheRestOfTheDay(weather)
        console.table(weather)  
        console.log(`The average temperature for the rest of the day is: ${avTemp.toFixed(0)}°`)
        
    })
})
