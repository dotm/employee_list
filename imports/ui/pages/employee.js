import { Template } from 'meteor/templating';

import './employee-form.js';
import './employee.html'
import {Employees} from '../../api/employees.js';
import {Images} from '../../api/images.js';

Template.employee.helpers({
  image(){
    return Images.find(this.imageID)
  },
  formatDate(date){
    return date.toLocaleDateString('en',{
      day:'numeric',
      month:'short',
      year:'numeric'
    });
  },
});

Template.employee.events({
  // UPDATE: Edit employee data
  'submit .edit-employee'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    let name = event.target.name.value;
    let nik = event.target.nik.value;
    let dept = event.target.dept.value;
    let pos = event.target.pos.value;
    let date = new Date(event.target.date.value);
    let employeeObj = {name, nik, dept, pos, date}
    
    Meteor.call('employees.update', this._id, employeeObj)

    $('.modal').modal('hide')
    $('.modal-backdrop').remove()
  },
  // DELETE: Delete an employee entry
  'click .delete'(){
    Meteor.call('employees.remove', this._id)

    $('.modal').modal('hide')
    $('.modal-backdrop').remove()
  },
});