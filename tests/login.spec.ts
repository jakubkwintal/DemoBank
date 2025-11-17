import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });
  test(
    'successful login with correct credentials',
    { tag: ['@login', '@smoke'] },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);

      // Assert
      const desktopPage = new DesktopPage(page);
      await expect(desktopPage.userName).toHaveText(expectedUserName);
    }
  );

  test('unsuccessful login with too short username', { tag: '@login' }, async ({
    page,
  }) => {
    // Arrange

    const incorrectUserId = 'tester';
    const expectedMessage = `identyfikator ma min. 8 znaków`;

    // Act
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedMessage);
  });

  test('unsuccessful login with too short password', { tag: '@login' }, async ({
    page,
  }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = '1234';
    const expectedMessage = `hasło ma min. 8 znaków`;

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedMessage);
  });
});
