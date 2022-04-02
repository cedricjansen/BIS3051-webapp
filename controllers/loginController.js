const Database = require('../database/database.js');


class LoginController {

    authenticated;

    async login(req, res, redirect) {
        var error = {};
        if(req.body.username == '' || req.body.password == '') {
            if(req.body.username == '') {
                error.usernameempty = true;
            }
            if(req.body.password == '') {
                error.passwordempty = true;
            }
        } else {
            if(await this.checkCredentials(req.body, error)) {
                req.session.isFirst = 1;
                res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
                return res.status(200).send({result: 'redirect', url: redirect});
            }   
        }
        return res.status(200).send({result: 'failed', errors: error });
    }

    logout(req, res, redirect) {
        req.session = null;
        res.cookie('isFirst', 1, { expires: new Date(0) , singed: true});
        res.cookie('session', 1, { expires: new Date(0) , singed: true});
        this.log("Logout");
        return res.status(200).send({result: 'redirect', url: redirect})
    }

    async checkCredentials(data, errors) {
        var db = new Database();
        return await db.authenticate(data, errors, this);
    }

    log(string) {
        console.log(string);
    }
}

module.exports = LoginController;