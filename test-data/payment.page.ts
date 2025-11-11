import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PaymentPage {
  transferReceiver: Locator;
  toAccount: Locator;
  adressFields: Locator;
  streetAndNumber: Locator;
  postalCodeAndCity: Locator;
  paymentAmount: Locator;
  paymentTitle: Locator;
  confirmPaymentButton: Locator;
  closeButton: Locator;
  confirmationMessage: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);

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
