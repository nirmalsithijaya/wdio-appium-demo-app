class CartScreen {
  get cartScreen() {
    return $('~cart screen');
  }

  get proceedToCheckoutBtn() {
    return $('~Proceed To Checkout button');
  }

  get removeItemBtn() {
    return $('~remove item');
  }

  get noItemsText() {
    return $('//*[@text="No Items"]');
  }

  get goShoppingBtn() {
    return $('~Go Shopping button');
  }
}

module.exports = new CartScreen();
