import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

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

Template.login.events({
    'submit form' (event){
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function(err){
            if(err){
                alert(err.reason)
            }else{
                FlowRouter.go('List');
            }
        });
    },
});