import { Locator, Page } from '@playwright/test';

export class DesktopPage {
  userName: Locator;
  receiverId: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  confirmPaymentButton: Locator;
  closeButton: Locator;
  confirmationMessage: Locator;

  phoneNumber: Locator;
  topUpAmount: Locator;
  topUpAgreement: Locator;
  confirmTopUpButton: Locator;

  moneyValue: Locator;

  constructor(private page: Page) {
    this.userName = this.page.getByTestId('user-name');
    this.receiverId = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.confirmPaymentButton = this.page.getByRole('button', {
      name: 'wykonaj',
    });
    this.closeButton = this.page.getByTestId('close-button');
    this.confirmationMessage = this.page.locator('#show_messages');

    this.phoneNumber = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreement = this.page.locator(
      '#uniform-widget_1_topup_agreement span'
    );
    this.confirmTopUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyValue = this.page.locator('#money_value');
  }
}
