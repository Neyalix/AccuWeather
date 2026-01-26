import { Page } from "@playwright/test";
/**
 * 
 * @param privacyNotiveConfirmation Function which wait for the page to load and confirm the Privacy Notice 
 * a.k.a (Accept cookies) so the test might continue. 
 */
export async function privacyNotiveConfirmation(page:Page) {
        const privacyPromise = page.locator('#ketch-banner', {hasText: 'Privacy Promise'})
        await privacyPromise.getByRole("button", {name: "Consent"}).first().click()
}