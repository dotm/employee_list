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
    
    let employeeID = this._id
    let oldImageID = this.imageID
    let fileInputID = "#" + employeeID + " " + "#fileInput"
    let uploadedImage = $(fileInputID)[0].files[0]  // this will be undefined if no file uploaded
    let user_upload_an_image = !!uploadedImage
    if(user_upload_an_image){
      // delete old image
      Images.remove(oldImageID)
      // store new image
      Images.insert(uploadedImage, function(err,fileObj){
        // and retrieve it's ID (to be stored in employee obj)
        employeeObj.imageID = fileObj._id
        Meteor.call('employees.update', employeeID, employeeObj)
      })
    }else{
      Meteor.call('employees.update', employeeID, employeeObj)
    }

    $('.modal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove()
  },
  // DELETE: Delete an employee entry
  'click .delete'(){
    let employeeID = this._id
    // delete employee (this also delete associated image; look for hook on Employees api)
    Meteor.call('employees.remove', employeeID)

    $('.modal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove()
  },
});