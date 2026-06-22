# My Demo App — Manual Test Cases

App Version: V.1.3.0-build 244  
Platform: Android  

---

## TC-001: Login — Valid Credentials

**Screen:** Login  
**Priority:** High

**Steps:**
1. Open side menu → tap Log In
2. Enter username: `bob@example.com`
3. Enter password: `10203040`
4. Tap Login button

**Expected:** Navigates to Products screen. "Products" header is displayed.

---

## TC-002: Login — Invalid Credentials

**Screen:** Login  
**Priority:** High

**Steps:**
1. Open side menu → tap Log In
2. Enter username: `wronguser@test.com`
3. Enter password: `wrongpass`
4. Tap Login button

**Expected:** Error message displayed — "Provided credentials do not match any user in this service."

---

## TC-003: Login — Empty Username

**Screen:** Login  
**Priority:** Medium

**Steps:**
1. Open side menu → tap Log In
2. Leave username field empty
3. Enter any password
4. Tap Login button

**Expected:** Validation error shown for the username field. Login does not proceed.

---

## TC-004: Login — Empty Password

**Screen:** Login  
**Priority:** Medium

**Steps:**
1. Open side menu → tap Log In
2. Enter a valid username
3. Leave password field empty
4. Tap Login button

**Expected:** Validation error shown for the password field. Login does not proceed.

---

## TC-005: Login — Both Fields Empty

**Screen:** Login  
**Priority:** Medium

**Steps:**
1. Open side menu → tap Log In
2. Leave both fields empty
3. Tap Login button

**Expected:** Validation errors shown on both fields. Login does not proceed.

---

## TC-006: Login — Locked Out User

**Screen:** Login  
**Priority:** High

**Steps:**
1. Open side menu → tap Log In
2. Tap `alice@example.com (locked out)` autofill
3. Tap Login button

**Expected:** Error message indicating the account is locked out.

---

## TC-007: Login — Autofill Credentials

**Screen:** Login  
**Priority:** Low

**Steps:**
1. Open side menu → tap Log In
2. Tap `bob@example.com` autofill link below the form

**Expected:** Username and password fields are auto-populated with the valid credentials.

---

## TC-008: Logout

**Screen:** Any (while logged in)  
**Priority:** High

**Steps:**
1. Log in with valid credentials
2. Open side menu → tap Log Out
3. Tap LOG OUT in the confirmation dialog

**Expected:** User is logged out. Success message — "You are successfully logged out."

---

## TC-009: Logout — Cancel

**Screen:** Any (while logged in)  
**Priority:** Low

**Steps:**
1. Log in with valid credentials
2. Open side menu → tap Log Out
3. Tap Cancel in the confirmation dialog

**Expected:** Dialog closes. User remains logged in.

---

## TC-010: Catalog — Products Display

**Screen:** Catalog  
**Priority:** High

**Steps:**
1. Launch app / navigate to Catalog

**Expected:**
- "Products" header is shown
- Products displayed in a 2-column grid
- Each product shows: image, name, price, star rating
- Products: Sauce Labs Backpack ($29.99), Bike Light ($9.99), Bolt T-Shirt ($15.99), Fleece Jacket ($49.99), and more visible on scroll

---

## TC-011: Catalog — Sort by Name Ascending

**Screen:** Catalog  
**Priority:** Medium

**Steps:**
1. Tap the sort icon (top-right header)
2. Select "Name - Ascending"

**Expected:** Products are reordered alphabetically A→Z.

---

## TC-012: Catalog — Sort by Name Descending

**Screen:** Catalog  
**Priority:** Medium

**Steps:**
1. Tap the sort icon
2. Select "Name - Descending"

**Expected:** Products are reordered alphabetically Z→A.

---

## TC-013: Catalog — Sort by Price Ascending

**Screen:** Catalog  
**Priority:** Medium

**Steps:**
1. Tap the sort icon
2. Select "Price - Ascending"

**Expected:** Products are ordered from lowest to highest price. First product should be the cheapest.

---

## TC-014: Catalog — Sort by Price Descending

**Screen:** Catalog  
**Priority:** Medium

**Steps:**
1. Tap the sort icon
2. Select "Price - Descending"

**Expected:** Products are ordered from highest to lowest price. First product should be the most expensive.

---

## TC-015: Product Detail — View Product

