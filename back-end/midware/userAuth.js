module.exports = (req, res, next) => {
    
    const bearerheader = req.headers['authorization'];
    if(typeof bearerheader !== 'undefined' ) {

        req.token = bearerheader;
        next();
    }
    else {
        
        res.sendStatus(403);
    }
}