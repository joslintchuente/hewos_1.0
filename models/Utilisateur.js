let db = require('../database/database');
let bcrypt = require('bcrypt');

class Utilisateur{
    // constructeur
    
    constructor(donnees){
        if(!donnees.token){
            // hashage du mdp
            this.mot_de_passe = donnees['mot_de_passe'];
            this.mot_de_passe_hashe = bcrypt.hashSync(donnees['mot_de_passe'], 10);
        }
        this.telephone = donnees['telephone'];
        this.id_pays = donnees['id_pays'];
    }
    
    getId_User(){
        let requete = 'SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ? ';
        return new Promise((resolve,reject) => {
            db.query(requete, [this.id_pays, this.telephone], (err,result) => {

                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }

            });
        })
    }

    enregistrement(donnees){
        // inscription dans la BD

        // FAUDRA DISCUTER AVEC YVIK COMMENT ENVOYER LES PHOTOS

        let requete = 'INSERT INTO user SET NOM = ? ,PRENOM = ?,  EMAIL = ? , MOT_PASSE = ?, TELEPHONE = ? , ID_PAYS = ? , MONNAIE = ? , PROFESSION = ? , DATE_NAISSANCE = ? , VILLE = ? , STATUT = ? , PHOTO = ? ';
        return new Promise((resolve,reject)=>{

            
            db.query(requete, [donnees['nom'], donnees['prenom'], donnees['email'],this.mot_de_passe_hashe , this.telephone , donnees['id_pays'], donnees['monnaie'], donnees['profession'] , donnees['date_naissance'], donnees['ville'], "/" , donnees['photo']], (err,result) => {
                console.log(result + "**"+ !err);
                if(!err){
                    resolve(result);
                    console.log("Enregistrement reussi !!");
                }else{
                    
                    reject(err);
                }

            });
                

        });
    }

    verification_existance(existance){
        let requete = 'SELECT * FROM user WHERE TELEPHONE = ? AND ID_PAYS = ? ';
        try {

            db.query(requete, [this.telephone,this.id_pays], (err, result) => {
                if (err) throw err;
                if (Array.isArray(result) && result.length) {
                    existance(result);
                    // le tableau existe et n'est pas vide
                } else {
                    existance(false);
                }
            });

        } catch (error) {

            console.error(error);
            console.error("erreur :" + error);
            existance(false);

        }
    }
    verification_mot_de_passe(existance,reponse){
        let exacte = bcrypt.compareSync(this.mot_de_passe, existance[0]['MOT_PASSE']);
        if(exacte){
            reponse(true);
        }else{
            reponse(false);
        }
    }

    publier(donnees){
        let requete = 'INSERT INTO offre SET ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?) ,PREFIXE = ?,  INTITULE = ? , DESCRIPTION = ?, MODE = ? , DELAI = ? , COMMENTAIRES = 0 , LIKES = 0 , POSTULANTS = 0 , PHOTO_POST = ?';
        return new Promise((resolve,reject)=>{
            
            db.query(requete, [this.id_pays,this.telephone, donnees['prefixe'],donnees['intitule'] , donnees['description'], donnees['mode'], donnees['delai'],donnees['filename']], (err,result) => {
                if(!err){
                    console.log("Publication reussie !!");
                    resolve(result);
                }else{
                    reject(err);
                }

            });
                

        });
    }

    questionner(id_offre,libelle){
        let requete = 'INSERT INTO question SET ID_OFFRE = ? , LIBELLE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requete, [id_offre , libelle], (err,result) => {
                if(!err){
                    console.log("Questions enregistrees !!");
                    resolve(result);
                }else{
                    reject(err);
                }

            });
                
        });
    }

    commenter(donnees){
        let requete  =  'INSERT INTO commentaire SET ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?) , AVIS = ? , ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requete, [this.id_pays, this.telephone, donnees['avis'], donnees['id_offre']], (err,result) => {
                if(!err){
                    console.log("insertion commentaire reussie !!");
                    
                    resolve(result);
                }else{
                    reject(err);
                    console.log(`id de offre ${donnees['id_offre']}`);
                }
            });
        });
    }
    
    liker(donnees){
        let requete  =  'INSERT INTO likes SET ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?)  , ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requete, [this.id_pays, this.telephone, donnees['id_offre']], (err,result) => {
                if(!err){
                    console.log("insertion like reussie !!");
                    resolve(result);
                }else{
                    reject(err);
                    
                }
            });
        });
    }

    postuler(donnees){

        let requete  =  'INSERT INTO postulat SET ID_USER = (SELECT ID_USER FROM user WHERE ID_PAYS = ? AND TELEPHONE = ?)  , ID_OFFRE = ? ';
        return new Promise((resolve,reject)=>{
            db.query(requete, [this.id_pays, this.telephone, donnees['id_offre']], (err,result) => {
                if(!err){
                    console.log("insertion postulat reussie !!");
                    resolve(result);
                }else{
                    reject(err);
                    
                }
            });
        });
    }

    repondre_questions(id_user,id_question,proposition){
        let requete = `INSERT INTO reponse_question SET ID_USER = ? , ID_QUESTION = ? , PROPOSITION = ?`;
        return new Promise((resolve,reject)=>{
            db.query(requete, [id_user,id_question,proposition], (err,result) => {
                if(!err){
                    console.log("Reponses enregistrees !!");
                    resolve(result);
                }else{
                    reject(err);
                }

            });
                
        });
    }

    suivre(id_user){
        let etat_abonnement = `SELECT * FROM abonnement WHERE ID_USER_ASSO_14 = ? `;
        return new Promise((resolve,reject)=>{
            db.query(etat_abonnement, id_user , (err, result) => {
                if (err) reject(err);
                if (Array.isArray(result) && result.length) {
                    resolve(true);
                    // le tableau existe et n'est pas vide
                } else {
                    resolve(false);
                }
            });
        });
        
    }

    modificationProfil(donnees){
        let requete = 'UPDATE user SET NOM = ? ,PRENOM = ?, MONNAIE = ? , PROFESSION = ? , DATE_NAISSANCE = ? , VILLE = ? , PHOTO = ? WHERE ID_PAYS = ? AND TELEPHONE = ?  ';
        return new Promise((resolve,reject)=>{

            db.query(requete, [donnees['nom'], donnees['prenom'], donnees['monnaie'], donnees['profession'] , donnees['date_naissance'], donnees['ville'], donnees['filename'],donnees['id_pays'],donnees['telephone']], (err,result) => {
                console.log(result + "**"+ !err);
                if(!err){
                    resolve(result);
                    console.log("modification reussie !!");
                }else{
                    
                    reject(err);
                }

            });
                

        });
    }
}

module.exports = Utilisateur;