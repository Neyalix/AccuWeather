import { Page } from "@playwright/test";

export class HelperBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   *
   * @param HandleAds This is a function which goes through the website and follows all requests, filters them from the list of ads websites and blocks them.
   */
  async waitForRequestFromAdvertWebsiteAndBlockIt() {
    const adDomains = [
      "googleads",
      "doubleclick",
      "amazon-adsystem",
      "adnxs",
      "adsafeprotected",
      "caselemedia",
    ];

    await this.page.route("**/*", (route) => {
      const url = route.request().url();
      const isAd = adDomains.some((domain) => url.includes(domain));

      const isMedia = url.endsWith(".mp4") || url.endsWith(".avi");

      if (isAd || isMedia) {
        return url;
      } else {
        route.continue();
      }
    });
  }
  /**
   *
   * @param privacyNotiveConfirmation Function which wait for the page to load and confirm the Privacy Notice
   * a.k.a (Accept cookies) so the test might continue.
   */
  async waitForPrivacySettingsConfirmation() {
    const privacyPromise = this.page.locator("#ketch-banner", {
      hasText: "Privacy Promise",
    });
    await privacyPromise
      .getByRole("button", { name: "Consent" })
      .first()
      .click();
  }
}
