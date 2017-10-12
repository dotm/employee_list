import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './body.html';
import {Employees} from '../api/employees.js';

Template.body.events({
  'submit .new-employee'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Add new employee
    const target = event.target;
    Employees.insert({
      name: target.name.value,
      nik: target.nik.value,
      dept: target.dept.value,
      pos: target.pos.value
    })

    // Clear form
    target.name.value = ''
    target.nik.value = ''
    target.dept.value = ''
    target.pos.value = ''
  },
  'click .edit'(){
    let form = $('.update-employee')
    let data = Employees.findOne(this._id)

    // Pass MongoDB ObjectID to be used when edit form is submitted
    form.data({"_id": this._id})
    
    form.children('.name').val(data.name)
    form.children('.nik').val(data.nik)
    form.children('.dept').val(data.dept)
    form.children('.pos').val(data.pos)

    form.children('.name').focus()
  },
  'submit .update-employee'(event){
    let form = $('.update-employee')
    // Prevent default browser form submit
    event.preventDefault();

    // Update employee
    const target = event.target;
    Employees.update(
      {_id: form.data("_id")},
      {$set:
        {
          name: target.name.value,
          nik: target.nik.value,
          dept: target.dept.value,
          pos: target.pos.value
        }
      }
    )

    // Clear form
    target.name.value = ''
    target.nik.value = ''
    target.dept.value = ''
    target.pos.value = ''
  },
  'click .delete'(){
    Employees.remove(this._id)
  },
});

Template.body.helpers({
  employees(){
    return Employees.find({});
  },
});
