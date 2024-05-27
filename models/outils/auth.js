let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'bliaeue15zpq1xz7saa97saszdeeeoc1187ed9z39j7o1z8zex';

exports.auth = (req, res, next) => {
    if (req.body.token) {
        try {
            let data = jwt.verify(req.body.token, JWT_SIGN_SECRET);
            req.body.id_pays = data.id_pays;
            req.body.telephone = data.telephone;
            ;
            next();
        } catch (error) {
            return res.status(401).json({ reponse: "Echec d'authentification : Accès refusé " });
        }
    } else {
        if (req.url == "/connexion") {
            console.log(req.url);
            next();


        } else {
            res.status(401).json({ reponse: "Echec d'authentification : Accès refusé " });
        }
    }

}