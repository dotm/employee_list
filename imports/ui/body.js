import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import './body.html';
import {Employees} from '../api/employees.js';

Template.body.events({
  'submit .new-employee'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Add new employee
    const target = event.target;
    function getMaxEmployeeNumber(){
      let currentMaxEmployee = Employees.findOne({},{sort:{number: -1}})
      if(currentMaxEmployee !== undefined){
        return currentMaxEmployee.number + 1;
      }else{
        //if no employee exist yet
        return 1;
      }
    }
    Employees.insert({
      number: getMaxEmployeeNumber(),
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

Template.body.onCreated(function(){
  this.page = new ReactiveVar(1)
});

let employeesPerPage = 5
Template.body.helpers({
  employees(){
    return Employees.find({},{
      skip: ((Template.instance().page.get() - 1) * employeesPerPage),
      limit: 5
    });
  },
  pages(){
    let array = [];
    let totalEmployees = Employees.find().count()
    let totalPages = Math.ceil(totalEmployees/employeesPerPage)

    for(let page_number = 1; page_number <= totalPages; page_number++){
      array.push({'page_number':page_number})
    }
    return array;
  },
  current_page(){
    return Template.instance().page.get()
  }
});

Template.body.events({
  'click .page_number'(event, instance){
    // Prevent default browser form submit
    event.preventDefault();
    
    instance.page.set(parseInt(event.target.id))
  }
})