import { element, by, ElementFinder } from 'protractor';

export class ShipmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-shipment div table .btn-danger'));
  title = element.all(by.css('jhi-shipment div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ShipmentUpdatePage {
  pageTitle = element(by.id('jhi-shipment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tackingCodeInput = element(by.id('field_tackingCode'));
  dateInput = element(by.id('field_date'));
  detailsInput = element(by.id('field_details'));

  invoiceSelect = element(by.id('field_invoice'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTackingCodeInput(tackingCode: string): Promise<void> {
    await this.tackingCodeInput.sendKeys(tackingCode);
  }

  async getTackingCodeInput(): Promise<string> {
    return await this.tackingCodeInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async invoiceSelectLastOption(): Promise<void> {
    await this.invoiceSelect.all(by.tagName('option')).last().click();
  }

  async invoiceSelectOption(option: string): Promise<void> {
    await this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect(): ElementFinder {
    return this.invoiceSelect;
  }

  async getInvoiceSelectedOption(): Promise<string> {
    return await this.invoiceSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ShipmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-shipment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-shipment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