**Screen:** Product Detail  
**Priority:** High

**Steps:**
1. From Catalog, tap any product

**Expected:**
- Product image displayed
- Product name and price shown
- Star rating displayed
- Color selection options shown (black, blue, gray, red circles)
- Quantity counter defaulted to 1 with minus (−) and plus (+) buttons
- "Add To Cart" button visible
- "Product Highlights" section with description

---

## TC-016: Product Detail — Select Colour

**Screen:** Product Detail  
**Priority:** Medium

**Steps:**
1. Open any product detail
2. Tap a colour circle (e.g. blue)

**Expected:** Selected colour circle is highlighted/active.

---

## TC-017: Product Detail — Increment Quantity

**Screen:** Product Detail  
**Priority:** Medium

**Steps:**
1. Open any product detail
2. Tap the (+) button multiple times

**Expected:** Quantity counter increases by 1 each tap.

---

## TC-018: Product Detail — Decrement Quantity

**Screen:** Product Detail  
**Priority:** Medium

**Steps:**
1. Open any product detail
2. Tap (+) to set quantity to 3
3. Tap (−) button

**Expected:** Quantity decreases to 2.

---

## TC-019: Product Detail — Decrement Below 1

**Screen:** Product Detail  
**Priority:** Edge Case

**Steps:**
1. Open any product detail (quantity shows 1)
2. Tap the (−) button

**Expected:** Quantity does not go below 1. Button may be disabled or quantity stays at 1.

---

## TC-020: Product Detail — Add to Cart

**Screen:** Product Detail  
**Priority:** High

**Steps:**
1. Open any product detail
2. Tap "Add To Cart"

**Expected:** Cart badge appears in header with count "1". Product is added to cart.

---

## TC-021: Product Detail — Add Multiple Quantities to Cart

**Screen:** Product Detail  
**Priority:** Medium

**Steps:**
1. Open any product detail
2. Tap (+) to set quantity to 3
3. Tap "Add To Cart"

**Expected:** Cart badge shows "3".

---

## TC-022: Cart — View Cart

**Screen:** Cart  
**Priority:** High

**Steps:**
1. Add a product to cart
2. Tap cart badge icon

**Expected:**
- "My Cart" header shown
- Product row visible with name, price, colour, quantity
- Total price displayed
- "Proceed To Checkout" button visible

---

## TC-023: Cart — Remove Item

**Screen:** Cart  
**Priority:** High

**Steps:**
1. Add a product to cart
2. Open cart
3. Tap "Remove Item" on the product row

**Expected:** Product is removed from the cart. Cart is empty or badge disappears.

---

## TC-024: Cart — Proceed to Checkout Without Login

**Screen:** Cart  
**Priority:** High

**Steps:**
1. Add a product to cart (without logging in)
2. Open cart
3. Tap "Proceed To Checkout"

**Expected:** Redirected to Login screen before checkout can proceed.

---

## TC-025: Checkout — Address — All Required Fields Valid

**Screen:** Checkout Address  
**Priority:** High

**Steps:**
1. Log in and add a product to cart
2. Proceed to Checkout
3. Fill in: Full Name, Address Line 1, City, Zip Code, Country
4. Tap "To Payment"

**Expected:** Navigates to the Payment screen.

---

## TC-026: Checkout — Address — Missing Required Field

**Screen:** Checkout Address  
**Priority:** High

**Steps:**
1. Proceed to Checkout (logged in, item in cart)
2. Leave "Full Name" empty, fill all other fields
3. Tap "To Payment"

**Expected:** Validation error on the Full Name field. Navigation blocked.

---

## TC-027: Checkout — Address — Optional Field (Address Line 2)

**Screen:** Checkout Address  
**Priority:** Low

**Steps:**
1. Proceed to Checkout
2. Fill all required fields, leave "Address Line 2" empty
3. Tap "To Payment"

**Expected:** Proceeds to Payment screen without error.

---

## TC-028: Checkout — Payment — All Fields Valid

**Screen:** Checkout Payment  
**Priority:** High

**Steps:**
1. Complete address step
2. Fill Cardholder Name, Card Number `4111111111111111`, Expiry `03/30`, CVV `123`
3. Tap "Review Order"

**Expected:** Navigates to Review Order screen.

---

