const jwtUtils = require('../models/outils/jwt.utils');

const Systeme = require('../models/Systeme');
const Utilisateur = require('../models/Utilisateur');



const Connexion = (req, res, next) => {
  let donnees = req.body;
  // init d'une instance système et vérif des données envoyées
  let sys = new Systeme();
  let statut_verif = sys.verification_donnees_connexion(donnees);
  if (statut_verif == true) {
    // verification de l'existance de l'user
    let client = new Utilisateur(donnees);
    client.verification_existance((existance) => {
      if (existance) {
        client.verification_mot_de_passe(existance, (reponse) => {
          if (reponse) {
            res.json({
              reponse: true,
              id_pays: client.id_pays,
              telephone: client.telephone,
              token: jwtUtils.generateTokenForUser(client.telephone, client.id_pays),
              message: "Connexion reussie !"
            });
          } else {
            res.json({
              reponse: false,
              error: "Mot de passe errone !"
            });
          }

        });
      }
      else {
        res.json({
          reponse: false,
          error: "Utilisateur non existant veuillez reesayer"
        });
      }
    });
  } else {
    res.json({
      reponse: false,
      error: statut_verif['error']
    });
  }

};

const Inscription = (req, res, next) => {
  let donnees = req.body;
  // init d'une instance système et vérif des données envoyées
  let sys = new Systeme();
  let statut_verif = sys.verification_donnees_inscription(donnees);
  if (statut_verif == true) {
    // si les donnees sont valides et création d'un potentiel user
    let client = new Utilisateur(donnees);
    client.verification_existance((existance) => {
      if (existance) {
        // si l'utilisateur est déja utilisé
        res.json({
          reponse: false,
          error: "Ce numero est deja utilise . Verifier que c\'est bien votre numero de telephone !"
        });
      } else {
        // l'utilisateur n'existe pas encore on le cree
        client.enregistrement(donnees).then((result) => {
          res.json({
            reponse: true,
            id_pays: client.id_pays,
            telephone: client.telephone,
            token: jwtUtils.generateTokenForUser(client.telephone, client.id_pays),
            message: "inscription reussie"
          });

        }).catch((error) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de \n votre enregistrement veuillez réessayer plutard!::" + error,
          });
        });
      }
    });
  } else {
    res.json({
      reponse: false,
      error: statut_verif['error']
    });
  }
};

const PublicationOffre = (req, res, next) => {

  let donnees = req.body;
  // init d'une instance système et vérif des données envoyées
  let sys = new Systeme();
  let pub_verif = sys.verification_donnees_publication(donnees);
  if (pub_verif == true) {
    // on verifie le mode de selection choisie par le promoteur
    if (donnees['mode'] == "question") {
      // on verifie que les donnees de question sont biens présentes
      if(donnees.questions){
        donnees.questions = donnees.questions.split("*");
        
      }
      
      let confirmation = sys.verification_donnees_question(donnees);
      if (confirmation == true) {
        let user = new Utilisateur(donnees);
        // enregistrement des l'ensemble des questions
        user.publier(donnees).then((ok) => {

          let insererQuestionnaire = async (donnees,user)=>{
            for(let index in donnees.questions){
              await user.questionner(ok['insertId'],donnees.questions[index]);
            }
            insererQuestionnaire(donnees,user);
            res.json({
              reponse: true,
              id_pays: user.id_pays,
              telephone: user.telephone,
              message: "Publication reussie"
            });
          }
          

        }).catch((error) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de \n votre publication veuillez réessayer plutard!::" + error,
          });
        });

      } else {
        // on renvoie une erreur à l'app
        res.json({
          reponse: false,
          error: confirmation['error']
        });
      }

    } else {
      // lorsque c'est un mode par selection ou autre
      // insertion de la publication
      let client = new Utilisateur(donnees);
      client.publier(donnees).then((result) => {
        res.json({
          reponse: true,
          id_pays: client.id_pays,
          telephone: client.telephone,
          message: "Publication reussie"
        });
      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de \n votre publication veuillez réessayer plutard!::" + error,
        });
      });
    }

  } else {
    // on renvoie une erreur à l'app
    res.json({
      reponse: false,
      error: pub_verif['error']
    });
  }
};

