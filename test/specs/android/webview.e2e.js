const LeftSideMenuScreen = require('../../screenObjects/android/LeftSideMenu.screen');
const WebviewScreen = require('../../screenObjects/android/Webview.screen');

describe('Webview', () => {
  beforeEach(async () => {
    await LeftSideMenuScreen.navigateToWebview();
  });

  afterEach(async () => {
    const currentContext = await driver.getContext();
    if (currentContext !== 'NATIVE_APP') {
      await WebviewScreen.switchToNativeContext();
    }
    // Dismiss any load-error dialog left by the emulator before navigating back
    await WebviewScreen.dismissLoadErrorIfPresent();
    // Navigate back from wherever the test left the app
    await driver.back();
    // TC-034 leaves the app on the webview content screen (one level deeper than
    // the URL-entry screen), so a single back() lands on the URL-entry screen.
    // Detect that and go back one more level to reach the catalog.
    const stillOnUrlEntry = await WebviewScreen.webviewContainer.isDisplayed().catch(() => false);
    if (stillOnUrlEntry) {
      await driver.back();
    }
  });

  // TC-034: valid HTTPS URL — WEBVIEW context must appear (no Chromedriver switch needed)
  it('should expose a webview context when a valid HTTPS URL is entered', async () => {
    await WebviewScreen.navigateToUrl('https://www.example.com');

    await WebviewScreen.waitForWebviewContext();

    const hasWebview = await WebviewScreen.hasWebviewContext();
    expect(hasWebview).toBe(true);
  });

  // TC-035: HTTP URL — stays on native screen, no webview context appears
  it('should not navigate to webview when an HTTP (non-HTTPS) URL is entered', async () => {
    await WebviewScreen.navigateToUrl('http://www.example.com');

    await expect(WebviewScreen.webviewContainer).toBeDisplayed();
    await expect(WebviewScreen.httpsHintText).toBeDisplayed();

    const hasWebview = await WebviewScreen.hasWebviewContext();
    expect(hasWebview).toBe(false);
  });

  // TC-036: empty URL field — app does not crash; URL-entry screen remains
  it('should not crash when Go To Site is tapped with an empty URL field', async () => {
    await WebviewScreen.goToSiteBtn.click();

    await expect(WebviewScreen.webviewContainer).toBeDisplayed();
    await expect(WebviewScreen.urlInputField).toBeDisplayed();
  });

  // TC-037: invalid URL format — stays on native screen, no webview context appears
  it('should not navigate to webview when an invalid URL format is entered', async () => {
    await WebviewScreen.navigateToUrl('not-a-url');

    await expect(WebviewScreen.webviewContainer).toBeDisplayed();

    const hasWebview = await WebviewScreen.hasWebviewContext();
    expect(hasWebview).toBe(false);
  });
});
