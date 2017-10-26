import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'

import './display.html';
import {Employees} from '../../api/employees.js';
import {Images} from '../../api/images.js';

Template.display.onCreated(function(){
    Meteor.subscribe('employees')
    Meteor.subscribe('images')

    /* Implement infinite scrolling */
    function elementInView(element, fullyInView = false){
        let screenTop = $(window).scrollTop();
        let screenBottom = screenTop + $(window).height();
        let elementTop = $(element).offset().top;
        let elementBottom = elementTop + $(element).height();

        if (fullyInView) {
            return ((screenTop < elementTop) && (screenBottom > elementBottom));
        } else {
            return ((elementTop <= screenBottom) && (elementBottom >= screenTop));
        }
    }

    Session.set({
        // The two numbers below must be initialized to the same number
        limitEmployeeLoaded: 5,
        loadedEmployee: 5,
    });
    
    $(window).scroll(function(event){
        // only run this if there's a lazy-load class in HTML
        if($('.lazy-load')[0]){
            if(elementInView('#load-more')){
                // check if there's more employee to load
                let totalEmployee = Employees.find().count()
                let unloadedEmployee = totalEmployee - Session.get('loadedEmployee')
                if(unloadedEmployee > 0){
                    // if there's more employees to load, load them
                    Session.set({
                        loadedEmployee: Session.get('loadedEmployee') + Session.get('limitEmployeeLoaded')
                    })
                } else {
                    // when there's no more to load, remove the sentinel element and the scroll event handler
                    $(window).off('scroll');
                    $('#load-more').remove();
                }
            }
        }
    })
});
  
Template.display.helpers({
    employees(){
        return Employees.find({},{
            limit: Session.get('loadedEmployee'),
        });
    },
})

Template.employeeDiv.helpers({
    formatDate(date){
        return date.toLocaleDateString('en',{
            day:'numeric',
            month:'short',
            year:'numeric'
        });
    },
    image(){
        return Images.find(this.imageID)
    },
})