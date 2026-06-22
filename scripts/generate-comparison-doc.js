const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  Header, Footer, PageNumber, NumberFormat, convertInchesToTwip,
} = require('docx');
const fs = require('fs');
const path = require('path');

// ─── Colour palette ───────────────────────────────────────────────────────────
const COLOR = {
  PRIMARY:    '1F4E79',   // dark blue  – headings
  SECONDARY:  '2E75B6',   // mid blue   – sub-headings
  ACCENT:     'C00000',   // red        – fail / human-raw issues
  GREEN:      '375623',   // dark green – pass / AI strengths
  ORANGE:     'BF8F00',   // amber      – partial / human-POM
  CODEBG:     'F2F2F2',   // light grey – code blocks
  HEADERBG:   '1F4E79',   // table header background
  ROWODD:     'DEEAF1',   // alternating row colour
  WHITE:      'FFFFFF',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const bold   = (t, color = '000000', size = 22) =>
  new TextRun({ text: t, bold: true, color, size });

const normal = (t, color = '000000', size = 22) =>
  new TextRun({ text: t, color, size });

const code = (t) =>
  new TextRun({ text: t, font: 'Courier New', size: 18, color: '1F4E79' });

function heading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    run: { color: COLOR.PRIMARY, bold: true, size: 32 },
  });
}

function heading2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    run: { color: COLOR.SECONDARY, bold: true, size: 26 },
  });
}

function heading3(text) {
  return new Paragraph({
    children: [bold(text, COLOR.SECONDARY, 24)],
    spacing: { before: 240, after: 120 },
  });
}

function para(runs, spacing = { before: 100, after: 100 }) {
  const children = Array.isArray(runs) ? runs : [normal(runs)];
  return new Paragraph({ children, spacing });
}

function bullet(runs, level = 0) {
  const children = Array.isArray(runs) ? runs : [normal(runs)];
  return new Paragraph({
    children,
    bullet: { level },
    spacing: { before: 60, after: 60 },
  });
}

function codeBlock(lines) {
  return lines.map((line) =>
    new Paragraph({
      children: [code(line)],
      shading: { type: ShadingType.CLEAR, fill: COLOR.CODEBG },
      spacing: { before: 0, after: 0 },
      indent: { left: convertInchesToTwip(0.3) },
    })
  );
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.SECONDARY } },
    spacing: { before: 200, after: 200 },
  });
}

// ─── Table builder ────────────────────────────────────────────────────────────
function makeTable(headers, rows) {
  const colCount = headers.length;
  const pct = Math.floor(100 / colCount);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h) =>
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: COLOR.HEADERBG },
        width: { size: pct, type: WidthType.PERCENTAGE },
        children: [new Paragraph({
          children: [bold(h, COLOR.WHITE, 20)],
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 80 },
        })],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell) => {
        const { text, color, bold: isBold, center, bg } = typeof cell === 'string'
          ? { text: cell, color: '000000', bold: false, center: false, bg: ri % 2 === 0 ? COLOR.WHITE : COLOR.ROWODD }
          : { bg: ri % 2 === 0 ? COLOR.WHITE : COLOR.ROWODD, ...cell };

        return new TableCell({
          shading: { type: ShadingType.CLEAR, fill: bg || (ri % 2 === 0 ? COLOR.WHITE : COLOR.ROWODD) },
          width: { size: pct, type: WidthType.PERCENTAGE },
          children: [new Paragraph({
            children: [new TextRun({ text, bold: isBold, color: color || '000000', size: 20 })],
            alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
            spacing: { before: 80, after: 80 },
          })],
        });
      }),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ─── Document sections ────────────────────────────────────────────────────────
