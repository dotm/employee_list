import { Template } from 'meteor/templating';

import './employee-form.html';

Template.employee_form.onRendered(function(){
  $('.datepicker').datepicker({
      format: 'd M yyyy',
  });
  $('.date-button').click(function(){
      $('.datepicker').focus();
  });

  $.validator.addMethod(
    "capitalized",
    function(value, element) {
        return /^[A-Z]/.test(value);
    },
    "Please capitalize employee's name."
  );
  $.validator.addMethod(
    "first_number_not_zero",
    function(value, element) {
        return value[0] !== "0";
    },
    "NIK can't start with the number 0."
  );
  $('form').validate({
    invalidHandler: function(event, validator) {
      // prevent processing the form further until all input is valid
      event.preventDefault();
    },
    rules: {
      name: {
        required: true,
        capitalized: true,
      },
      nik: {
        required: true,
        number: true,
        first_number_not_zero: true,
      },
      dept: "required",
      pos: "required",
      date: {
        required: true,
        date: true
      },
    },
  });
})

Template.employee_form.helpers({
  formatDate(date){
    return date.toLocaleDateString('en',{
      day:'numeric',
      month:'short',
      year:'numeric'
    });
  }
});