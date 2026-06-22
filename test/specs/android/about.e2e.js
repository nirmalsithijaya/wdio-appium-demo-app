const LeftSideMenuScreen = require('../../screenObjects/android/LeftSideMenu.screen');
const AboutScreen = require('../../screenObjects/android/About.screen');

describe('About', () => {
  beforeEach(async () => {
    await LeftSideMenuScreen.navigateToAbout();
  });

  afterEach(async () => {
    await driver.back();
  });

  // TC-038: navigating to the About screen via the side menu
  it('should navigate to the About screen from the side menu', async () => {
    await expect(AboutScreen.aboutScreen).toBeDisplayed();
  });

  // TC-039: About screen displays the page heading
  it('should display the About page title', async () => {
    await expect(AboutScreen.headerTitle).toBeDisplayed();
    await expect(AboutScreen.headerTitle).toHaveText('About');
  });

  // TC-040: About screen displays the app version
  it('should display the app version', async () => {
    await expect(AboutScreen.versionText).toBeDisplayed();
    await expect(AboutScreen.versionText).toHaveTextContaining('V.1.3.0');
  });

  // TC-041: About screen displays the Sauce Labs website link
  it('should display the Sauce Labs website link', async () => {
    await expect(AboutScreen.sauceLabsLink).toBeDisplayed();
    await expect(AboutScreen.sauceLabsLink).toHaveText('Go to the Sauce Labs website.');
  });

  // TC-042: back button returns to the Catalog screen
  it('should navigate back to the Catalog screen', async () => {
    await driver.back();
    await expect($('~open menu')).toBeDisplayed();
  });
});
