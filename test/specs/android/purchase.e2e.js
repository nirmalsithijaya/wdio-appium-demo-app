const CatalogScreen = require("../../screenObjects/android/Catalog.screen");
const ProductDetailScreen = require("../../screenObjects/android/ProductDetail.screen");
const CartScreen = require("../../screenObjects/android/Cart.screen");
const CheckoutScreen = require("../../screenObjects/android/Checkout.screen");
const LoginScreen = require("../../screenObjects/android/Login.screen");
const LeftSideMenuScreen = require("../../screenObjects/android/LeftSideMenu.screen");
const users = require("../../testData/users.data");
const checkoutData = require("../../testData/checkout.data");

describe("Purchase Item", () => {
  before(async () => {
    await LeftSideMenuScreen.expandMenuButton.click();
    await LeftSideMenuScreen.loginMenuOption.click();
    await LoginScreen.login(users.validUser.username, users.validUser.password);
    await expect(CatalogScreen.productsHeader).toHaveText("Products");
  });

  it("should purchase the first product successfully", async () => {
    // Navigate to product detail
    await CatalogScreen.firstStoreItem.click();
    await ProductDetailScreen.addToCartBtn.click();

    // Go to cart
    await CatalogScreen.cartBadge.click();
    await expect(CartScreen.cartScreen).toBeDisplayed();
    await CartScreen.proceedToCheckoutBtn.click();

    // Fill address
    const { fullName, addressLine1, city, state, zipCode, country } = checkoutData.address;
    await CheckoutScreen.fillAddress(fullName, addressLine1, city, state, zipCode, country);

    // Fill payment
    const { cardHolderName, cardNumber, expiryDate, securityCode } = checkoutData.payment;
    await CheckoutScreen.fillPayment(cardHolderName, cardNumber, expiryDate, securityCode);

    // Place order
    await CheckoutScreen.placeOrderBtn.click();

    // Verify confirmation
    await expect(CheckoutScreen.confirmationHeader).toBeDisplayed();
  });

  after(async () => {
    await LeftSideMenuScreen.logout();
  });
});
