import { Template } from 'meteor/templating';

import './register.html';

Template.register.onRendered(function(){
    $('form').validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
              required: true,
              email: true
            },
            password: 'required',
            password_confirmation: {
                equalTo: "#password"
            }
          },
          messages: {
            first_name: "Please specify your name",
            last_name: "Please specify your name",
            email: {
                required: "You need email address to login",
                email: "Your email address must be in the format of name@domain.com"
            },
            password: "You need password to login",
            password_confirmation: "The password you just entered does not match this"
        }
    })
});

Template.register.events({
    'submit form' (event){
        event.preventDefault();
        let firstName = event.target.first_name.value;
        let lastName = event.target.last_name.value;
        let name = firstName + " " + lastName;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let passwordConfirmation = event.target.password_confirmation.value;

        console.log([name, email, password]);
    },
});
