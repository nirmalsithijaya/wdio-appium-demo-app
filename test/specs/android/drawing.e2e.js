const LeftSideMenuScreen = require('../../screenObjects/android/LeftSideMenu.screen');
const DrawingScreen = require('../../screenObjects/android/Drawing.screen');

describe('Drawing', () => {
  beforeEach(async () => {
    await LeftSideMenuScreen.navigateToDrawing();
    await DrawingScreen.waitForScreen();
    await DrawingScreen.clearCanvas();
  });

  afterEach(async () => {
    // Dismiss any save dialog left open by the test before navigating back.
    if (await DrawingScreen.isSaveDialogDisplayed()) {
      await DrawingScreen.dismissSaveDialog();
    }
    await driver.back();
  });

  // TC-044: Draw on Canvas — finger stroke appears on canvas
  it('should display the drawing screen with canvas and action buttons', async () => {
    await expect(DrawingScreen.headerTitle).toBeDisplayed();
    await expect(DrawingScreen.canvas).toBeDisplayed();
    await expect(DrawingScreen.clearButton).toBeDisplayed();
    await expect(DrawingScreen.saveButton).toBeDisplayed();
  });

  // TC-044 (continued): drawing gesture produces a visible stroke
  it('should render a stroke on the canvas after a draw gesture', async () => {
    await DrawingScreen.drawStroke(250, 700, 700, 1100);

    // A successful draw followed by Save surfaces the confirmation dialog —
    // this proves the canvas registered the gesture.
    await DrawingScreen.saveDrawing();
    await expect(DrawingScreen.saveDialogTitle).toBeDisplayed();
    await expect(DrawingScreen.saveDialogTitle).toHaveText('Save drawing');
    await expect(DrawingScreen.saveDialogMessage).toHaveText('Drawing saved successfully to gallery');
    await DrawingScreen.dismissSaveDialog();
  });

  // TC-045: Clear Canvas — clears drawing and returns to blank state
  it('should clear the canvas when Clear is tapped', async () => {
    // Draw a stroke first so there is something to clear.
    await DrawingScreen.drawStroke(200, 800, 750, 1300);

    await DrawingScreen.clearCanvas();

    // After clearing, the Save button should not trigger the success dialog,
    // confirming the canvas is blank.
    await DrawingScreen.saveDrawing();
    const dialogShown = await DrawingScreen.isSaveDialogDisplayed();
    expect(dialogShown).toBe(false);
  });

  // TC-046: Save Canvas — shows success dialog with correct title and message
  it('should show a success dialog when saving a drawing', async () => {
    await DrawingScreen.drawStroke(300, 600, 800, 1200);

    await DrawingScreen.saveDrawing();

    await expect(DrawingScreen.saveDialogTitle).toBeDisplayed();
    await expect(DrawingScreen.saveDialogTitle).toHaveText('Save drawing');
    await expect(DrawingScreen.saveDialogMessage).toHaveText('Drawing saved successfully to gallery');
    await expect(DrawingScreen.saveDialogOkButton).toBeDisplayed();
  });

  // TC-046 (continued): dismissing the dialog returns to the drawing screen
  it('should dismiss the save dialog and return to the drawing screen after OK', async () => {
    await DrawingScreen.drawStroke(350, 700, 650, 1000);
    await DrawingScreen.saveDrawing();

    await DrawingScreen.dismissSaveDialog();

    await expect(DrawingScreen.drawingScreen).toBeDisplayed();
    await expect(DrawingScreen.clearButton).toBeDisplayed();
    await expect(DrawingScreen.saveButton).toBeDisplayed();
  });

  // Edge case: Save on an empty canvas should not show the success dialog
  it('should not show the save dialog when the canvas is empty', async () => {
    await DrawingScreen.saveDrawing();
    await driver.pause(1000);

    const dialogShown = await DrawingScreen.isSaveDialogDisplayed();
    expect(dialogShown).toBe(false);
  });

  // Edge case: multiple strokes can be drawn before clearing
  it('should support multiple draw strokes before clearing', async () => {
    await DrawingScreen.drawStroke(150, 550, 500, 900);
    await DrawingScreen.drawStroke(500, 900, 850, 600);
    await DrawingScreen.drawStroke(200, 1200, 800, 1200);

    await DrawingScreen.clearCanvas();

    await expect(DrawingScreen.drawingScreen).toBeDisplayed();
    await expect(DrawingScreen.clearButton).toBeDisplayed();
  });
});
