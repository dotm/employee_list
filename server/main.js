import { Meteor } from 'meteor/meteor';
import {Employees} from '../imports/api/employees.js';
import {Images} from '../imports/api/images.js';
import seeder from '../imports/startup/seeder.js';

Meteor.startup(() => {
  // code to run on server at startup
  seeder(Employees)
});
