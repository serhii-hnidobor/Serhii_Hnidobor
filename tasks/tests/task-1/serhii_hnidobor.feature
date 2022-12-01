Feature: testing task 1

  Scenario: webapp-is-loading-without-error
    Given modern browser (except IE) and stable internet connection
    When open "https://www.epam.com/"
    Then load site open and there is no error

  Scenario: Link-to-company-youtube-button-working
    Given we are at "https://www.epam.com/"
    When we press Youtube button in footer
    Then we are redirect to company youtube channel

  Scenario: form-require-field-work-as-expect
    Given we go to "https://www.epam.com/about/who-we-are/contact"
    When we send the form and left on of the (first name,last name, email, location, how you heart about us) field empty
    Then we get validation error and from dont send

  Scenario: site-is-responsive
    Given we are at "https://www.epam.com/" site
    When we change width to 250px
    Then the site still looks good and can be used

  Scenario: menu-button-shown-in-small-screen
    Given we open "https://www.epam.com/" site
    When we set any screen width < 1127px
    Then menu button is appear

  Scenario: site-has-404-error-page
    Given browser
    When go to "https://www.epam.com/afsasfassdas" (not existed page)
    Then we can see 404 error page

  Scenario: site-header-have-sticky-position
    Given go to "https://www.epam.com"
    When we scroll page
    Then header always at top of viewport

  Scenario: form-email-validation-work
    Given go to "https://www.epam.com/about/who-we-are/contact" page
    When we enter invalid email such us 679h32eyh or email with cyrillic symbol such us кирилиця@gmail.com
    Then there is email validation error appear
