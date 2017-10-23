import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

import './employee.js'
import './list.html';
import {Employees} from '../../api/employees.js';

Template.list.onCreated(function(){
  Session.set({
    page: 1,
    keyForSorting: 'name',
    // 1 is ASC, -1 DESC
    orderForSorting: 1
  });
  Meteor.subscribe('employees')
});

let employeesPerPage = 5
Template.employee.onRendered(function(){
  let page = Session.get('page')
  let firstListNumber = ((page - 1) * employeesPerPage) + 1
  $('.number').each(function(id,element){
    $(element).html(firstListNumber + id)
  })
});

Template.list.helpers({
  employees(){
    let keyForSorting = Session.get('keyForSorting');
    let orderForSorting = Session.get('orderForSorting');
    return Employees.find({},{
      sort: {[keyForSorting]: orderForSorting},
      skip: ((Session.get('page') - 1) * employeesPerPage),
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
    return Session.get('page');
  }
});

// Event for changing page number
Template.list.events({
  'click .page_number'(event, instance){
    // Prevent default browser hyperlink click
    event.preventDefault();
    Session.set({page: parseInt(event.target.id)})
  },
});

// Events for changing sorting key and order
Template.list.events({
  'change .sorting.key'(event, instance){
    let key = $(event.target).val()
    Session.set({keyForSorting: key})
  },
  'change .sorting.order'(event, instance){
    let order = $(event.target).val()
    Session.set({orderForSorting: order})
  },
});