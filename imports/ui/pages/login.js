import { Template } from 'meteor/templating';

import './login.html';

Template.login.onRendered(function(){
    $('form').validate({
        rules: {
            email: {
              required: true,
              email: true
            },
            password: 'required',
          },
          messages: {
            email: {
                required: "Please specify your email address",
                email: "Your email address must be in the format of name@domain.com"
            },
            password: "Please specify your password",
        }
    })
});
