import { PageDriverController } from '../../page-driver-constroller/page-driver-controller';

const deleteSalaryInfo = async (driverController: PageDriverController): Promise<void> => {
  await driverController.waitCssElement('.oxd-table-card .oxd-table-cell-actions');

  await driverController.waitCssElement('.oxd-table-card .oxd-table-cell-actions .bi-trash');

  await driverController.elementAction({
    cssSelector: '.oxd-table-card .oxd-table-cell-actions button',
    type: 'click',
  });

  await driverController.waitCssElement('.orangehrm-modal-footer');
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-modal-footer button:last-child',
  });
  await driverController.waitCssElement('.orangehrm-bottom-container');

  await driverController.waitCssElement('.oxd-form-actions > button:not([type="submit"])');

  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-form-actions > button:not([type="submit"])',
  });
};

export { deleteSalaryInfo };
