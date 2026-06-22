require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const path = require("path");
const allureReporter = require("@wdio/allure-reporter").default;

exports.config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  specs: [path.join(__dirname, "../test/specs/android/*.js")],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Google Pixel 6",
      "appium:platformVersion": "12.0",
      "appium:automationName": "UIAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP,
      "appium:autoGrantPermissions": true,
      "bstack:options": {
        projectName: "Appium Demo App",
        buildName: `Android Build ${new Date().toISOString().slice(0, 10)}`,
        sessionName: "Android Tests",
        debug: true,
        networkLogs: true,
        deviceLogs: true,
        idleTimeout: 60,
      },
    },
  ],

  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ["browserstack"],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries },
  ) {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment(
        `Failure: ${test.title}`,
        Buffer.from(screenshot, "base64"),
        "image/png",
      );
    }
  },

  onComplete: function () {
    const allure = require("allure-commandline");
    const generation = allure([
      "generate",
      "allure-results",
      "--clean",
      "-o",
      "allure-report",
    ]);
    return new Promise((resolve) => generation.on("exit", resolve));
  },
};
