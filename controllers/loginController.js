class LoginController {
    constructor() {

    }

    login(req, res, redirect) {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.render(redirect);
    }

    logout(res, redirect) {
        res.session = null;
        res.render(redirect);
    }

    log(string) {
        console.log(string);
    }
}

module.exports = LoginController;