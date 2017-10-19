import { Template } from 'meteor/templating';

import './employee.html'

Template.employee.helpers({
  formatDate(date){
    return date.toLocaleDateString('id',{
      day:'numeric',
      month:'short',
      year:'numeric'
    });
  },
});

