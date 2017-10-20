import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './employee.js'
import './list.html';
import {Employees} from '../../api/employees.js';

Template.list.onCreated(function(){
  this.page = new ReactiveVar(1)
  this.keyForSorting = new ReactiveVar('number')
  this.orderForSorting = new ReactiveVar(1)
  Meteor.subscribe('employees')
});

let employeesPerPage = 5
Template.list.helpers({
  employees(){
    let keyForSorting = Template.instance().keyForSorting.get()
    let orderForSorting = Template.instance().orderForSorting.get()
    return Employees.find({},{
      sort: {[keyForSorting]: orderForSorting},
      skip: ((Template.instance().page.get() - 1) * employeesPerPage),
      limit: employeesPerPage,
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

Template.list.events({
  // DELETE: Delete an employee entry
  'click .delete'(){
    let answer = confirm(`Hapus Karyawan ini (${this.name})?`);
    if(answer){Meteor.call('employees.remove', this._id)}
  },
});

// Event for changing page number
Template.list.events({
  'click .page_number'(event, instance){
    // Prevent default browser hyperlink click
    event.preventDefault();
    instance.page.set(parseInt(event.target.id))
  },
});

// Events for changing sorting key and order
Template.list.events({
  'change .sorting.key'(event, instance){
    let key = $(event.target).val()
    instance.keyForSorting.set(key)
  },
  'change .sorting.order'(event, instance){
    let order = $(event.target).val()
    instance.orderForSorting.set(order)
  },
});