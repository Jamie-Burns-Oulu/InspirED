module.exports = (req, res, next) => {

    if(req.user !== null && req.user !== undefined) {
        next();
    }
    else {
        res.redirect('/login');
    }
};