class WebviewScreen {
  get urlInputField() {
    return $('~URL input field');
  }

  get goToSiteBtn() {
    return $('~Go To Site button');
  }

  // Always-visible hint below the input field; asserted in TC-035 / TC-037
  get httpsHintText() {
    return $('~URL-error-message');
  }

  // Root container for the URL-entry view (native side of the hybrid screen)
  get webviewContainer() {
    return $('~webview selection screen');
  }

  // Dialog shown when the webview fails to load a URL (e.g. network error in emulator)
  get loadErrorOkBtn() {
    return $('//*[@text="OK"]');
  }

  async navigateToUrl(url) {
    await this.urlInputField.setValue(url);
    await driver.hideKeyboard();
    await this.goToSiteBtn.click();
  }

  async waitForWebviewContext(timeout = 10000) {
    await driver.waitUntil(
      async () => {
        const contexts = await driver.getContexts();
        return contexts.some((ctx) => ctx.includes('WEBVIEW'));
      },
      { timeout, timeoutMsg: `WEBVIEW context did not appear within ${timeout}ms` }
    );
  }

  async switchToWebContext() {
    await this.waitForWebviewContext();
    const contexts = await driver.getContexts();
    const webContext = contexts.find((ctx) => ctx.includes('WEBVIEW'));
    await driver.switchContext(webContext);
  }

  async switchToNativeContext() {
    await driver.switchContext('NATIVE_APP');
  }

  async hasWebviewContext() {
    const contexts = await driver.getContexts();
    return contexts.some((ctx) => ctx.includes('WEBVIEW'));
  }

  async dismissLoadErrorIfPresent() {
    try {
      const okBtn = await this.loadErrorOkBtn;
      if (await okBtn.isDisplayed()) {
        await okBtn.click();
      }
    } catch (_) {
      // no dialog present
    }
  }
}

module.exports = new WebviewScreen();
