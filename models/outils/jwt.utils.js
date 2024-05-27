let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'bliaeue15zpq1xz7saa97saszdeeeoc1187ed9z39j7o1z8zex';

module.exports = {
    generateTokenForUser: function(telephone,id_pays) {
        return jwt.sign({
                telephone: telephone,
                id_pays: id_pays
            },
            JWT_SIGN_SECRET, {
                expiresIn: '24h'
            })
    }
}