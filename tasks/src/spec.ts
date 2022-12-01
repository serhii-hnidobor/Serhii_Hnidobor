import 'jasmine';
import { Browser, Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { faker } from '@faker-js/faker';
import { PageDriverController } from './page-driver-constroller/page-driver-controller';
import { auth, addSlaryInfo, deleteSalaryInfo, deleteUserInfoRecord } from './testing-script/testing-script';
import { PAGE_URL } from './constants/constants';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
let driverController: PageDriverController;
let randName: string;
beforeAll(async () => {
  const option = new Options().addArguments('--start-maximized');
  const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(option).build();
  randName = faker.name.firstName();
  driverController = new PageDriverController(driver);
  await driverController.loadPage(PAGE_URL, until.elementLocated(By.css('.oxd-input')));
});

afterAll(async () => {
  await driverController.closeBrowser();
});

afterEach(async () => {
  await driverController.waitCssElement('body');
});

describe('something', () => {
  it('authorization should work', async () => {
    await auth(driverController);

    await driverController.wait(until.elementLocated(By.css('.oxd-sidepanel-body')));

    expect(!!(await driverController.getElementByCss('.oxd-sidepanel-body'))).toEqual(true);
  });

  it('add job pay grades record must work normal ', async () => {
    const [minSalary, maxSalary] = await addSlaryInfo(driverController, randName);

    const isMinSalaryDisplayCorrect = await driverController.isElementContainThisText({
      text: `${String(minSalary)}.00`,
      targetElementCssSelector: '.oxd-table-card > .oxd-table-row:last-child > div:nth-child(3)',
    });

    const isMaxSalaryDisplayCorrect = await driverController.isElementContainThisText({
      text: `${String(maxSalary)}.00`,
      targetElementCssSelector: '.oxd-table-card > .oxd-table-row:last-child > div:nth-child(4)',
    });

    expect(isMaxSalaryDisplayCorrect).toBe(true);
    expect(isMinSalaryDisplayCorrect).toBe(true);
  });

  it('remove job pay grades record must work normal ', async () => {
    await deleteSalaryInfo(driverController);

    const allFieldAfterDelete = driverController.getAllElementByCss('.orangehrm-bottom-container > div');

    if (Array.isArray(allFieldAfterDelete)) {
      expect(allFieldAfterDelete.length).toEqual(0);
    } else if (!allFieldAfterDelete) {
      expect(allFieldAfterDelete).toEqual(null);
    }
  });

  it('added job pay grades display in admin panel', async () => {
    const [isCurrencyDeleted, isUserInfoRecordDeleted] = await deleteUserInfoRecord(driverController, randName);

    expect(isCurrencyDeleted).toBe(true);
    expect(isUserInfoRecordDeleted).toBe(true);
  });
});