const AffichageOffre = (req, res, next) => {
  let donnees = req.body;
  // init d'une instance système et vérif des données envoyées
  let sys = new Systeme();
  // en fonction de l'utilisateur on lui fournit une liste de publications
  sys.afficher_publications(donnees).then((result) => {
    let client = new Utilisateur(donnees);

    res.json({
      reponse: true,
      id_pays: client.id_pays,
      telephone: client.telephone,
      publications: result,
      message: "affichage Publication reussie"
    });
  }).catch((error) => {
    res.json({
      reponse: false,
      error: "une erreur est survenue lors de \n l'affichage veuillez réessayer plutard!::" + error,
    });
  });
};

const AffichageCommentaire = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  sys.afficher_commentaire(Number(donnees.id_offre)).then((result) => {
    let client = new Utilisateur(donnees);
    res.json({
      reponse: true,
      id_pays: client.id_pays,
      telephone: client.telephone,
      commentaires: result,
      message: "affichage commentaires reussie"
    });
  }).catch((error) => {
    res.json({
      reponse: false,
      error: "une erreur est survenue lors de \n l'affichage veuillez réessayer plutard!::" + error,
    });
  });

};

const Commenter = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  let verification = sys.verification_donnees_commentaires(donnees);
  if (verification == true) {
    sys.verification_existance_offre(Number(donnees.id_offre)).then((result) => {
      let client = new Utilisateur(donnees);
      client.commenter(donnees).then((result1) => {

        sys.incremmentation_nombre_commentaire(Number(donnees.id_offre)).then((result2) => {
          res.json({
            reponse: true,
            id_pays: client.id_pays,
            telephone: client.telephone,
            resultat: result1,
            message: "Commentaire enregistre !"
          });
        }).catch((error2) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de l'opération !::" + error2,
          });
        });
      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de l'opération !::" + error,
        });
      });
    }).catch((error) => {
      res.json({
        reponse: false,
        error: error,
      });
    });
  }
  else {
    // on renvoie une erreur à l'app
    res.json({
      reponse: false,
      error: verification['error']
    });
  }
};

const LikePublication = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  let verification = sys.verification_donnees_likes(donnees);
  if (verification == true) {
    sys.verification_existance_offre(Number(donnees.id_offre)).then((result) => {
      let client = new Utilisateur(donnees);
      client.liker(donnees).then((result1) => {
        sys.incremmentation_nombre_like(Number(donnees.id_offre)).then((result2) => {
          res.json({
            reponse: true,
            id_pays: client.id_pays,
            telephone: client.telephone,
            resultat: result1,
            message: "Like enregistre !"
          });
        }).catch((error2) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de l'opération !::" + error2,
          });
        });


      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de l'opération !::" + error,
        });
      });
    }).catch((error) => {
      res.json({
        reponse: false,
        error: error,
      });
    });
  }
  else {
    // on renvoie une erreur à l'app
    res.json({
      reponse: false,
      error: verification['error']
    });
  }
};

