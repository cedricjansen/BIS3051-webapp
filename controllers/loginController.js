const Database = require('../database/database.js');


class LoginController {
    constructor() {

    }

    login(req, res, redirect) {
        if(this.checkCredentials(req.body)){
            req.session.isFirst = 1;
            res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
            return res.status(200).send({result: 'redirect', url: redirect})
        } 
    }

    logout(req, res, redirect) {
        req.session = null;
        res.cookie('isFirst', 1, { expires: new Date(0) , singed: true});
        res.cookie('session', 1, { expires: new Date(0) , singed: true});
        this.log("Logout");
        return res.status(200).send({result: 'redirect', url: redirect})
    }

    checkCredentials(data) {
        var db = new Database();
        db.authenticate(data);
        
        return true;
    }

    log(string) {
        console.log(string);
    }
}

module.exports = LoginController;