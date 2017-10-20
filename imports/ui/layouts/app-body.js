import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor'

import './app-body.html';

Template.App_body.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('App.home');
    },
    'click a[href=login], a.login': function(event){
        if(Meteor.user()){
            event.preventDefault();
            alert("You are already logged in.")
        }
    },
    'click a[href=register], a.register': function(event){
        if(Meteor.user()){
            event.preventDefault();
            alert("Please log out first.")
        }
    }
});