const Postuler = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  let verification = sys.verification_donnees_postulats(donnees);
  if (verification == true) {
    sys.verification_existance_offre(Number(donnees.id_offre)).then((result) => {

      
      if(result[0]["MODE"] == "question"){
        if(donnees.reponses){
          donnees.reponses = donnees.reponses.split("*");
        }
        let confirmation = sys.verification_donnees_reponse(donnees);
        if(confirmation == true){
          let client = new Utilisateur(donnees);
          client.postuler(donnees).then((result1) => {
            sys.incremmentation_nombre_postulant(Number(donnees.id_offre)).then((result2) => {
              let inserer_reponses = (donnees,client,id_questions)=>{
                
                for(let elt in donnees.reponses){
                  client.getId_User().then((id)=>{
                    
                    client.repondre_questions(id[0]["ID_USER"],id_questions[elt]["ID_QUESTION"],donnees.reponses[elt]);
                  });
                }
              }

              sys.afficher_id_questions(donnees['id_offre']).then((id_questions)=> {
                inserer_reponses(donnees,client,id_questions)
                res.json({
                  reponse: true,
                  id_pays: client.id_pays,
                  telephone: client.telephone,
                  resultat: result1,
                  message: "Postulat enregistre !"
                });
              }).catch((error)=>{
                res.json({
                  reponse: false,
                  error: "une erreur est survenue lors de l'opération !::" + error,
                });
              })
            }).catch((error2) => {
              res.json({
                reponse: false,
                error: "une erreur est survenue lors de l'opération !::" + error2,
              });
            });
          }).catch((error) => {
            res.json({
              reponse: false,
              error: "une erreur est survenue lors de l'opération !::" + error,
            });
          });

        } else {
          sys.afficher_questions(donnees['id_offre']).then((liste_questions)=> {
            // on renvoie une erreur à l'app
            res.json({
              reponse: false,
              error: confirmation['error'],
              details: "Donnees de requete incomplete ! champs >reponses> manquant!  ",
              questions:liste_questions
            });

          }).catch((error)=>{
            res.json({
              reponse: false,
              error: "une erreur est survenue lors de l'opération !::" + error,
            });
          })
        }
      }else{
        let client = new Utilisateur(donnees);
        client.postuler(donnees).then((result1) => {
          sys.incremmentation_nombre_postulant(Number(donnees.id_offre)).then((result2) => {
            res.json({
              reponse: true,
              id_pays: client.id_pays,
              telephone: client.telephone,
              resultat: result1,
              message: "Postulat enregistre !"
            });
          }).catch((error2) => {
            res.json({
              reponse: false,
              error: "une erreur est survenue lors de l'opération !::" + error2,
            });
          });


        }).catch((error) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de l'opération !::" + error,
          });
        });
      }

    }).catch((error) => {
      res.json({
        reponse: false,
        error: error,
      });
    });
  }
  else {
    // on renvoie une erreur à l'app
    res.json({
      reponse: false,
      error: verification['error']
    });
  }
};

const AffichagePostulat = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  sys.verification_droit_acces_postulant(donnees).then((reponse) => {
    if (reponse == true) {
      // aucun manquement ou erreur et droit d'accès accordé
      sys.afficher_postulat(donnees['id_offre']).then((liste_postulants) => {
        res.json({
          reponse: true,
          postulants: liste_postulants,
          message: "recuperation des potulants reussie! "
        });
      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de l'opération !::" + error,
        });
      });
    } else {
      // droit d'accès refusé

      res.json({
        reponse: false,
        error: "Acces non autorise !! Vous ne pouvez pas acceder a cette ressource"
      });
    }
  }).catch((error) => {
    // erreur ou manquement
    let rep;
    try {
      rep = error['error'];
    } catch (e) {
      rep = error;
    }
    res.json({
      reponse: false,
      error: rep
    });
  });


};

