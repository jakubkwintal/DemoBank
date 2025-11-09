import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test.only('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange

    const incorrectUserId = 'tester';
    const expected = `identyfikator ma min. 8 znaków`;

    // Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expected);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = '1234';
    const expected = `hasło ma min. 8 znaków`;

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expected);
  });
});
