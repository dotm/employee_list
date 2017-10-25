let seeder = function seeder(Collection){
    // clear all previously stored data
    if(Collection.find().count() > 0){
        Collection.remove({})
    };

    let docs = [
        {
            "name": "Boris Vane",
            "nik": "31",
            "dept": "Finance",
            "pos": "Karyawan",
            "date": new Date("Nov 01 2017")
        },
        {
            "name": "Arkhim Shak",
            "nik": "97",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Nov 11 2017")
        },
        {
            "name": "Xeno Brixat",
            "nik": "021",
            "dept": "Finance",
            "pos": "CFO",
            "date": new Date("Nov 21 2017")
        },
        {
            "name": "Charle Fourier",
            "nik": "896",
            "dept": "Marketing",
            "pos": "Manager",
            "date": new Date("Nov 21 2016")
        },
        {
            "name": "Aad Faruq",
            "nik": "051",
            "dept": "Operation",
            "pos": "Karyawan",
            "date": new Date("Nov 06 2017")
        },
    
        {
            "name": "Jaras Burnak",
            "nik": "541",
            "dept": "Operation",
            "pos": "Manager",
            "date": new Date("Nov 26 2017")
        },
        {
            "name": "Abu Bakar",
            "nik": "9651",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Nov 16 2017")
        },
        {
            "name": "Zuriel Virgil",
            "nik": "551",
            "dept": "IT",
            "pos": "Manager",
            "date": new Date("Oct 16 2015")
        },
        {
            "name": "Yoshua Elmaryono",
            "nik": "0981",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2015")
        },
        {
            "name": "Lariette Marion",
            "nik": "9765",
            "dept": "IT",
            "pos": "CIO",
            "date": new Date("Oct 06 2015")
        },
    
        {
            "name": "Yarim Kezima",
            "nik": "2654",
            "dept": "IT",
            "pos": "CTO",
            "date": new Date("Oct 26 2016")
        },
        {
            "name": "Evan Angelo",
            "nik": "943",
            "dept": "Finance",
            "pos": "CFO",
            "date": new Date("Oct 26 2017")
        },
        {
            "name": "Rani Sita",
            "nik": "39378",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2017")
        },
        {
            "name": "Fe Misfa",
            "nik": "9376",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2016")
        },
        {
            "name": "Ve Misva",
            "nik": "9377",
            "dept": "Marketing",
            "pos": "Karyawan",
            "date": new Date("Oct 26 2016")
        },

        {
            "name": "Kiki Titu",
            "nik": "0057",
            "dept": "IT",
            "pos": "Karyawan",
            "date": new Date("Oct 16 2016")
        },
        {
            "name": "Dedi Karim",
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