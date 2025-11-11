import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../test-data/desktop.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expected = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    const desktopPage = new DesktopPage(page);
    await desktopPage.receiverId.selectOption(receiverId);
    await desktopPage.transferAmount.fill(transferAmount);
    await desktopPage.transferTitle.fill(transferTitle);

    await desktopPage.confirmPaymentButton.click();
    await desktopPage.closeButton.click();

    // Assert
    await expect(desktopPage.confirmationMessage).toHaveText(expected);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const phoneNumber = '500 xxx xxx';
    const amount = '50';
    const expected = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumber}`;

    // Act
    const desktopPage = new DesktopPage(page);

    await desktopPage.phoneNumber.selectOption(phoneNumber);
    await desktopPage.topUpAmount.fill(amount);
    await desktopPage.topUpAgreement.click();
    await desktopPage.confirmTopUpButton.click();
    await desktopPage.closeButton.click();

    // Assert
    await expect(desktopPage.confirmationMessage).toHaveText(expected);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const phoneNumber = '500 xxx xxx';
    const amount = '75';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(amount);

    // Act
    const desktopPage = new DesktopPage(page);
    await desktopPage.phoneNumber.selectOption(phoneNumber);
    await desktopPage.topUpAmount.fill(amount);
    await desktopPage.topUpAgreement.click();
    await desktopPage.confirmTopUpButton.click();
    await desktopPage.closeButton.click();

    // Assert
    await expect(desktopPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
