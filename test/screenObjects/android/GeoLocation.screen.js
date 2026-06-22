class GeoLocationScreen {
  get geoLocationScreen() {
    return $('~geo location screen');
  }

  get headerTitle() {
    return $('android=new UiSelector().text("Geo Location")');
  }

  get latitudeValue() {
    return $('~latitude data');
  }

  get longitudeValue() {
    return $('~longitude data');
  }

  get startObservingBtn() {
    return $('~Start Observing button');
  }

  get stopObservingBtn() {
    return $('~Stop Observing button');
  }

  // Android system permission dialog buttons (resource IDs confirmed on Android 14)
  get allowWhileUsingBtn() {
    return $('id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');
  }

  get dontAllowBtn() {
    return $('id=com.android.permissioncontroller:id/permission_deny_button');
  }

  async grantLocationPermission() {
    try {
      await this.allowWhileUsingBtn.waitForDisplayed({ timeout: 4000 });
      await this.allowWhileUsingBtn.click();
    } catch (_) {
      // permission already granted or dialog not shown
    }
  }

  async denyLocationPermission() {
    try {
      await this.dontAllowBtn.waitForDisplayed({ timeout: 4000 });
      await this.dontAllowBtn.click();
    } catch (_) {
      // no dialog shown
    }
  }

  async waitForCoordinatesToUpdate(timeout = 10000) {
    await driver.waitUntil(
      async () => {
        const lat = await this.latitudeValue.getText();
        return lat !== '0' && lat !== '0.0';
      },
      { timeout, timeoutMsg: `Coordinates did not update within ${timeout}ms` }
    );
  }
}

module.exports = new GeoLocationScreen();
