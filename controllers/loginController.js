class LoginController {
    constructor() {

    }

    login(req, res, redirect) {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.render(redirect);
    }

    logout(req, res, redirect) {
        req.session = null;
        res.cookie('isFirst', 1, { expires: new Date(0) , singed: true});
        res.cookie('session', 1, { expires: new Date(0) , singed: true});
        res.render(redirect);
    }

    log(string) {
        console.log(string);
    }
}

module.exports = LoginController;