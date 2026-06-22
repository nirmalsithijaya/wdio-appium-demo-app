class DrawingScreen {
  get drawingScreen() {
    return $('~drawing screen');
  }

  get headerTitle() {
    return $('android=new UiSelector().text("Drawing")');
  }

  get canvas() {
    return $('//android.webkit.WebView');
  }

  get clearButton() {
    return $('~Clear button');
  }

  get saveButton() {
    return $('~Save button');
  }

  get saveDialogTitle() {
    return $('id=android:id/alertTitle');
  }

  get saveDialogMessage() {
    return $('id=android:id/message');
  }

  get saveDialogOkButton() {
    return $('id=android:id/button1');
  }

  // Draw a straight stroke using the Appium dragGesture mobile command.
  // Coordinates are absolute screen pixels. The canvas occupies
  // roughly x:53–1032, y:467–2105 on a Pixel 6 (1080×2400).
  async drawStroke(startX = 250, startY = 700, endX = 700, endY = 1100, speed = 500) {
    await driver.execute('mobile: dragGesture', {
      startX,
      startY,
      endX,
      endY,
      speed,
    });
  }

  async clearCanvas() {
    await this.clearButton.click();
  }

  async saveDrawing() {
    await this.saveButton.click();
  }

  async dismissSaveDialog() {
    await this.saveDialogOkButton.waitForDisplayed({ timeout: 5000 });
    await this.saveDialogOkButton.click();
  }

  async isSaveDialogDisplayed() {
    return this.saveDialogTitle.isDisplayed();
  }

  async waitForScreen() {
    await this.drawingScreen.waitForDisplayed({ timeout: 5000 });
    await driver.pause(500);
  }
}

module.exports = new DrawingScreen();
