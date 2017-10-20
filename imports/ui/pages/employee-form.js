import { Template } from 'meteor/templating';

import './employee-form.html';

Template.employee_form.rendered=function() {
    $('.datepicker').datepicker({
        format: 'd M yyyy',
    });
    $('.date-button').click(function(){
        $('.datepicker').focus();
    })
}