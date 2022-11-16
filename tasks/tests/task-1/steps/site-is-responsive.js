// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('we are at {string} site', (url) => url);

When('we change width to 250px', ()=> undefined);

Then('the site still looks good and can be used', () => undefined);
