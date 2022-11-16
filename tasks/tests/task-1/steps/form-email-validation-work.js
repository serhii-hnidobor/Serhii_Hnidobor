// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('go to {string} page', (string) => string);

When('we enter invalid email such us 679h32eyh or email with cyrillic symbol such us кирилиця@gmail.com', () => undefined);

Then('there is email validation error appear', () => undefined);

