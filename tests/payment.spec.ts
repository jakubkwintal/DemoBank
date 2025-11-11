import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../test-data/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    const paymentPage = new PaymentPage(page);
    await paymentPage.sideMenuComponent.paymentModule.click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Emilia Zawadzak';
    const toAccount = '00 1122 3344 5566 7788 9911';
    const street = 'Peryferyjna';
    const postalCodeAndCity = '26-610 Radom';
    const paymentAmount = '222';
    const paymentTitle = 'Zwrot';
    const confirmationMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);

    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.toAccount.fill(toAccount);
    await paymentPage.adressFields.first().click();
    await paymentPage.streetAndNumber.fill(street);
    await paymentPage.postalCodeAndCity.fill(postalCodeAndCity);
    await paymentPage.paymentAmount.fill(paymentAmount);
    await paymentPage.paymentTitle.fill(paymentTitle);
    await paymentPage.confirmPaymentButton.click();
    await paymentPage.closeButton.click();

    // Assert
    await expect(paymentPage.confirmationMessage).toHaveText(
      confirmationMessage
    );
  });
});
