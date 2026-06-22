const LeftSideMenuScreen = require('../../screenObjects/android/LeftSideMenu.screen');
const GeoLocationScreen = require('../../screenObjects/android/GeoLocation.screen');

const APP_PACKAGE = 'com.saucelabs.mydemoapp.rn';

describe('Geo Location', () => {
  beforeEach(async () => {
    // Grant permission before each test so every test starts from a known state.
    // TC-042 explicitly revokes it within the test body.
    await driver.execute('mobile: changePermissions', {
      action: 'grant',
      appPackage: APP_PACKAGE,
      permissions: [
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
      ],
    });
  });

  afterEach(async () => {
    await driver.back();
  });

  // TC-041: Permission Granted — latitude and longitude update from 0
  it('should update latitude and longitude when location permission is granted', async () => {
    await driver.setGeoLocation({ latitude: 48.8566, longitude: 2.3522, altitude: 35 });

    await LeftSideMenuScreen.navigateToGeoLocation();
    await GeoLocationScreen.geoLocationScreen.waitForDisplayed({ timeout: 5000 });

    const startBtn = GeoLocationScreen.startObservingBtn;
    if (await startBtn.isEnabled()) {
      await startBtn.click();
    }

    await GeoLocationScreen.waitForCoordinatesToUpdate();

    const lat = await GeoLocationScreen.latitudeValue.getText();
    const lon = await GeoLocationScreen.longitudeValue.getText();

    expect(parseFloat(lat)).not.toBe(0);
    expect(parseFloat(lon)).not.toBe(0);
  });

  // TC-042: Permission Denied — latitude and longitude remain 0
  it('should not update coordinates when location permission is denied', async () => {
    // Revoke permission — Android 14 force-restarts the app activity when this happens
    await driver.execute('mobile: changePermissions', {
      action: 'revoke',
      appPackage: APP_PACKAGE,
      permissions: [
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
      ],
    });

    // Re-activate and wait for Catalog screen to be ready
    await driver.activateApp(APP_PACKAGE);
    await $('~open menu').waitForDisplayed({ timeout: 8000 });

    await LeftSideMenuScreen.navigateToGeoLocation();
    await GeoLocationScreen.denyLocationPermission();

    await GeoLocationScreen.geoLocationScreen.waitForDisplayed({ timeout: 5000 });

    const lat = await GeoLocationScreen.latitudeValue.getText();
    const lon = await GeoLocationScreen.longitudeValue.getText();

    expect(lat).toBe('0');
    expect(lon).toBe('0');
  });

  // TC-043: Stop Observing — coordinates freeze at last known values
  it('should stop updating coordinates when Stop Observing is tapped', async () => {
    await driver.setGeoLocation({ latitude: 37.4219983, longitude: -122.084, altitude: 10 });

    await LeftSideMenuScreen.navigateToGeoLocation();
    await GeoLocationScreen.geoLocationScreen.waitForDisplayed({ timeout: 5000 });

    const startBtn = GeoLocationScreen.startObservingBtn;
    if (await startBtn.isEnabled()) {
      await startBtn.click();
    }

    await GeoLocationScreen.waitForCoordinatesToUpdate();

    const latBefore = await GeoLocationScreen.latitudeValue.getText();
    const lonBefore = await GeoLocationScreen.longitudeValue.getText();

    await GeoLocationScreen.stopObservingBtn.click();
    await driver.pause(2000);

    const latAfter = await GeoLocationScreen.latitudeValue.getText();
    const lonAfter = await GeoLocationScreen.longitudeValue.getText();

    expect(latAfter).toBe(latBefore);
    expect(lonAfter).toBe(lonBefore);
    await expect(GeoLocationScreen.startObservingBtn).toBeEnabled();
  });
});
