import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../ui/layouts/app-body.js";
import "../ui/pages/blank.js";
import "../ui/pages/register.js";
import "../ui/pages/login.js";
import "../ui/pages/list.js";
import "../ui/pages/add.js";
import "../ui/pages/404.js";

FlowRouter.route('/', {
    action() {
        // if logged in
        if(Meteor.userId()){
            FlowRouter.go('App.home');
        }else{
            FlowRouter.go('Login');
        }
    },
});

FlowRouter.route('/home', {
    name: 'App.home',
    action() {
        // if logged in
        if(Meteor.userId()){
            BlazeLayout.render('App_body', { main: 'blank' });
        }else{
            FlowRouter.go('Login');
        }
    },
});

FlowRouter.route('/register', {
    name: 'Register',
    action() {
        // if logged in
        if(Meteor.userId()){
            FlowRouter.go('App.home');
        }else{
            BlazeLayout.render('register');
        }
    },
});

FlowRouter.route('/login', {
    name: 'Login',
    action() {
        // if logged in
        if(Meteor.userId()){
            FlowRouter.go('App.home');
        }else{
            BlazeLayout.render('login');
        }
    },
});

FlowRouter.route('/add', {
    name: 'Add',
    action() {
        // if logged in
        if(Meteor.userId()){
            BlazeLayout.render('App_body', { main: 'add' });
        }else{
            FlowRouter.go('Login');
        }
    },
});

FlowRouter.route('/list', {
    name: 'List',
    action() {
        // if logged in
        if(Meteor.userId()){
            BlazeLayout.render('App_body', { main: 'list' });
        }else{
            FlowRouter.go('Login');
        }
    },
});

// Handle 404
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('404');
    },    
};