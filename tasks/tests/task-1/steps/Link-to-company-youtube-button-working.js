// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('we are at {string}', (url) => url);

Then('we are redirect to company youtube channel', ()=> undefined);

When('we press Youtube button in footer', () => undefined);
