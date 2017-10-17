import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import './list.html';
import {Employees} from '../api/employees.js';

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

// Basic CRUD events
Template.list.events({
  // CREATE: Add new employee
  'submit .new-employee'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    function getMaxEmployeeNumber(){
      let currentMaxEmployee = Employees.findOne({},{sort:{number: -1}})
      if(currentMaxEmployee !== undefined){
        return currentMaxEmployee.number + 1;
      }else{
        //if no employee exist yet
        return 1;
      }
    }
    const target = event.target;
    let newEmployee = {
      number: getMaxEmployeeNumber(),
      name: target.name.value,
      nik: target.nik.value,
      dept: target.dept.value,
      pos: target.pos.value
    }
    Meteor.call('employees.insert', newEmployee)

    // Clear form
    target.name.value = ''
    target.nik.value = ''
    target.dept.value = ''
    target.pos.value = ''

    alert("Karyawan berhasil ditambahkan.");
  },

  // UPDATE: Edit employee data
  'click .edit'(){
    let name = prompt(`Ganti nama dari ${this.name}`, this.name);
    let nik = prompt(`Ganti NIK dari ${this.name}`, this.nik);
    let dept = prompt(`Ganti departemen dari ${this.name}`, this.dept);
    let pos = prompt(`Ganti jabatan dari ${this.name}`, this.pos);
    
    let old_data = {
      Nama: this.name,
      NIK: this.nik,
      Departemen: this.dept,
      Jabatan: this.pos
    }
    let new_data = {
      Nama: name,
      NIK: nik,
      Departemen: dept,
      Jabatan: pos
    }
    let answer = confirm(
      `Ganti Karyawan ini (${this.name})?`
      + '\n\n' +
      "Data lama:\n" + JSON.stringify(old_data, null, 4)
      + '\n\n' +
      "Data baru:\n" + JSON.stringify(new_data, null, 4)
    );

    let employeeObj = {name, nik, dept, pos}
    if(answer){
      Meteor.call('employees.update', this._id, employeeObj)
    }
  },

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