let joi = require('joi');
let db = require('../database/database');


// class systeme permettant de gerer toutes les verifications
class Systeme{

    constructor(){
        // intialisation
        // recuperer le temps 
        let date_init = new Date();
        let liste_erreurs = {};
        
    }

    verification_donnees_connexion(donnees){
        const schema = joi.object().keys({

            mot_de_passe: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$'))
                .required(),
    
            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
            
            id_pays: joi.number()
                .integer()
                .min(1)
                .max(400)
                .required(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }

        //return schema.validate(donnees);
    }

    verification_donnees_inscription(donnees){
        const schema = joi.object().keys({
            //  NOM PRENOM TELEPHONE STATUT 
            //ID PAYS  MOT_PASSE
            // PHOTO ? EMAIL MONNAIE
            // PROFESSION
            // DATE_NAISSANCE
            //vILLE
            nom: joi.string()
                .alphanum()
                .min(3)
                .max(255)
                .required(),

            prenom: joi.string()
                .min(3)
                .max(128)
                .required(),

            email: joi.string()
                .min(8)
                .max(255)
                .required()
                .email()
                .required(),

            mot_de_passe: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$'))
                .required(),

            repeat_mot_de_passe: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$'))
                .required(),

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires

            id_pays: joi.number()
                .integer()
                .min(1)
                .max(400)
                .required(),
            
            monnaie: joi.string()
                .min(3)
                .max(255)
                .required(),
            
            profession: joi.string()
                .min(3)
                .max(255),

            ville: joi.string()
                .min(3)
                .max(255)
                .required(),
            
            date_naissance: joi.string()
                .pattern(new RegExp("^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$")),
            photo: joi.string()
                .min(3)
                .max(999),

        });

        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            if(donnees["mot_de_passe"] == donnees["repeat_mot_de_passe"]){
                return true;
            }
            else{
                return ({error : "la confirmation du mot de passe n\'est pas conforme au premier mot de passe"});
            }
            
        }

    }


    verification_donnees_publication(donnees){
        // on verifie le format des données du formulaire de publication
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            prefixe: joi.string()
                .required(),
            intitule: joi.string()
                .required(),
            description :joi.string()
                .required(),
            mode: joi.string()
                .required(),  // la faudra reflechir au type et à la liste des modes
            delai : joi.string()
                .pattern(new RegExp("^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$")),
            token: joi.string(),
            filename: joi.string(),
            questions: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }
    

    verification_donnees_question(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            prefixe: joi.string()
                .required(),
            intitule: joi.string()
                .required(),
            description :joi.string()
                .required(),
            mode: joi.string()
                .required(),  // la faudra reflechir au type et à la liste des modes
            delai : joi.string()
                .pattern(new RegExp("^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$")),
            token: joi.string(),
            filename: joi.string(),
            questions: joi.array()
                .max(10)
                .exist()
                .required(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }

    verification_donnees_reponse(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_offre: joi.number()
                .min(1)
                .required(),
            token: joi.string(),
            
            reponses: joi.array()
                .max(10)
                .exist()
                .required(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }

    // il faudra gérer les offsets plutard(aléatoire+ algo de recommendation)
    // aussi ne pas afficher des publications de l'utilisateur lui mm mais des autres
    afficher_publications(donnees){
        // on l'alliera plutard avec une IA implémentant un
        // algorithme de recommandation
        //oFFset après
        let champsOffre = "PREFIXE,INTITULE,DESCRIPTION,MODE,DATE_PUBLICATION,DELAI,STATUT_OFFRE,DATE_ACQUISITION,ID_OFFRE,COMMENTAIRES,LIKES,POSTULANTS,PHOTO_POST";
        let champsUser = "offre.ID_USER,NOM,PRENOM,ID_PAYS,PHOTO,EMAIL,MONNAIE,PROFESSION,VILLE";
        let requete = `SELECT ${champsOffre}, ${champsUser} FROM offre INNER JOIN user ON offre.ID_USER = user.ID_USER ORDER BY DATE_PUBLICATION DESC LIMIT 6 `;
        
        return new Promise((resolve,reject)=>{
            
            db.query(requete , (err,result) => {
                if(!err){
                    resolve(result);
                    
                }else{
                    reject(err);
                }

            });
        });
    }

    afficher_commentaire(id){
        let champsUser = "user.ID_USER,NOM,PRENOM,ID_PAYS,PHOTO,EMAIL,MONNAIE,PROFESSION,VILLE";

        let requete = `SELECT ${champsUser},AVIS,DATE_COMMENTAIRE FROM commentaire INNER JOIN user ON commentaire.ID_USER = user.ID_USER WHERE id_offre = ? ORDER BY DATE_COMMENTAIRE DESC LIMIT 6 `;
        
        return new Promise((resolve,reject)=>{
            db.query(requete ,id , (err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }

    afficher_questions(id_offre){
        let requete = `SELECT LIBELLE FROM question WHERE ID_OFFRE = ?`;
        return new Promise((resolve,reject)=>{
            db.query(requete,id_offre,(err,result)=>{
                if(!err){
                  resolve(result);  
                }else{
                    reject(err);
                }
            });
        });
    }
    afficher_id_questions(id_offre){
        let requete = `SELECT ID_QUESTION FROM question WHERE ID_OFFRE = ?`;
        return new Promise((resolve,reject)=>{
            db.query(requete,id_offre,(err,result)=>{
                if(!err){
                  resolve(result);  
                }else{
                    reject(err);
                }
            });
        });
    }


    verification_donnees_commentaires(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_offre: joi.number()
                .min(1)
                .required(),
            avis: joi.string()
                .required(),
            token: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }
    verification_donnees_likes(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_offre: joi.number()
                .min(1)
                .required(),
            token: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }
    verification_donnees_postulats(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_offre: joi.number()
                .min(1)
                .required(),
            token: joi.string(),
            reponses: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }

    verification_donnees_abonnement(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_user: joi.number()
                .min(1)
                .required(),
            token: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }

    verification_donnees_lister_abonnement(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            token: joi.string(),
        });
        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }
    }

    verification_existance_offre(id_offre){
        
        let requete = 'SELECT * FROM offre WHERE ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requete, id_offre, (err, result) => {
                if (!err){

                    if(Array.isArray(result) && result.length) {
                        
                        resolve(result);
                    }else{
                        reject("Aucune publication avec ces references !");
                    }
                }else{
                    
                    reject(err);

                }
            });
        });
    }

