import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    paymentPage = new PaymentPage(page);
    await paymentPage.sideMenuComponent.paymentModule.click();
  });

  test(
    'simple payment',
    {
      tag: ['@payment', '@integration'],
      annotation: {
        type: 'Documentation',
        description:
          'More to find at: https://jaktestowac.pl/lesson/pw1s04l04/',
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Emilia Zawadzak';
      const toAccount = '00 1122 3344 5566 7788 9911';
      const street = 'Peryferyjna';
      const postalCodeAndCity = '26-610 Radom';
      const paymentAmount = '222';
      const paymentTitle = 'Zwrot';
      const confirmationMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${transferReceiver}`;

      // Act
      await paymentPage.makeTransfer(
        transferReceiver,
        toAccount,
        street,
        postalCodeAndCity,
        paymentAmount,
        paymentTitle
      );

      // Assert
      await expect(paymentPage.confirmationMessage).toHaveText(
        confirmationMessage
      );
    }
  );
});