## TC-029: Checkout — Payment — Missing Card Number

**Screen:** Checkout Payment  
**Priority:** High

**Steps:**
1. Complete address step
2. Fill all payment fields except Card Number
3. Tap "Review Order"

**Expected:** Validation error on Card Number field. Navigation blocked.

---

## TC-030: Checkout — Payment — Billing Address Same as Shipping

**Screen:** Checkout Payment  
**Priority:** Medium

**Steps:**
1. Complete address step
2. Check "My billing address is the same as my shipping address" checkbox
3. Fill card details and tap "Review Order"

**Expected:** Billing address section hides/is not required. Proceeds to Review Order.

---

## TC-031: Checkout — Review Order

**Screen:** Review Order  
**Priority:** High

**Steps:**
1. Complete address and payment steps
2. View the Review Order screen

**Expected:**
- Order summary shows product(s) with name, colour, quantity, price
- Delivery address displayed
- Payment info displayed
- "Place Order" button visible

---

## TC-032: Checkout — Place Order

**Screen:** Review Order  
**Priority:** High

**Steps:**
1. Complete the full checkout flow
2. Tap "Place Order"

**Expected:** Navigates to Checkout Complete screen. Shows "Checkout Complete" and "Thank you for your order" message.

---

## TC-033: Checkout Complete — Continue Shopping

**Screen:** Checkout Complete  
**Priority:** Medium

**Steps:**
1. Complete a purchase
2. Tap "Continue Shopping"

**Expected:** Navigates back to the Catalog/Products screen.

---

## TC-034: Webview — Valid HTTPS URL

**Screen:** Webview  
**Priority:** Medium

**Steps:**
1. Open menu → Webview
2. Enter a valid HTTPS URL (e.g. `https://www.saucelabs.com`)
3. Tap "Go To Site"

**Expected:** Webview loads and displays the website content.

---

## TC-035: Webview — HTTP URL (Not HTTPS)

**Screen:** Webview  
**Priority:** Edge Case

**Steps:**
1. Open menu → Webview
2. Enter `http://www.example.com`
3. Tap "Go To Site"

**Expected:** Error or warning shown — screen hints "Enter an HTTPS url." HTTP is not accepted.

---

## TC-036: Webview — Empty URL

**Screen:** Webview  
**Priority:** Edge Case

**Steps:**
1. Open menu → Webview
2. Leave URL field empty
3. Tap "Go To Site"

**Expected:** Validation error or nothing loads. App does not crash.

---

## TC-037: Webview — Invalid URL Format

**Screen:** Webview  
**Priority:** Edge Case

**Steps:**
1. Open menu → Webview
2. Enter `not-a-url`
3. Tap "Go To Site"

**Expected:** Error message shown. App does not crash.

---

## TC-038: QR Code Scanner — Camera Permission Granted

**Screen:** QR Code Scanner  
**Priority:** Medium

**Steps:**
1. Open menu → QR Code Scanner
2. Grant camera permission when prompted

**Expected:** Camera view opens, ready to scan a QR code.

---

## TC-039: QR Code Scanner — Camera Permission Denied

**Screen:** QR Code Scanner  
**Priority:** Medium

**Steps:**
1. Open menu → QR Code Scanner
2. Tap "Don't allow" on the camera permission dialog

**Expected:** Screen shows "Camera not authorized" message.

---

## TC-040: QR Code Scanner — Scan URL QR Code

**Screen:** QR Code Scanner  
**Priority:** Medium

**Pre-condition:** Camera permission granted  
**Steps:**
1. Open QR Code Scanner
2. Point camera at a QR code containing a URL

**Expected:** Scanned URL is opened in the device's default browser.

---

## TC-041: Geo Location — Permission Granted

**Screen:** Geo Location  
**Priority:** Medium

**Steps:**
1. Open menu → Geo Location
2. Grant location permission (Precise / While using the app)
3. Tap "Start Observing"

**Expected:** Latitude and Longitude values update from 0 to actual coordinates.

---

## TC-042: Geo Location — Permission Denied

**Screen:** Geo Location  
**Priority:** Medium

**Steps:**
1. Open menu → Geo Location
2. Tap "Don't allow" on the permission dialog

**Expected:** Latitude and Longitude remain 0. Start Observing may not function.

---

## TC-043: Geo Location — Stop Observing

