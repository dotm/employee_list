import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import './app-body.html';

Template.App_body.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('login');
        // FlowRouter bug: doesn't render login (so we render explicitly below)
        BlazeLayout.render('login');
    },
});