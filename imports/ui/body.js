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

    alert("Karyawan berhasil ditambahkan.");
  },
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
    if(answer){
      // Update employee
      Employees.update(
        {_id: this._id},
        {$set:{name, nik, dept, pos}}
      )
    }
  },
  'click .delete'(){
    let answer = confirm(`Hapus Karyawan ini (${this.name})?`);
    if(answer){Employees.remove(this._id)}
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