**Screen:** Geo Location  
**Priority:** Medium

**Steps:**
1. Grant location permission and tap "Start Observing"
2. Wait for coordinates to update
3. Tap "Stop Observing"

**Expected:** Location updates stop. Coordinates remain at last known values.

---

## TC-044: Drawing — Draw on Canvas

**Screen:** Drawing  
**Priority:** Medium

**Steps:**
1. Open menu → Drawing
2. Use finger to draw on the canvas area

**Expected:** Drawing/stroke appears on canvas.

---

## TC-045: Drawing — Clear Canvas

**Screen:** Drawing  
**Priority:** Medium

**Steps:**
1. Open menu → Drawing
2. Draw something on the canvas
3. Tap "Clear"

**Expected:** Canvas is cleared and returns to the blank (watermark-only) state.

---

## TC-046: Drawing — Save Canvas

**Screen:** Drawing  
**Priority:** Medium

**Steps:**
1. Open menu → Drawing
2. Draw something on the canvas
3. Tap "Save"

**Expected:** Drawing is saved (to device gallery or app storage). Success confirmation shown.

---

## TC-047: About — Screen Content

**Screen:** About  
**Priority:** Low

**Steps:**
1. Open menu → About

**Expected:**
- App logo displayed
- Version "V.1.3.0-build 244" shown
- Sauce Labs logo visible
- "Go to the Sauce Labs website." link is tappable

---

## TC-048: FingerPrint — Biometric Not Supported

**Screen:** FingerPrint  
**Priority:** Medium

**Steps:**
1. Open menu → FingerPrint (on a device/emulator without biometrics enrolled)

**Expected:** Alert dialog shown: "Biometrics is or not supported or not enabled on your device. Please check your device or your settings." Dismisses on OK.

---

## TC-049: FingerPrint — Enable Toggle (Supported Device)

**Screen:** FingerPrint  
**Priority:** Medium

**Pre-condition:** Device has biometrics enrolled  
**Steps:**
1. Open menu → FingerPrint
2. Toggle "Allow login with FingerPrint" ON

**Expected:** Toggle switches ON. Biometric authentication becomes available for login.

---

## TC-050: API Calls — EU-DC Tab

**Screen:** API Calls  
**Priority:** Low

**Steps:**
1. Open menu → Api Calls
2. Tap "EU-DC" tab

**Expected:** Device list loads showing devices available via EU data centre.

---

## TC-051: API Calls — US-DC Tab

**Screen:** API Calls  
**Priority:** Low

**Steps:**
1. Open menu → Api Calls
2. Tap "US-DC" tab

**Expected:** Device list loads showing devices available via US data centre.

---

## TC-052: API Calls — 401 Tab

**Screen:** API Calls  
**Priority:** Low

**Steps:**
1. Open menu → Api Calls
2. Tap "401" tab

**Expected:** Screen displays a 401 Unauthorized error response or message.

---

## TC-053: API Calls — 404 Tab

**Screen:** API Calls  
**Priority:** Low

**Steps:**
1. Open menu → Api Calls
2. Tap "404" tab

**Expected:** Screen displays a 404 Not Found error response or message.

---

## TC-054: Sauce Bot Video — Play

**Screen:** Sauce Bot Video  
**Priority:** Low

**Steps:**
1. Open menu → Sauce Bot Video
2. Tap the Play/Stop button (currently showing Stop icon = video auto-plays)

**Expected:** Video "SauceBot - The Beginning" plays in the player.

---

## TC-055: Sauce Bot Video — Stop

**Screen:** Sauce Bot Video  
**Priority:** Low

**Steps:**
1. Open menu → Sauce Bot Video (video plays automatically)
2. Tap the Stop button

**Expected:** Video stops playing.

---

## TC-056: Sauce Bot Video — Rewind

**Screen:** Sauce Bot Video  
**Priority:** Low

**Steps:**
1. Open Sauce Bot Video
2. Let video play for a few seconds
3. Tap the Rewind button

**Expected:** Video playback position jumps backwards.

---

## TC-057: Sauce Bot Video — Fast Forward

**Screen:** Sauce Bot Video  
**Priority:** Low

**Steps:**
1. Open Sauce Bot Video
2. Tap the Fast Forward button

**Expected:** Video playback position jumps forward.

---

