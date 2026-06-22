class AboutScreen {
  get aboutScreen() {
    return $('~about screen');
  }

  get headerTitle() {
    return $('android=new UiSelector().text("About")');
  }

  get versionText() {
    return $('android=new UiSelector().text("V.1.3.0-build 244 by ")');
  }

  get sauceLabsLink() {
    return $('android=new UiSelector().text("Go to the Sauce Labs website.")');
  }
}

module.exports = new AboutScreen();
