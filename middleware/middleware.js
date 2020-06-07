const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const AuthHedaer = req.get('Authorization');
        if (AuthHedaer) {
            const token = AuthHedaer.spli(' ')[1];
            if (token) {
                let isValid = jwt.verify(token, '%%secret%%');
                if (isValid) {
                    req.isAuth = true;
                    req.userId = isValid.userId;
                    return next();
                } else {
                    req.isAuth = false;
                    return next();
                }

            } else {
                req.isAuth = false;
                return next();
            }
        } else {
            req.isAuth = false;
            return next();
        }
    } catch (e) {
        req.isAuth = false;
        return next();
    }
}