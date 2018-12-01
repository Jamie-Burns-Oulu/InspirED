
module.exports =(rows) => {
    let data = {};

    for(let i = 0; i < rows.length; i++) {
        if (data[rows[i].subjectname] === undefined) {
            data[rows[i].subjectname] = [];
            data[rows[i].subjectname].push(rows[i]);
        }
        else {
            data[rows[i].subjectname].push(rows[i]);
        }
    }
    // console.log(data);
    const responseData = {};
    Object.keys(data).map( key => {
        const cats = {};
        cats.isempty = false;
        cats.categoryname = data[key].map(item => item.categoryname)
        .filter((value, index, self) => self.indexOf(value) === index);

        if (cats.categoryname[0] === null) {
            cats.categoryname[0] = 'Add new!';
            cats.isempty = true;
        }
        else {
            cats.categoryname.push('Add new!')
        }
        cats.subjectid = data[key][0].subjectid;
        responseData[key] = cats;
        cats.subjectname = key;
    });


    return responseData;
}