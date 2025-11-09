import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { assert } from 'console';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Emilia Zawadzak';
    const toAccount = '00 1122 3344 5566 7788 9911';
    const street = 'Peryferyjna';
    const postalCodeAndCity = '26-610 Radom';
    const paymentAmount = '222';
    const paymentTitle = 'Zwrot';
    const finalMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.locator('.grid-6').click();
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(toAccount);
    await page.locator('.i-show').first().click();
    await page
      .getByRole('textbox', { name: 'ulica i numer domu /' })
      .fill(street);
    await page
      .getByRole('textbox', { name: 'kod pocztowy, miejscowość' })
      .fill(postalCodeAndCity);
    await page.getByTestId('form_amount').fill(paymentAmount);
    await page.getByTestId('form_title').fill(paymentTitle);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(finalMessage);
  });
});
