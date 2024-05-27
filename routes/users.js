var express = require('express');
var router = express.Router();
var path = require('path');
const jwtUtils = require('../models/outils/jwt.utils');
const Systeme = require('../models/Systeme');
const Utilisateur =  require('../models/Utilisateur');
let { auth } = require('../models/outils/auth');
let {connexion,inscription,publicationOffre,affichageOffre,affichageCommentaire,commenter,likePublication,postuler,affichagePostulat,suivre,abonnement,affichageProfil,modificationProfil} = require('../controllers/users');
const multer =  require('multer');
let {imageStorage, imageStorage2} = require('../models/outils/fileStorage');



/* aucune fonction ici */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// permet de se connecter
router.post('/connexion', (req,res,next) => connexion(req,res,next));

// inscription
// ici il faudra repenser à la possibilité de stockage de l'image de profil
// cela si éventuellement un bon traitement est fait au niveau front
// aussi si on est sûr que l'utilisateur n'existe pas encore
router.post('/inscription' , (req,res,next)=> inscription(req,res,next));

// publication d'une offre sous condition d'être déja authentifié (token)
router.post('/publication' ,imageStorage , auth , (req,res,next) => publicationOffre(req,res,next));

// voir les publications d'offre  sous condition d'être déja authentifié (token)
router.get('/publication' , auth , (req,res,next) => affichageOffre(req,res,next));

// voir les commentaires d'une publication  sous condition d'être déja authentifié (token)
router.get('/commentaires', auth, (req,res,next) => affichageCommentaire(req,res,next));

// commenter une publication sous condition d'être déja authentifié (token)
router.post('/commentaires', auth, (req,res,next) => commenter(req,res,next));

// liker une publication sous condition d'être déja authentifié (token)
router.post('/like',auth,(req,res,next) => likePublication(req,res,next));

// postuler à une offre valide(la validité n'est pas encore prise en cherge) : à faire
router.post('/postulat', auth, (req,res,next) => postuler(req,res,next));

// recuperer tous les postulats d'une offre
router.get('/postulat',auth, (req,res,next) => affichagePostulat(req,res,next));

// permet de s'abonner ou de se désabonner à un utilisateur
router.post('/abonnement',auth, (req,res,next) => suivre(req,res,next));

// lister les différents abonnement d'un client 
router.get('/abonnement',auth , (req,res,next) => abonnement(req,res,next));

// lister les informations du profil d'un utilisateur
router.get('/profil',auth, (req,res,next) => affichageProfil(req,res,next));

// permet de modifier certaines informations du profil de l'utilisateur
router.post('/profil',imageStorage2,auth,(req,res,next) => modificationProfil(req,res,next));


// 
//router.post('/postulat_question')



module.exports = router;
