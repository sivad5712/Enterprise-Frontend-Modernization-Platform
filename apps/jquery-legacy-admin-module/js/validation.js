/**
 * @file validation.js
 * @description Manual jQuery Form Validation for adding a user to the identity store.
 */

export function validateAddUserForm() {
  let isValid = true;
  
  const nameInput = $('#new-name');
  const userInput = $('#new-username');
  const emailInput = $('#new-email');

  // Clear previous validation states
  $('.form-control').removeClass('is-invalid');

  // Name Validation
  if ($.trim(nameInput.val()).length < 3) {
    nameInput.addClass('is-invalid');
    isValid = false;
  }

  // Alphanumeric Username Validation (min 4 chars)
  const usernameVal = $.trim(userInput.val());
  const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
  if (!usernameRegex.test(usernameVal)) {
    userInput.addClass('is-invalid');
    isValid = false;
  }

  // Corporate Email Validation
  const emailVal = $.trim(emailInput.val());
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailVal) || !emailVal.endsWith('.enterprise.com')) {
    emailInput.addClass('is-invalid');
    // Inject custom message for demo value
    emailInput.parent().find('.invalid-feedback').text('Email must be valid & end with corporate @*.enterprise.com domain.');
    emailInput.addClass('is-invalid');
    isValid = false;
  }

  return isValid;
}