const Suivre = (req, res, next) => {
  // script permettant de s'abonner à une utilisateur autre que soit mm
  let donnees = req.body;
  let sys = new Systeme();
  let reponse = sys.verification_donnees_abonnement(donnees);
  if (reponse == true) {

    let user = new Utilisateur(donnees);
    user.getId_User().then((id) => {
      if (donnees['id_user'] != id[0]['ID_USER']) {
        // ici id_user represente l'id de l'utilisateur auquel
        //on souhaite s'abonner
        user.suivre(Number(donnees['id_user'])).then((abonne) => {
          if (abonne) {
            // on le desabonne
            sys.desabonner_utilisateur(donnees).then((resultat) => {
              res.json({
                reponse: true,
                message: "Desabonnement effectue! "
              });
            }).catch((error) => {
              res.json({
                reponse: false,
                error: "une erreur est survenue lors de l'opération !::" + error,
              });
            });

          } else {
            // on l'abonne
            sys.abonner_utilisateur(donnees).then((resultat) => {
              res.json({
                reponse: true,
                message: "abonnement effectue! "
              });
            }).catch((error) => {
              res.json({
                reponse: false,
                error: "une erreur est survenue lors de l'opération !::" + error,
              });
            });
          }

        }).catch((error) => {
          res.json({
            reponse: false,
            error: "une erreur est survenue lors de l'opération !::" + error,
          });
        });
      } else {
        res.json({
          reponse: true,
          error: "operation reussie!",
        });
      }
    }).catch((error) => {
      res.json({
        reponse: false,
        error: "une erreur est survenue lors de l'opération !::" + error,
      });
    });

  } else {
    res.json({
      reponse: false,
      error: reponse['error']
    });
  }
};

const Abonnement = (req, res, next) => {
  // script permettant de s'abonner à une utilisateur
  let donnees = req.body;
  let sys = new Systeme();
  let reponse = sys.verification_donnees_lister_abonnement(donnees)
  if (reponse == true) {
    let user = new Utilisateur(donnees);

    user.getId_User().then((id_user) => {
      sys.lister_abonnement(id_user[0]['ID_USER']).then((liste_abonnements) => {
        res.json({
          reponse: true,
          liste_abonnements: liste_abonnements,
          message: "Liste des abonnements recuperee! "
        });
      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de l'opération !::" + error,
        });
      });
    }).catch((error) => {
      res.json({
        reponse: false,
        error: "une erreur est survenue lors de l'opération !::" + error,
      });
    });

  } else {
    res.json({
      reponse: false,
      error: reponse['error']
    });
  }



};

const AffichageProfil = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  let reponse = sys.verification_donnees_lister_abonnement(donnees)
  if (reponse == true) {
    let user = new Utilisateur(donnees);

    user.getId_User().then((id_user) => {
      sys.afficher_profil(id_user[0]['ID_USER']).then((profil) => {
        res.json({
          reponse: true,
          profil: profil,
          message: "Profil recupere! "
        });
      }).catch((error) => {
        res.json({
          reponse: false,
          error: "une erreur est survenue lors de l'opération !::" + error,
        });
      });
    }).catch((error) => {
      res.json({
        reponse: false,
        error: "une erreur est survenue lors de l'opération !::" + error,
      });
    });

  } else {
    res.json({
      reponse: false,
      error: reponse['error']
    });
  }
};

const ModificationProfil = (req, res, next) => {
  let donnees = req.body;
  let sys = new Systeme();
  let statut_verif = sys.verification_donnees_profil(donnees);
  if (statut_verif == true) {
    // si les donnees sont valides et création d'un potentiel user
    let client = new Utilisateur(donnees);

    client.modificationProfil(donnees).then((result) => {
      res.json({
        reponse: true,
        id_pays: client.id_pays,
        telephone: client.telephone,
        message: "Profil mis a jour! "
      });

    }).catch((error) => {
      res.json({
        reponse: false,
        error: "une erreur est survenue lors de \n la mise a jour du profil veuillez réessayer plutard!::" + error,
      });
    });

  } else {
    res.json({
      reponse: false,
      error: statut_verif['error']
    });
  }
};


module.exports = {
  connexion: Connexion,
  inscription: Inscription,
  publicationOffre: PublicationOffre,
  affichageOffre: AffichageOffre,
  affichageCommentaire: AffichageCommentaire,
  commenter: Commenter,
  likePublication: LikePublication,
  postuler: Postuler,
  affichagePostulat: AffichagePostulat,
  suivre: Suivre,
  abonnement: Abonnement,
  affichageProfil: AffichageProfil,
  modificationProfil: ModificationProfil
}