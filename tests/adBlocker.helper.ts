import {Page} from "@playwright/test";

/**
 * 
 * @param HandleAds This is a function which goes through the website and follows all requests, filters them from the list of ads websites and blocks them.
 */
export async function handleAds(page: Page) {
    
    const adDomains = [
        'googleads',
        'doubleclick',
        'amazon-adsystem',
        'adnxs',
        'adsafeprotected',
        'caselemedia'
    ];

    await page.route('**/*', (route) => {
        const url = route.request().url()
        const isAd = adDomains.some(domain => url.includes(domain))

    const isMedia = url.endsWith('.mp4') || url.endsWith('.avi')

    if (isAd || isMedia) {
        return url
    } else {
        route.continue()
    }
    })
}