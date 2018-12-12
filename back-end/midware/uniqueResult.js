module.exports = (rows, property) => {
    const results = [];
    let checker = [];
    for(let i = 0; i < rows.length; i++) {
        if(checker.includes(rows[i][property])) continue;
        results.push(rows[i]);
        checker.push(rows[i][property]);
    }
    return results;
}