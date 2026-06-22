const CatalogScreen = require('../../screenObjects/android/Catalog.screen');
const ProductDetailScreen = require('../../screenObjects/android/ProductDetail.screen');
const CartScreen = require('../../screenObjects/android/Cart.screen');

describe('Cart', () => {
  it('should add an item to the cart and remove it', async () => {
    // Add first item to cart
    await CatalogScreen.firstStoreItem.click();
    await ProductDetailScreen.addToCartBtn.click();

    // Verify cart badge shows 1
    await expect(CatalogScreen.cartBadge).toBeDisplayed();

    // Navigate to cart
    await CatalogScreen.cartBadge.click();
    await expect(CartScreen.cartScreen).toBeDisplayed();

    // Remove the item
    await CartScreen.removeItemBtn.click();

    // Verify cart is empty
    await expect(CartScreen.noItemsText).toBeDisplayed();
    await expect(CartScreen.goShoppingBtn).toBeDisplayed();
  });
});
