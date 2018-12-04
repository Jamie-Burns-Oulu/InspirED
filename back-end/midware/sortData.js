
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
        cats.category = [];
        data[key].map(item => {
            cats.category.push({ name: item.categoryname, id: item.categoryid });
        })
        // cats.categoryname = data[key].map(item => item.categoryname)
        // .filter((value, index, self) => self.indexOf(value) === index );
        if (cats.category[0].name === null) {
            cats.category[0] = {name: 'Add new!', id: -1};
            cats.isempty = true;
        }
        else {
            cats.category.push({name: 'Add new!', id: -1});
        }
        cats.subjectid = data[key][0].subjectid;
        responseData[key] = cats;
        cats.subjectname = key;
        
    });

    return responseData;
}