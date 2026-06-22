const CatalogScreen = require("../../screenObjects/android/Catalog.screen");
const LoginScreen = require("../../screenObjects/android/Login.screen");
const LeftSideMenuScreen = require("../../screenObjects/android/LeftSideMenu.screen")

describe("My Login Demo POM", () => {
  beforeEach(async () => {
    await LeftSideMenuScreen.expandMenuButton.waitForDisplayed({ timeout: 60000 });
    await LeftSideMenuScreen.expandMenuButton.click();
    await LeftSideMenuScreen.loginMenuOption.waitForDisplayed({ timeout: 15000 });
    await LeftSideMenuScreen.loginMenuOption.click();
  });

  it("should not login with invalid credentials", async () => {
    LoginScreen.login("wrongUser", "wrongPassword");
    await expect(LoginScreen.errorMessageText).toHaveText(
      "Provided credentials do not match any user in this service."
    );
  });

  it("should login with valid credentials and logout", async () => {
    LoginScreen.login("bob@example.com", "10203040");
    await expect(CatalogScreen.productsHeader).toHaveText("Items");
    await LeftSideMenuScreen.logout();
    await expect(LeftSideMenuScreen.logoutSuccessMessage).toHaveText("You are successfully logged out.");
  });
});


