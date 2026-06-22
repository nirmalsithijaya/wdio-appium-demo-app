// 'use strict';

// require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

// const OpenAI = require('openai');
// const fs = require('fs');
// const path = require('path');

// const CACHE_PATH = path.join(__dirname, 'healed-locators.json');

// let _client;
// function getClient() {
//   if (!process.env.GROQ_API_KEY) {
//     throw new Error(
//       '[AI Healer] GROQ_API_KEY is not set. ' +
//       'Add it to the project .env file or export it in your shell.'
//     );
//   }
//   if (!_client) _client = new OpenAI({
//     apiKey: process.env.GROQ_API_KEY,
//     baseURL: 'https://api.groq.com/openai/v1',
//   });
//   return _client;
// }

// function loadCache() {
//   try {
//     return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
//   } catch {
//     return {};
//   }
// }

// function saveCache(cache) {
//   fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
// }

// function updatePageObjects(brokenSelector, healedSelector) {
//   const screenObjectsDir = path.join(__dirname, '../screenObjects');

//   // If the healed selector contains single quotes, wrap it in double quotes in JS source.
//   // Otherwise keep the surrounding quote style from the original.
//   function reQuote(match, outerQuote) {
//     const needsDoubleOuter = healedSelector.includes("'");
//     const quote = needsDoubleOuter ? '"' : outerQuote;
//     return `$(${quote}${healedSelector}${quote})`;
//   }

//   function walk(dir) {
//     for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
//       const full = path.join(dir, entry.name);
//       if (entry.isDirectory()) {
//         walk(full);
//       } else if (entry.name.endsWith('.js')) {
//         const content = fs.readFileSync(full, 'utf8');
//         if (!content.includes(brokenSelector)) continue;
//         // Match $('...broken...') or $("...broken...") and fix quoting
//         const escaped = brokenSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//         const updated = content.replace(
//           new RegExp(`\\$\\((['"]+)${escaped}\\1\\)`, 'g'),
//           (_, q) => reQuote(_, q),
//         );
//         fs.writeFileSync(full, updated);
//         console.warn(`📝 [AI Healer] Updated ${path.relative(process.cwd(), full)}: "${brokenSelector}" → "${healedSelector}"`);
//       }
//     }
//   }

//   walk(screenObjectsDir);
// }

// async function healLocator(failedSelector, pageSource) {
//   const cache = loadCache();

//   if (cache[failedSelector]) {
//     console.warn(`\n💾 [AI Healer] Cache hit: "${failedSelector}" → "${cache[failedSelector]}"\n`);
//     return cache[failedSelector];
//   }

//   console.warn(`\n🤖 [AI Healer] Broken selector: "${failedSelector}" — consulting Groq...`);

//   const response = await getClient().chat.completions.create({
//     model: 'llama-3.3-70b-versatile',
//     max_tokens: 150,
//     messages: [
//       {
//         role: 'system',
//         content: `You are an Appium Android test automation expert. Return only the selector, nothing else.
// Rules:
// - This app is built with React Native. Elements are ViewGroup, not Button or TextView.
// - Always use //* (wildcard) for XPath, never a specific class like android.widget.Button.
// - In XPath, use single quotes for attribute values: //*[@text='Save'], not double quotes.
// - Never prefix with "xpath=". Just write the raw selector.
// - Never include quotes, backticks, or explanation around the selector.`,
//       },
//       {
//         role: 'user',
//         content: `A locator has broken.

// Failed locator: "${failedSelector}"

// Current Android UI accessibility tree (XML):
// ${pageSource.substring(0, 7000)}

// Scan the XML carefully to find the element the original locator was targeting.
// Return the best alternative Appium selector using one of these formats:

//   ~accessibilityId              e.g. ~open menu
//   //*[@text='Save']             e.g. //*[@text='Log Out']
//   android=new UiSelector()...   e.g. android=new UiSelector().text("Save")
//   id=resourceId                 e.g. id=com.example:id/save_btn

// Respond with ONLY the selector — one line, no explanation.`,
//       },
//     ],
//   });

//   const healed = response.choices[0].message.content.trim().replace(/^["'`]|["'`]$/g, '');
//   cache[failedSelector] = healed;
//   saveCache(cache);
//   updatePageObjects(failedSelector, healed);

//   console.warn(`✅ [AI Healer] "${failedSelector}" → "${healed}"\n`);
//   return healed;
// }

// function isElementNotFoundError(err) {
//   const msg = (err && err.message) || '';
//   return (
//     msg.includes('not found') ||
//     msg.includes('not displayed') ||
//     msg.includes('could not be located') ||
//     msg.includes('NoSuchElement') ||
//     msg.includes('still not exist') ||
//     msg.includes('Malformed type for "elementId"')
//   );
// }

// module.exports = { healLocator, isElementNotFoundError };
