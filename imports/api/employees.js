import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Employees = new Mongo.Collection('employees');

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
            {_id: employeeID},
            {$set: employeeObj}
        )
    },
    'employees.remove'(employeeID){
        Employees.remove(employeeID)
    },
});