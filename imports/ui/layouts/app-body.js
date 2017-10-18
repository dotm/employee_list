import { Template } from 'meteor/templating';

import './app-body.html';

Template.App_body.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});