module.exports = rows => {
    const results = [];
    let checker = [];
    for(let i = 0; i < rows.length; i++) {
        if(checker.includes(rows[i].quizid)) continue;
        results.push(rows[i]);
        checker.push(rows[i].quizid);
    }
    return results;
}