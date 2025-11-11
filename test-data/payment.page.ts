import { Page } from '@playwright/test';

export class PaymentPage {
  transferReceiver: any;
  toAccount: any;
  adressFields: any;
  streetAndNumber: any;
  postalCodeAndCity: any;
  paymentAmount: any;
  paymentTitle: any;
  confirmPaymentButton: any;
  closeButton: any;
  confirmationMessage: any;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.toAccount = this.page.getByTestId('form_account_to');
    this.adressFields = this.page.locator('.i-show');
    this.streetAndNumber = this.page.getByRole('textbox', {
      name: 'ulica i numer domu /',
    });
    this.postalCodeAndCity = this.page.getByRole('textbox', {
      name: 'kod pocztowy, miejscowość',
    });
    this.paymentAmount = this.page.getByTestId('form_amount');
    this.paymentTitle = this.page.getByTestId('form_title');
    this.confirmPaymentButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = this.page.getByTestId('close-button');
    this.confirmationMessage = this.page.locator('#show_messages');
  }
}