const titlePage = [
  new Paragraph({ spacing: { before: 1200 } }),
  new Paragraph({
    children: [bold('Human-Written vs AI-Generated', COLOR.PRIMARY, 52)],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
  }),
  new Paragraph({
    children: [bold('Appium Test Scripts', COLOR.SECONDARY, 44)],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
  }),
  new Paragraph({
    children: [normal('Accuracy · Maintainability · Readability', '444444', 28)],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 600 },
  }),
  new Paragraph({
    children: [normal('Project: appium-demo-app  |  Framework: WebdriverIO v8 + Appium v3', '666666', 22)],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 100 },
  }),
  new Paragraph({
    children: [normal('Platform: Android 14 (Pixel 6 Emulator)', '666666', 22)],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 100 },
  }),
  new Paragraph({
    children: [normal('Date: June 2026', '666666', 22)],
    alignment: AlignmentType.CENTER,
  }),
];

const introduction = [
  heading1('1. Introduction'),
  para('This document compares test scripts written by a human developer against scripts generated by AI (Claude) with MCP-based live app inspection. The comparison covers three dimensions: Accuracy, Maintainability, and Readability.'),
  para('Scripts analysed from this project:'),
  bullet([bold('Human (raw): ', COLOR.ACCENT), normal('login.e2e.js — inline selectors, no Page Object Model')]),
  bullet([bold('Human (POM): ', COLOR.ORANGE), normal('somLogin.e2e.js — Page Object Model, cleaner structure')]),
  bullet([bold('AI (MCP-verified): ', COLOR.GREEN), normal('geoLocation.e2e.js, about.e2e.js — locators confirmed via live app inspection')]),
  divider(),
];

const accuracySection = [
  heading1('2. Accuracy'),
  para('Accuracy covers correctness of async handling, reliability of waits, and completeness of edge case coverage.'),

  heading2('2.1 Human — login.e2e.js (Issues Found)'),
  heading3('Hardcoded Waits'),
  para('The human script uses fixed pauses instead of dynamic waits, causing flakiness on slow devices:'),
  ...codeBlock([
    '// ❌ Hardcoded wait — unreliable, fails on slow devices',
    'await driver.pause(3000);',
    '',
    '// ✅ AI approach — waits only as long as needed',
    'await GeoLocationScreen.geoLocationScreen.waitForDisplayed({ timeout: 5000 });',
  ]),

  heading3('Missing await Keyword'),
  para('In somLogin.e2e.js, LoginScreen.login() is called without await — a silent bug that can cause unpredictable test results:'),
  ...codeBlock([
    '// ❌ Missing await — async call not properly handled',
    'LoginScreen.login("wrongUser", "wrongPassword");',
    '',
    '// ✅ AI approach — all async calls properly awaited',
    'await GeoLocationScreen.waitForCoordinatesToUpdate();',
  ]),

  heading3('Fragile XPath Selectors'),
  para('The human script uses deep XPath nesting tied to layout structure:'),
  ...codeBlock([
    '// ❌ Breaks if layout nesting changes',
    'await $(\'//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView\').click();',
    '',
    '// ✅ AI approach — accessibility ID confirmed via live app inspection',
    'await GeoLocationScreen.stopObservingBtn.click();  // ~Stop Observing button',
  ]),

  heading2('2.2 AI — geoLocation.e2e.js (Strengths)'),
  heading3('Android 14 Permission Restart Handled'),
  para('The AI script handles a non-obvious Android 14 behaviour where revoking permissions force-restarts the app activity:'),
  ...codeBlock([
    '// ✅ Edge case: Android 14 restarts app on permission revoke',
    'await driver.activateApp(APP_PACKAGE);',
    'await $(\'~open menu\').waitForDisplayed({ timeout: 8000 });',
  ]),

  heading3('Conditional Button State Handling'),
  para('The AI script checks the button state before interacting, handling both active and inactive states:'),
  ...codeBlock([
    '// ✅ Handles both enabled/disabled button states',
    'const startBtn = GeoLocationScreen.startObservingBtn;',
    'if (await startBtn.isEnabled()) {',
    '  await startBtn.click();',
    '}',
  ]),

  new Paragraph({ spacing: { before: 200 } }),
  makeTable(
    ['Criterion', 'Human (Raw)', 'Human (POM)', 'AI (MCP-verified)'],
    [
      ['Hardcoded waits',       { text: '❌ driver.pause(3000)', color: COLOR.ACCENT },   { text: '⚠️ Some pauses', color: COLOR.ORANGE },  { text: '✅ waitForDisplayed', color: COLOR.GREEN }],
      ['Async correctness',     { text: '❌ Missing await found', color: COLOR.ACCENT },  { text: '⚠️ Missing await', color: COLOR.ORANGE }, { text: '✅ All awaited', color: COLOR.GREEN }],
      ['Locator reliability',   { text: '❌ Deep XPath nesting', color: COLOR.ACCENT },   { text: '✅ Accessibility IDs', color: COLOR.GREEN }, { text: '✅ MCP-confirmed IDs', color: COLOR.GREEN }],
      ['Edge case handling',    { text: '❌ None', color: COLOR.ACCENT },                 { text: '❌ None', color: COLOR.ACCENT },            { text: '✅ Permission restart handled', color: COLOR.GREEN }],
      ['Permission management', { text: '❌ Not tested', color: COLOR.ACCENT },           { text: '❌ Not tested', color: COLOR.ACCENT },     { text: '✅ Grant/revoke tested', color: COLOR.GREEN }],
    ]
  ),
  divider(),
];

