class LeftSideMenuScreen {
  get expandMenuButton() {
    return $("~open menu");
  }

  get loginMenuOption() {
    return $('//*[@text="Log In"]');
  }

  get logoutMenuOption() {
    return $("//*[@text='Log Out']");
  }

  get logOutButtonConfirmationMessage() {
    return $('//*[@text="LOG OUT"]');
  }

  get webviewMenuOption() {
    return $('//*[@text="Webview"]');
  }

  get aboutMenuOption() {
    return $('//*[@text="About"]');
  }

  get geoLocationMenuOption() {
    return $('//*[@text="Geo Location"]');
  }

  get drawingMenuOption() {
    return $('//*[@text="Drawing"]');
  }

  get logoutSuccessMessage() {
    return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]');
  }

  async navigateToWebview() {
    await this.expandMenuButton.click();
    await this.webviewMenuOption.click();
  }

  async navigateToAbout() {
    await this.expandMenuButton.click();
    await this.aboutMenuOption.click();
  }

  async navigateToGeoLocation() {
    await this.expandMenuButton.click();
    await this.geoLocationMenuOption.click();
  }

  async navigateToDrawing() {
    await this.expandMenuButton.click();
    await this.drawingMenuOption.click();
  }

  async logout() {
    await this.expandMenuButton.click();
    await this.logoutMenuOption.click();
    await this.logOutButtonConfirmationMessage.click();
  }
}

module.exports = new LeftSideMenuScreen();
