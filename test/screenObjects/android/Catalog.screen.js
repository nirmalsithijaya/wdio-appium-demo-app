class CatalogScreen {
  get productsHeader() {
    return $(
      'android=new UiSelector().text("Products").className("android.widget.TextView")'
    );
  }

  get firstStoreItem() {
    return $('(//android.view.ViewGroup[@content-desc="store item"])[1]');
  }

  get cartBadge() {
    return $('~cart badge');
  }
}

module.exports = new CatalogScreen();