const maintainabilitySection = [
  heading1('3. Maintainability'),
  para('Maintainability measures how easily scripts can be updated when the app changes. The key factor is whether selectors and navigation logic are centralised in Page Objects or scattered inline.'),

  heading2('3.1 Human — login.e2e.js (No POM)'),
  para('All selectors are inline. If one changes, every test file using it must be updated manually:'),
  ...codeBlock([
    '// ❌ Selector repeated inline — must update everywhere it appears',
    'await $(\'//*[@content-desc="Username input field"]\').setValue("wrongUser");',
    'await $(\'//android.widget.EditText[@content-desc="Password input field"]\').setValue("wrongPassword");',
    'await $(\'//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView\').click();',
  ]),

  heading2('3.2 AI — about.e2e.js + About.screen.js (Full POM)'),
  para('Selectors live in one screen object. All tests reference the screen object method:'),
  ...codeBlock([
    '// ✅ About.screen.js — single source of truth',
    'get versionText() {',
    '  return $(\'android=new UiSelector().text("V.1.3.0-build 244 by ")\');',
    '}',
    '',
    '// ✅ about.e2e.js — clean test, no raw selectors',
    'await expect(AboutScreen.versionText).toHaveTextContaining(\'V.1.3.0\');',
  ]),
  para([bold('Result: ', COLOR.GREEN), normal('If the version text changes, update About.screen.js once — all tests fixed automatically.')]),

  heading2('3.3 TC ID Traceability'),
  para('AI-generated scripts include test case IDs linking specs to test management systems. Human scripts have no such traceability:'),
  ...codeBlock([
    '// ✅ AI — TC ID links test to test management system',
    '// TC-043: Stop Observing — coordinates freeze at last known values',
    'it(\'should stop updating coordinates when Stop Observing is tapped\', async () => {',
    '',
    '// ❌ Human — no traceability',
    'it("should login with valid credentials and logout", async () => {',
  ]),

  new Paragraph({ spacing: { before: 200 } }),
  makeTable(
    ['Criterion', 'Human (Raw)', 'Human (POM)', 'AI (MCP-verified)'],
    [
      ['Page Object Model',      { text: '❌ No POM', color: COLOR.ACCENT },           { text: '✅ POM used', color: COLOR.GREEN },        { text: '✅ Full POM', color: COLOR.GREEN }],
      ['Single selector source', { text: '❌ Scattered inline', color: COLOR.ACCENT }, { text: '✅ Screen objects', color: COLOR.GREEN },   { text: '✅ Screen objects', color: COLOR.GREEN }],
      ['Navigation methods',     { text: '❌ Inline steps', color: COLOR.ACCENT },     { text: '✅ Encapsulated', color: COLOR.GREEN },    { text: '✅ Encapsulated', color: COLOR.GREEN }],
      ['TC ID traceability',     { text: '❌ None', color: COLOR.ACCENT },             { text: '❌ None', color: COLOR.ACCENT },           { text: '✅ TC-038 to TC-043', color: COLOR.GREEN }],
      ['Impact of app change',   { text: '❌ Update all files', color: COLOR.ACCENT }, { text: '✅ Update screen object', color: COLOR.GREEN }, { text: '✅ Update screen object', color: COLOR.GREEN }],
    ]
  ),
  divider(),
];

