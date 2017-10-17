import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../ui/layouts/app-body.js";
import "../ui/pages/blank.js";
import "../ui/pages/register.js";
import "../ui/pages/login.js";
import "../ui/pages/list.js";
import "../ui/pages/add.js";

FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'blank' });
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
        BlazeLayout.render('App_body', { main: 'add' });
    },
});

FlowRouter.route('/list', {
    name: 'List',
    action() {
        BlazeLayout.render('App_body', { main: 'list' });
    },
});