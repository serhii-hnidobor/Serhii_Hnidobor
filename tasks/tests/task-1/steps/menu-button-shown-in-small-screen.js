// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('we open {string} site', (url) => url);

When('we set any screen width < 1127px', ()=> undefined);

Then('menu button is appear', () => undefined);
