import { By } from 'selenium-webdriver';
import { PageDriverController } from '../../page-driver-constroller/page-driver-controller';

const deleteUserInfoRecord = async (driverController: PageDriverController, randName: string): Promise<boolean[]> => {
  await driverController.waitCssElement('.oxd-table .oxd-table-body');
  await driverController.waitCssElement('.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row');

  const allTableRow = await driverController.getAllElementByCss(
    '.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row',
  );

  if (!allTableRow || !allTableRow?.length) {
    throw Error('job not display');
  }

  let targetJobPayGradesRowNum = 1;

  for (const currentRow of allTableRow) {
    const curRowElement = await currentRow.findElement(By.css('.oxd-table-cell:nth-child(2) div'));

    if ((await curRowElement.getText()).trim() === randName.trim()) {
      break;
    }
    targetJobPayGradesRowNum++;
  }

  if (targetJobPayGradesRowNum > allTableRow.length) {
    throw Error('job not display');
  }

  const targetRecordSelector = `.oxd-table .oxd-table-card:nth-child(${targetJobPayGradesRowNum}) .oxd-table-row`;

  const isSalaryInfoDeleted = await driverController.isElementContainThisText({
    targetElementCssSelector: `${targetRecordSelector} div:nth-child(3) div`,
    text: '',
  });

  await driverController.elementAction({
    type: 'click',
    cssSelector: `${targetRecordSelector} .oxd-table-cell-actions button:first-child`,
  });

  await driverController.waitCssElement('.orangehrm-modal-footer');

  await driverController.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-modal-footer button:last-child',
  });

  let isUserRecordDeleted = true;

  const allUserRecord = await driverController.getAllElementByCss(
    '.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row',
  );

  if (!allUserRecord || !allUserRecord.length) {
    return [isSalaryInfoDeleted, true];
  }

  for (const currentRow of allUserRecord) {
    const curRowElement = await currentRow.findElement(By.css('.oxd-table-cell:nth-child(2) div'));
    if ((await curRowElement.getText()).trim() === randName.trim()) {
      isUserRecordDeleted = false;
      break;
    }
  }

  return [isSalaryInfoDeleted, isUserRecordDeleted];
};

export { deleteUserInfoRecord };
