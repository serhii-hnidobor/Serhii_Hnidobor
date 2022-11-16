// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { Given, When, Then } = require('@cucumber/cucumber');

Given('we go to {string}', (url) => url);

When('we send the form and left on of the \\(first name,last name, email, location, how you heart about us) field empty', ()=> undefined);

Then('we get validation error and from dont send', () => undefined);
