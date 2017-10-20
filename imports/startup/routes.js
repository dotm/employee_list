import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../ui/layouts/app-body.js";
import "../ui/pages/blank.js";
import "../ui/pages/register.js";
import "../ui/pages/login.js";
import "../ui/pages/list.js";
import "../ui/pages/add.js";

FlowRouter.route('/', {
    action() {
        FlowRouter.go('Login');
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
        BlazeLayout.render('register');
    },
});

FlowRouter.route('/login', {
    name: 'Login',
    action() {
        BlazeLayout.render('login');
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