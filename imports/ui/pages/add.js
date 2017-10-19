import { Template } from 'meteor/templating';

import './add.html';
import {Employees} from '../../api/employees.js';

Template.add.rendered=function() {
    $('.datepicker').datepicker({
        format: 'd M yyyy',
    });
    $('.date-button').click(function(){
        $('.datepicker').focus();
    })
}

Template.add.events({
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
        let date = new Date($('.datepicker').val())
        const target = event.target;
        let newEmployee = {
            number: getMaxEmployeeNumber(),
            name: target.name.value,
            nik: target.nik.value,
            dept: target.dept.value,
            pos: target.pos.value,
            date: date
        }
        
        Meteor.call('employees.insert', newEmployee)

        // Clear form
        target.name.value = ''
        target.nik.value = ''
        target.dept.value = ''
        target.pos.value = ''

        FlowRouter.go('List');
    },
});