import { Template } from 'meteor/templating';

import './employee-form.js';
import './add.html';
import {Employees} from '../../api/employees.js';
import {Images} from '../../api/images.js';

Template.add.events({
    // CREATE: Add new employee
    'submit .new-employee'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        let date = new Date($('.datepicker').val())
        let newEmployee = {
            name: event.target.name.value,
            nik: event.target.nik.value,
            dept: event.target.dept.value,
            pos: event.target.pos.value,
            date: date
        }

        let user_upload_an_image = !!$('#fileInput')[0].files[0]
        if(user_upload_an_image){
            // store the image
            Images.insert($('#fileInput')[0].files[0], function(err,fileObj){
                // and retrieve it's ID (to be stored in new employee obj)
                newEmployee.imageID = fileObj._id
                Meteor.call('employees.insert', newEmployee)
            })
        }else{
            Meteor.call('employees.insert', newEmployee)
        }

        FlowRouter.go('List');
    },
});