    verification_donnees_profil(donnees){
        const schema = joi.object().keys({
            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),

            nom: joi.string()
                .alphanum()
                .min(3)
                .max(255)
                .required(),

            prenom: joi.string()
                .min(3)
                .max(128)
                .required(),

            monnaie: joi.string()
                .min(3)
                .max(255)
                .required(),
            
            profession: joi.string()
                .min(3)
                .max(255),

            ville: joi.string()
                .min(3)
                .max(255)
                .required(),
            
            date_naissance: joi.string()
                .pattern(new RegExp("^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$")),

            photo: joi.string()
                .min(3)
                .max(999),
            filename: joi.string()
                .min(3)
                .max(999),

            token: joi.string(),

        });

        let reponse = schema.validate(donnees);
        if(reponse["error"]){
            return reponse;
        }else{
            return true;
        }

    }

    incremmentation_nombre_commentaire(id_offre){
        let requeteinitiale = 'SELECT COMMENTAIRES FROM offre WHERE ID_OFFRE = ? ';
        
        let requete = ' UPDATE offre SET COMMENTAIRES = ? + 1 WHERE ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requeteinitiale ,id_offre , (err,result) => {
                if(!err){
                    db.query(requete ,[result[0].COMMENTAIRES,id_offre] , (err2,result2) => {
                        if(!err2){
                            resolve(result2);
                        }else{
                            reject(err2);
                        }
                    });
                }else{
                    reject(err);
                }
            });
        });
    }

    incremmentation_nombre_like(id_offre){
        let requeteinitiale = "SELECT LIKES FROM offre WHERE ID_OFFRE = ? ";
        
        let requete = ' UPDATE offre SET LIKES = ? + 1 WHERE ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requeteinitiale ,id_offre , (err,result) => {
                if(!err){
                    db.query(requete ,[result[0].LIKES,id_offre] , (err2,result2) => {
                        if(!err2){
                            resolve(result2);
                        }else{
                            reject(err2);
                        }
                    });
                }else{
                    reject(err);
                }
            });
        });
    }

    incremmentation_nombre_postulant(id_offre){
        let requeteinitiale = "SELECT POSTULANTS FROM offre WHERE ID_OFFRE = ? ";
        
        let requete = ' UPDATE offre SET POSTULANTS = ? + 1 WHERE ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requeteinitiale ,id_offre , (err,result) => {
                if(!err){
                    db.query(requete ,[result[0].POSTULANTS,id_offre] , (err2,result2) => {
                        if(!err2){
                            resolve(result2);
                        }else{
                            reject(err2);
                        }
                    });
                }else{
                    reject(err);
                }
            });
        });
    }

    verification_droit_acces_postulant(donnees){
        const schema = joi.object().keys({

            telephone: joi.string()
                .pattern(new RegExp('^[0-9]{8,14}$'))
                .required(), // pour les numeros de telephones ordinaires
                // à noter que ce numéro est extrait du token et inséré dans le corps de la requete
            id_pays: joi.number()
                .integer()
                .min(1)// à noter que cet id_pays est extrait du token et inséré dans le corps de la requete
                .max(400)
                .required(),
            id_offre: joi.number()
                .min(1)
                .required(),
            token: joi.string(),
        });
        let reponse = schema.validate(donnees);
        
        if(reponse["error"]){
            reject(reponse);
        }else{
            let requete = `SELECT INTITULE FROM offre WHERE ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ? ) AND ID_OFFRE = ? `;
            
            return new Promise((resolve,reject)=>{
                db.query(requete, [donnees.id_pays,donnees.telephone,Number(donnees.id_offre)], (err, result) => {
                    if (err) {
                        reject(err);
                    }else{
                        
                        if(Array.isArray(result) && result.length){
                            
                            resolve(true);
                            // le tableau existe et n'est pas vide
                        } else {
                            resolve(false);
                        }
                    }
                    
                });
            });
            
        }
    }

    afficher_postulat(id_offre){
        // il faudrat pouvoir limiter le nbr de postulats (via limit 10)
        let requete = `SELECT ID_USER,NOM,PRENOM,ID_PAYS,PHOTO,EMAIL,MONNAIE,PROFESSION,VILLE FROM user WHERE ID_USER IN ( (SELECT ID_USER FROM postulat WHERE ID_OFFRE = ? ORDER BY DATE_POSTULAT ASC) ) `;
        
        return new Promise((resolve,reject)=>{
            db.query(requete ,id_offre , (err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }

    desabonner_utilisateur(donnees){
        let desabonnement = `DELETE FROM abonnement WHERE ID_USER_ASSO_14 =  ?  AND ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?) `;
        return new Promise((resolve,reject)=>{
            db.query(desabonnement, [Number(donnees['id_user']), Number(donnees['id_pays']), donnees['telephone'] ] , (err, result) => {
                if (err){ 
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }

    abonner_utilisateur(donnees){
        let abonnement = `INSERT INTO abonnement SET ID_USER_ASSO_14 = ?  , ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?) `;
        return new Promise((resolve,reject)=>{
            db.query(abonnement, [Number(donnees['id_user']), Number(donnees['id_pays']), donnees['telephone'] ], (err, result) => {
                if (err){ 
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }


    lister_abonnement(id_user){
        let requete = `SELECT ID_USER,NOM,PRENOM,ID_PAYS,PHOTO,EMAIL,MONNAIE,PROFESSION,VILLE FROM user WHERE ID_USER IN ((SELECT ID_USER_ASSO_14 FROM abonnement WHERE ID_USER = ? )) `;
        return new Promise((resolve,reject)=>{
            db.query(requete , id_user , (err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }

    afficher_profil(id_user){
        let requete = `SELECT * FROM user WHERE ID_USER = ? `;
        return new Promise((resolve,reject)=>{
            db.query(requete ,id_user , (err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }

}

module.exports = Systeme;