const readabilitySection = [
  heading1('4. Readability'),
  para('Readability measures how quickly a new team member can understand the intent and behaviour of a test.'),

  heading2('4.1 Human — login.e2e.js (Noisy Comments)'),
  para('Comments explain WHAT the code does — already obvious from the code itself. Long XPath strings break reading flow:'),
  ...codeBlock([
    '// ❌ Comment states the obvious — adds noise, not value',
    '//Access the hamburguer/toggle button by its accessibility id',
    'await $("~open menu").click();',
    '',
    '// ❌ Long XPath breaks reading flow',
    'await expect(',
    '  $(\'//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView\'),',
    ').toHaveText("Provided credentials do not match any user in this service.");',
  ]),

  heading2('4.2 Human — somLogin.e2e.js (Best Readability)'),
  para('The POM version is the most readable script in the project — short, clear, and intent-driven:'),
  ...codeBlock([
    '// ✅ No comments needed — method names explain the intent',
    'LoginScreen.login("wrongUser", "wrongPassword");',
    'await expect(LoginScreen.errorMessageText).toHaveText("Provided credentials...");',
    'await LeftSideMenuScreen.logout();',
    'await expect(LeftSideMenuScreen.logoutSuccessMessage).toHaveText("You are successfully logged out.");',
  ]),

  heading2('4.3 AI — geoLocation.e2e.js (Explains WHY)'),
  para('AI comments explain non-obvious behaviour (the WHY), not what the code does (the WHAT):'),
  ...codeBlock([
    '// ✅ Explains WHY — non-obvious Android 14 behaviour documented',
    '// Revoking permissions force-restarts the app activity on Android 14 —',
    '// re-activate and wait for the Catalog screen before navigating',
    'await driver.activateApp(APP_PACKAGE);',
    '',
    '// ✅ TC ID for test management traceability',
    '// TC-042: Permission Denied — latitude and longitude remain 0',
    'it(\'should not update coordinates when location permission is denied\', async () => {',
  ]),

  new Paragraph({ spacing: { before: 200 } }),
  makeTable(
    ['Criterion', 'Human (Raw)', 'Human (POM)', 'AI (MCP-verified)'],
    [
      ['Test intent clarity',    { text: '❌ Buried in XPaths', color: COLOR.ACCENT },    { text: '✅ Very clear', color: COLOR.GREEN },    { text: '✅ Clear', color: COLOR.GREEN }],
      ['Comment quality',        { text: '❌ States the obvious', color: COLOR.ACCENT }, { text: '✅ None needed', color: COLOR.GREEN },   { text: '✅ Explains WHY', color: COLOR.GREEN }],
      ['Line length',            { text: '❌ Very long selectors', color: COLOR.ACCENT }, { text: '✅ Short & clean', color: COLOR.GREEN }, { text: '✅ Short & clean', color: COLOR.GREEN }],
      ['New joiner onboarding',  { text: '❌ Hard to follow', color: COLOR.ACCENT },     { text: '✅ Easy', color: COLOR.GREEN },          { text: '✅ Easy + TC IDs help', color: COLOR.GREEN }],
    ]
  ),
  divider(),
];

