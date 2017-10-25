import { Template } from 'meteor/templating';

import './display.html';
import {Employees} from '../../api/employees.js';

Template.display.onCreated(function(){
    Meteor.subscribe('employees')
    Meteor.subscribe('images')
});
  
Template.display.helpers({
    employees(){
      return Employees.find({});
    },
})

Template.employeeDiv.helpers({
    formatDate(date){
        return date.toLocaleDateString('en',{
            day:'numeric',
            month:'short',
            year:'numeric'
        });
    },
})