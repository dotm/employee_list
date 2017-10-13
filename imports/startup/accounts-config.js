import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
 passwordSignupFields: 'USERNAME_ONLY',
});

// Disable sign up
Accounts.config({
    forbidClientAccountCreation : true
  });