## TC-058: Sauce Bot Video — Volume Toggle

**Screen:** Sauce Bot Video  
**Priority:** Low

**Steps:**
1. Open Sauce Bot Video
2. Tap the Volume button

**Expected:** Audio is muted/unmuted. Button icon reflects the current state.

---

## TC-059: Navigation — Side Menu Opens and Closes

**Screen:** Any  
**Priority:** Medium

**Steps:**
1. Tap the hamburger menu (≡) icon
2. Verify menu appears
3. Tap outside the menu or press back

**Expected:** Menu slides open with all options. Closes when dismissed.

---

## TC-060: Navigation — Cart Badge Count

**Screen:** Any  
**Priority:** Medium

**Steps:**
1. Add 1 item to cart → observe badge
2. Add another item → observe badge
3. Remove all items → observe badge

**Expected:** Badge shows correct count after each action. Badge disappears when cart is empty.

---

## TC-061: Reset App State

**Screen:** Any  
**Priority:** Medium

**Steps:**
1. Add items to cart and log in
2. Open menu → Reset App State

**Expected:** App state is reset — cart is cleared, user is logged out, app returns to default state.

---

## TC-062: Edge Case — Add Same Product Multiple Times

**Screen:** Product Detail / Cart  
**Priority:** Edge Case

**Steps:**
1. Log in
2. Open a product, tap "Add To Cart"
3. Navigate back, open same product, tap "Add To Cart" again

**Expected:** Cart contains 2 units of the same product OR the item quantity is incremented. Cart badge count updates correctly.

---

## TC-063: Edge Case — Checkout with Empty Cart

**Screen:** Cart  
**Priority:** Edge Case

**Steps:**
1. Log in
2. Navigate directly to cart (no items added)

**Expected:** Empty cart state shown. "Proceed To Checkout" is either disabled or absent.

---

## TC-064: Edge Case — Very Long Input in Address Fields

**Screen:** Checkout Address  
**Priority:** Edge Case

**Steps:**
1. Proceed to Checkout
2. Enter 200+ characters in the Full Name field
3. Tap "To Payment"

**Expected:** App either truncates input, shows a max-length error, or accepts the value without crashing.

---

## TC-065: Edge Case — Special Characters in Address

**Screen:** Checkout Address  
**Priority:** Edge Case

**Steps:**
1. Proceed to Checkout
2. Enter `<script>alert(1)</script>` in the Full Name field
3. Complete checkout

**Expected:** Input is treated as plain text. No script execution. No crash.

---

## TC-066: Edge Case — Invalid Card Number Format

**Screen:** Checkout Payment  
**Priority:** Edge Case

**Steps:**
1. Complete address step
2. Enter `1234` (short card number) in Card Number field
3. Tap "Review Order"

**Expected:** Validation error shown for card number. Navigation blocked.

---

## TC-067: Edge Case — Expired Card Date

**Screen:** Checkout Payment  
**Priority:** Edge Case

**Steps:**
1. Complete address step
2. Enter expiry date in the past (e.g. `01/20`)
3. Tap "Review Order"

**Expected:** Validation error shown for expiry date. Navigation blocked.

---

## TC-068: Edge Case — Back Navigation Preserves Cart

**Screen:** Cart / Catalog  
**Priority:** Edge Case

**Steps:**
1. Add items to cart
2. Navigate to Catalog
3. Navigate back to Cart

**Expected:** Cart contents are preserved. Items remain in cart.

---

## TC-069: Edge Case — Session Persistence After App Backgrounding

**Screen:** Any  
**Priority:** Edge Case

**Steps:**
1. Log in and add items to cart
2. Press home button to background the app
3. Re-open the app

**Expected:** Login session and cart contents are preserved.

---

## TC-070: Edge Case — Landscape Orientation

**Screen:** Any  
**Priority:** Edge Case

**Steps:**
1. Rotate device to landscape
2. Navigate through key screens (Catalog, Product Detail, Cart, Checkout)

**Expected:** UI adapts correctly to landscape orientation. No elements are cut off or overlapping.

---

*Total: 70 test cases covering Login, Catalog, Product Detail, Cart, Checkout, Webview, QR Code Scanner, Geo Location, Drawing, About, FingerPrint, API Calls, Sauce Bot Video, Navigation, and Edge Cases.*
