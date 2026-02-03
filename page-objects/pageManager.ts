import { Page } from "@playwright/test";
import { HourlyPage } from "./hourlyPage.ts";
import { NavigationPage } from "./navigationPage.ts";
import { WeatherForTodayPage } from "./todaysWeatherPage.ts";
import { DataAcumulatingPage } from "./dataAcumulatingPage.ts";

export class PageManager{
    readonly page: Page
    readonly hourlyPage: HourlyPage
    readonly navigationPage: NavigationPage
    readonly weatherForTodayPage: WeatherForTodayPage
    readonly dataAcumulatingPage: DataAcumulatingPage

    constructor(page:Page){
        this.page = page
        this.hourlyPage = new HourlyPage(this.page)
        this.navigationPage = new NavigationPage(this.page)
        this.weatherForTodayPage = new WeatherForTodayPage(this.page)
        this.dataAcumulatingPage = new DataAcumulatingPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    weatherInformation(){
        return this.dataAcumulatingPage
    }

    navigateToHourly(){
        return this.hourlyPage
    }

    weatherForToday(){
        return this.weatherForTodayPage
    }
}