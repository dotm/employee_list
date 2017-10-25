let seeder = function seeder(Collection){
    // clear all previously stored data
    if(Collection.find().count() > 0){
        Collection.remove({})
    };

    let docs = [
        {
            "name": "B",
            "nik": "31",
            "dept": "Finance",
            "pos": "Karyawan",
            "date": new Date("Nov 01 2017")
        },
        {
            "name": "A",
            "nik": "97",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Nov 11 2017")
        },
        {
            "name": "X",
            "nik": "021",
            "dept": "Finance",
            "pos": "CFO",
            "date": new Date("Nov 21 2017")
        },
        {
            "name": "C",
            "nik": "896",
            "dept": "Marketing",
            "pos": "Manager",
            "date": new Date("Nov 21 2016")
        },
        {
            "name": "Aa",
            "nik": "051",
            "dept": "Operation",
            "pos": "Karyawan",
            "date": new Date("Nov 06 2017")
        },
    
        {
            "name": "Ja",
            "nik": "541",
            "dept": "Operation",
            "pos": "Manager",
            "date": new Date("Nov 26 2017")
        },
        {
            "name": "Ab",
            "nik": "9651",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Nov 16 2017")
        },
        {
            "name": "Z",
            "nik": "551",
            "dept": "IT",
            "pos": "Manager",
            "date": new Date("Oct 16 2015")
        },
        {
            "name": "Y",
            "nik": "0981",
            "dept": "IT",
            "pos": "Manager",
            "date": new Date("Oct 26 2015")
        },
        {
            "name": "La",
            "nik": "9765",
            "dept": "IT",
            "pos": "CIO",
            "date": new Date("Oct 06 2015")
        },
    
        {
            "name": "Yo",
            "nik": "2654",
            "dept": "IT",
            "pos": "CTO",
            "date": new Date("Oct 26 2016")
        },
        {
            "name": "E",
            "nik": "943",
            "dept": "Finance",
            "pos": "CFO",
            "date": new Date("Oct 26 2017")
        },
        {
            "name": "Ra",
            "nik": "39378",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2017")
        },
        {
            "name": "Fe",
            "nik": "9376",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2016")
        },
        {
            "name": "Ve",
            "nik": "9377",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2016")
        },

        {
            "name": "Kk",
            "nik": "0057",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Oct 16 2016")
        },
        {
            "name": "Dd",
            "nik": "0059",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Oct 17 2016")
        },
    ]

    for(doc of docs){
        Collection.insert(doc)
    }
};

export default seeder;