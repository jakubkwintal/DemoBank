import { Page } from '@playwright/test';

export class SideMenuComponent {
  paymentModule: any;

  constructor(private page: Page) {
    this.paymentModule = this.page.getByRole('link', { name: 'płatności' });
  }
}
