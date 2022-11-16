// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('browser', () => undefined);

When('go to {string} \\(not existed page)', (url)=> url);

Then('we can see 404 error page', () => undefined);
