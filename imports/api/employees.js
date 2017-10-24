import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

import {Images} from './images.js';

class EmployeesCollection extends Mongo.Collection{
    remove(selector, callback) {
        let imageID = this.find(selector).fetch()[0].imageID
        if(imageID){Images.remove(imageID)}
        return super.remove(selector, callback);
    }
}
export const Employees = new EmployeesCollection('employees');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('employees', function employeesPublication() {
        return Employees.find();
    });
}

Meteor.methods({
    'employees.insert'(employeeObj){
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
    
        Employees.insert(employeeObj);
    },
    'employees.update'(employeeID, employeeObj){
        Employees.update(
            employeeID,
            {$set: employeeObj}
        )
    },
    'employees.remove'(employeeID){
        Employees.remove(employeeID)
    },
});