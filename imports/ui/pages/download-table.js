import { Template } from 'meteor/templating';
import XLSX from 'xlsx';

import './download-table.html';
import {Employees} from '../../api/employees.js';

Template.downloadTable.onCreated(function(){
    Meteor.subscribe('employees')
});

Template.downloadTable.onRendered(function(){
    function s2ab(s) {
        if(typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(s.length);
            for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }

    // Wait for #each block to finish loading, then download the file
    $('#back-button').hide()
    setTimeout(function(){
        let table = $('table')[0]
        let wb = XLSX.utils.table_to_book(table)
        let ws = wb.Sheets[wb.SheetNames[0]]
        let wscols = [
            {wpx: 110}, // name col
            {wpx: 75}, // nik col
            {wpx: 90}, // dept col
            {wpx: 90}, // pos col
            {wpx: 110}, // date col
        ]
        ws['!cols'] = wscols
        
        let o = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        saveAs(new Blob([s2ab(o)], {type:'application/octet-stream'}), 'Daftar Karyawan.xlsx');
        $('#preparation').hide()
        $('#back-button').show()
    }, 5000);
})

Template.downloadTable.helpers({
    employees(){
        return Employees.find();
    },
})

Template.employeeSimple.helpers({
    formatDate(date){
        return date.toLocaleDateString();
    },
})