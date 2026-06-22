class CheckoutScreen {
  // Address screen
  get fullNameField() {
    return $('~Full Name* input field');
  }

  get addressField() {
    return $('~Address Line 1* input field');
  }

  get cityField() {
    return $('~City* input field');
  }

  get stateField() {
    return $('~State/Region input field');
  }

  get zipCodeField() {
    return $('~Zip Code* input field');
  }

  get countryField() {
    return $('~Country* input field');
  }

  get toPaymentBtn() {
    return $('~To Payment button');
  }

  // Payment screen
  get cardHolderNameField() {
    return $('~Full Name* input field');
  }

  get cardNumberField() {
    return $('~Card Number* input field');
  }

  get expiryDateField() {
    return $('~Expiration Date* input field');
  }

  get securityCodeField() {
    return $('~Security Code* input field');
  }

  get reviewOrderBtn() {
    return $('~Review Order button');
  }

  // Review screen
  get placeOrderBtn() {
    return $('~Place Order button');
  }

  // Confirmation screen
  get confirmationHeader() {
    return $('~checkout complete screen');
  }

  async fillAddress(name, address, city, state, zip, country) {
    await this.fullNameField.setValue(name);
    await this.addressField.setValue(address);
    await this.cityField.setValue(city);
    await this.stateField.setValue(state);
    await this.zipCodeField.setValue(zip);
    await this.countryField.setValue(country);
    await this.toPaymentBtn.click();
  }

  async fillPayment(cardHolderName, cardNumber, expiryDate, securityCode) {
    await this.cardHolderNameField.setValue(cardHolderName);
    await this.cardNumberField.setValue(cardNumber);
    await this.expiryDateField.setValue(expiryDate);
    await this.securityCodeField.setValue(securityCode);
    await this.reviewOrderBtn.click();
  }
}

module.exports = new CheckoutScreen();
