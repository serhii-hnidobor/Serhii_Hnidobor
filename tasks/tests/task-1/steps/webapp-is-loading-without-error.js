// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('modern browser \\(except IE) and stable internet connection', () => undefined);

When('open {string}', (url) => url);

Then('load site open and there is no error', () => null);