const summarySection = [
  heading1('5. Overall Summary'),
  para('The table below scores each script across all three dimensions.'),
  new Paragraph({ spacing: { before: 200 } }),
  makeTable(
    ['Dimension', 'Human (Raw)', 'Human (POM)', 'AI (MCP-verified)'],
    [
      [
        { text: 'Accuracy', bold: true },
        { text: '⚠️ Flaky waits, missing await', color: COLOR.ACCENT },
        { text: '⚠️ Better but missing await', color: COLOR.ORANGE },
        { text: '✅ Best — verified locators + edge cases', color: COLOR.GREEN },
      ],
      [
        { text: 'Maintainability', bold: true },
        { text: '❌ No POM, selectors scattered', color: COLOR.ACCENT },
        { text: '✅ POM used', color: COLOR.GREEN },
        { text: '✅ Best — POM + TC traceability', color: COLOR.GREEN },
      ],
      [
        { text: 'Readability', bold: true },
        { text: '❌ Noisy comments, long XPaths', color: COLOR.ACCENT },
        { text: '✅ Best — clean, short', color: COLOR.GREEN },
        { text: '✅ Good — explains non-obvious WHY', color: COLOR.GREEN },
      ],
    ]
  ),
  new Paragraph({ spacing: { before: 300 } }),

  heading2('5.1 Key Takeaways'),
  bullet([bold('Human raw scripts ', COLOR.ACCENT), normal('are a starting point but carry hidden bugs (missing await, hardcoded pauses) and become hard to maintain at scale.')]),
  bullet([bold('Human POM scripts ', COLOR.ORANGE), normal('show the best readability — short, intent-driven test steps when written well.')]),
  bullet([bold('AI-generated scripts ', COLOR.GREEN), normal('excel at accuracy (MCP-verified locators, edge case handling) and maintainability (TC traceability, consistent POM structure).')]),
  bullet([bold('Ideal workflow: ', COLOR.PRIMARY), normal('Human judgment for test design + AI for implementation + MCP for live locator verification.')]),

  new Paragraph({ spacing: { before: 300 } }),
  heading2('5.2 Recommendation'),
  para('Adopt a hybrid approach:'),
  bullet([bold('1. Human writes the test strategy ', '000000'), normal('— what to test and why.')]),
  bullet([bold('2. AI generates the initial script ', '000000'), normal('— using MCP to verify locators against the live app.')]),
  bullet([bold('3. Human reviews ', '000000'), normal('— checks business logic correctness and adds domain context.')]),
  bullet([bold('4. AI refactors ', '000000'), normal('— applies POM, adds TC IDs, ensures async correctness.')]),
];

// ─── Build document ───────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [{
      reference: 'bullet-list',
      levels: [{ level: 0, format: NumberFormat.BULLET, text: '•', alignment: AlignmentType.LEFT }],
    }],
  },
  styles: {
    paragraphStyles: [
      {
        id: 'Normal',
        name: 'Normal',
        run: { font: 'Calibri', size: 22, color: '000000' },
        paragraph: { spacing: { line: 276 } },
      },
    ],
  },
  sections: [
    // Title page
    {
      children: [
        ...titlePage,
        new Paragraph({ pageBreakBefore: true }),
      ],
    },
    // Main content
    {
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [
              bold('Human-Written vs AI-Generated Appium Scripts', COLOR.PRIMARY, 18),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.SECONDARY } },
            spacing: { after: 100 },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              normal('appium-demo-app  |  WDIO v8 + Appium v3  |  Page ', '666666', 18),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '666666' }),
            ],
            alignment: AlignmentType.RIGHT,
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.SECONDARY } },
          })],
        }),
      },
      children: [
        ...introduction,
        ...accuracySection,
        ...maintainabilitySection,
        ...readabilitySection,
        ...summarySection,
      ],
    },
  ],
});

// ─── Write file ───────────────────────────────────────────────────────────────
const outDir  = path.join(__dirname, '..', 'docs');
const outFile = path.join(outDir, 'human-vs-ai-scripts-comparison.docx');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outFile, buffer);
  console.log(`✅ Document created: ${outFile}`);
});
