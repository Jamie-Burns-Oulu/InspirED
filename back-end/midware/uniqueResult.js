module.exports = rows => {
    const results = [];
    let checker = -1;
    for(let i = 0; i < rows.length; i++) {
        if(rows[i].quizid === checker) continue;
        results.push(rows[i]);
        checker = rows[i].quizid;
    }
    return results;
}