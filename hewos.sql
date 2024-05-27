-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 28 août 2023 à 16:42
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hewos`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnement`
--

DROP TABLE IF EXISTS `abonnement`;
CREATE TABLE IF NOT EXISTS `abonnement` (
  `ID_ABONNEMENT` bigint(255) NOT NULL,
  `ID_USER` bigint(6) NOT NULL,
  `ID_USER_ASSO_14` bigint(6) NOT NULL,
  `DATE_ABONNEMENT` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_ABONNEMENT`),
  KEY `FK_ABONNEMENT_USER` (`ID_USER`),
  KEY `FK_ABONNEMENT_USER1` (`ID_USER_ASSO_14`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `abonnement`
--

INSERT INTO `abonnement` (`ID_ABONNEMENT`, `ID_USER`, `ID_USER_ASSO_14`, `DATE_ABONNEMENT`) VALUES
(0, 18, 17, '2023-08-23 16:11:04');

-- --------------------------------------------------------

--
-- Structure de la table `asso_7`
--

DROP TABLE IF EXISTS `asso_7`;
CREATE TABLE IF NOT EXISTS `asso_7` (
  `ID_USER` bigint(6) NOT NULL,
  `ID_BADGE` bigint(255) NOT NULL,
  PRIMARY KEY (`ID_USER`,`ID_BADGE`),
  KEY `FK_ASSO_7_BADGE` (`ID_BADGE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `badge`
--

DROP TABLE IF EXISTS `badge`;
CREATE TABLE IF NOT EXISTS `badge` (
  `LOGO` mediumtext,
  `DESIGNATION` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `ID_BADGE` bigint(255) NOT NULL,
  PRIMARY KEY (`ID_BADGE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `ID_COMMENTAIRE` bigint(4) NOT NULL AUTO_INCREMENT,
  `ID_USER` bigint(6) NOT NULL,
  `ID_OFFRE` bigint(255) NOT NULL,
  `AVIS` varchar(255) DEFAULT NULL,
  `DATE_COMMENTAIRE` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_COMMENTAIRE`),
  KEY `FK_COMMENTAIRE_USER` (`ID_USER`),
  KEY `FK_COMMENTAIRE_OFFRE` (`ID_OFFRE`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`ID_COMMENTAIRE`, `ID_USER`, `ID_OFFRE`, `AVIS`, `DATE_COMMENTAIRE`) VALUES
(1, 18, 1, 'J\'aime bien cette initiave . je serais au rdv', '2023-06-24 00:00:00'),
(2, 17, 1, 'j\'aime beaucoup l\'initiative .courage!', '2023-07-02 06:40:11'),
(4, 17, 1, 'merci', '2023-07-02 06:54:30'),
(5, 17, 2, 'merci beaucoup', '2023-07-02 06:55:24'),
(6, 18, 2, 'vraimen géniale', '2023-08-24 15:26:02'),
(7, 18, 2, 'génie grand', '2023-08-24 15:27:26'),
(8, 18, 2, 'encore merci pour loffre', '2023-08-24 15:29:09'),
(9, 18, 2, 'encore merci ', '2023-08-24 15:30:07'),
(10, 18, 2, 'cest nul', '2023-08-24 15:31:40'),
(11, 18, 2, 'cest nulloo', '2023-08-24 15:33:08'),
(12, 18, 5, 'cest nulloo', '2023-08-24 15:35:53'),
(13, 18, 5, 'c bon', '2023-08-24 15:38:30'),
(14, 18, 5, 'c bon aaaa', '2023-08-24 15:38:56');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `ID_LIKE` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_USER` bigint(20) NOT NULL,
  `ID_OFFRE` bigint(20) NOT NULL,
  `DATE_LIKE` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_LIKE`),
  KEY `FK_LIKES_USER` (`ID_USER`),
  KEY `FK_LIKES_OFFRE` (`ID_OFFRE`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`ID_LIKE`, `ID_USER`, `ID_OFFRE`, `DATE_LIKE`) VALUES
(2, 17, 1, '2023-07-02 10:42:36');

-- --------------------------------------------------------

--
-- Structure de la table `marche_humaine`
--

DROP TABLE IF EXISTS `marche_humaine`;
CREATE TABLE IF NOT EXISTS `marche_humaine` (
  `ID_USER` bigint(6) NOT NULL,
  `NOMBRE_BADGE` bigint(4) DEFAULT NULL,
  `BADGE` varchar(255) DEFAULT NULL,
  `ID_MH` bigint(4) NOT NULL,
  PRIMARY KEY (`ID_MH`),
  KEY `FK_MARCHE_HUMAINE_USER` (`ID_USER`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `marche_liberale`
--

DROP TABLE IF EXISTS `marche_liberale`;
CREATE TABLE IF NOT EXISTS `marche_liberale` (
  `ID_USER` bigint(6) NOT NULL,
  `OFFRES` varchar(255) DEFAULT NULL,
  `ID_ML` bigint(4) NOT NULL,
  PRIMARY KEY (`ID_ML`),
  KEY `FK_MARCHE_LIBERALE_USER` (`ID_USER`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `marche_societale`
--

DROP TABLE IF EXISTS `marche_societale`;
CREATE TABLE IF NOT EXISTS `marche_societale` (
  `ID_USER` bigint(6) NOT NULL,
  `TYPE` char(32) DEFAULT NULL,
  `ID_MS` bigint(4) NOT NULL,
  PRIMARY KEY (`ID_MS`),
  KEY `FK_MARCHE_SOCIETALE_USER` (`ID_USER`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `marche_visionnaire`
--

DROP TABLE IF EXISTS `marche_visionnaire`;
CREATE TABLE IF NOT EXISTS `marche_visionnaire` (
  `ID_USER` bigint(6) NOT NULL,
  `ASPIRATION` varchar(255) DEFAULT NULL,
  `DOMAINE` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `TEMPS_REALISATION` bigint(255) DEFAULT NULL,
  `ENJEUX` varchar(255) DEFAULT NULL,
  `ATOUTS` varchar(255) DEFAULT NULL,
  `DIFFICULTES` varchar(255) DEFAULT NULL,
  `BESOINS` varchar(255) DEFAULT NULL,
  `ID_MV` bigint(9) NOT NULL,
  PRIMARY KEY (`ID_MV`),
  KEY `FK_MARCHE_VISIONNAIRE_USER` (`ID_USER`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `ID_NOTIFICATION` bigint(4) NOT NULL,
  `DATE_RECEPTION` datetime DEFAULT NULL,
  `OBJET` varchar(255) DEFAULT NULL,
  `MESSAGE` varchar(255) DEFAULT NULL,
  `ILLUSTRATION` mediumtext,
  `ID_USER` bigint(4) DEFAULT NULL,
  PRIMARY KEY (`ID_NOTIFICATION`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `offre`
--

DROP TABLE IF EXISTS `offre`;
CREATE TABLE IF NOT EXISTS `offre` (
  `ID_USER` bigint(6) NOT NULL,
  `PREFIXE` varchar(255) DEFAULT NULL,
  `INTITULE` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `MODE` varchar(255) DEFAULT NULL,
  `DATE_PUBLICATION` datetime DEFAULT CURRENT_TIMESTAMP,
  `DELAI` datetime DEFAULT NULL,
  `STATUT_OFFRE` varchar(255) DEFAULT NULL,
  `DATE_ACQUISITION` datetime DEFAULT NULL,
  `ID_OFFRE` bigint(255) NOT NULL AUTO_INCREMENT,
  `COMMENTAIRES` bigint(255) DEFAULT NULL,
  `LIKES` bigint(99) DEFAULT NULL,
  `POSTULANTS` bigint(255) DEFAULT NULL,
  `ID_POSTULANT` bigint(20) DEFAULT NULL,
  `PHOTO_POST` varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
  PRIMARY KEY (`ID_OFFRE`),
  KEY `FK_OFFRE_USER` (`ID_USER`),
  KEY `FK_OFFRE_POSTULAT` (`ID_POSTULANT`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `offre`
--

INSERT INTO `offre` (`ID_USER`, `PREFIXE`, `INTITULE`, `DESCRIPTION`, `MODE`, `DATE_PUBLICATION`, `DELAI`, `STATUT_OFFRE`, `DATE_ACQUISITION`, `ID_OFFRE`, `COMMENTAIRES`, `LIKES`, `POSTULANTS`, `ID_POSTULANT`, `PHOTO_POST`) VALUES
(17, 'tchoko Formation', 'formation gratuite en marketing digital', 'Bonjour à tous nous sommes la Knowledge Academy et nous vous annoncons notre formation gratuite en marketing digital pour les dix premiers inscrits à celle-ci . Alors dépéchez vous de nous rejoindre !', 'selection', '2023-06-24 06:52:53', '2023-06-30 00:00:00', NULL, NULL, 1, 3, 1, 2, NULL, NULL),
(17, 'tchoko local', '2 mois gratuit de location', 'venez travaillez dans nos locaux pour deux mois gratuits', 'selection', '2023-06-30 16:06:33', '2023-07-30 00:00:00', NULL, NULL, 2, 7, 0, 0, NULL, NULL),
(17, 'donation', 'fond de commerce', 'offre de financement', 'selection', '2023-07-31 11:02:55', '2023-08-30 00:00:00', NULL, NULL, 5, 3, 0, 0, NULL, 'photo_1690797775609_afiry2.png'),
(18, 'donation', 'terre agricole', 'offre d\'une location gratuite d\'un terrain', 'selection', '2023-08-24 16:20:38', '2023-09-30 00:00:00', NULL, NULL, 6, 0, 0, 0, NULL, 'photo_1692890437928_afiry2.png'),
(18, 'donation', 'terre agricole', 'offre d\'une location gratuite d\'un terrain', 'question', '2023-08-24 17:39:39', '2023-09-30 00:00:00', NULL, NULL, 9, 0, 0, 1, NULL, 'photo_1692895179146_afiry2.png');

-- --------------------------------------------------------

--
-- Structure de la table `postulat`
--

DROP TABLE IF EXISTS `postulat`;
CREATE TABLE IF NOT EXISTS `postulat` (
  `ID_USER` bigint(6) NOT NULL,
  `ID_OFFRE` bigint(255) DEFAULT NULL,
  `DATE_POSTULAT` datetime DEFAULT CURRENT_TIMESTAMP,
  `ID_POSTULAT` bigint(4) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID_POSTULAT`),
  KEY `FK_POSTULAT_USER` (`ID_USER`),
  KEY `FK_POSTULAT_OFFRE` (`ID_OFFRE`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `postulat`
--

INSERT INTO `postulat` (`ID_USER`, `ID_OFFRE`, `DATE_POSTULAT`, `ID_POSTULAT`) VALUES
(17, 1, '2023-07-02 12:08:13', 1),
(18, 1, '2023-08-25 18:34:10', 2),
(18, 9, '2023-08-25 20:05:41', 15);

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `ID_QUESTION` bigint(4) NOT NULL AUTO_INCREMENT,
  `ID_OFFRE` bigint(255) NOT NULL,
  `LIBELLE` varchar(255) DEFAULT NULL,
  `REPONSES` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_QUESTION`),
  KEY `FK_QUESTION_OFFRE` (`ID_OFFRE`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`ID_QUESTION`, `ID_OFFRE`, `LIBELLE`, `REPONSES`) VALUES
(2, 9, 'votre nom?', NULL),
(3, 9, 'votre prenom?', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `reponse_question`
--

DROP TABLE IF EXISTS `reponse_question`;
CREATE TABLE IF NOT EXISTS `reponse_question` (
  `ID_REPONSE` bigint(4) NOT NULL AUTO_INCREMENT,
  `ID_USER` bigint(6) NOT NULL,
  `ID_QUESTION` bigint(4) NOT NULL,
  `PROPOSITION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_REPONSE`),
  KEY `FK_REPONSE_QUESTION_USER` (`ID_USER`),
  KEY `FK_REPONSE_QUESTION_QUESTION` (`ID_QUESTION`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `reponse_question`
--

INSERT INTO `reponse_question` (`ID_REPONSE`, `ID_USER`, `ID_QUESTION`, `PROPOSITION`) VALUES
(2, 18, 2, 'tchuente'),
(3, 18, 3, 'joslin');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `NOM` varchar(255) DEFAULT NULL,
  `PRENOM` varchar(255) DEFAULT NULL,
  `TELEPHONE` varchar(255) DEFAULT NULL,
  `STATUT` char(255) DEFAULT NULL,
  `ID_PAYS` smallint(6) DEFAULT NULL,
  `MOT_PASSE` varchar(255) DEFAULT NULL,
  `PHOTO` varchar(9999) CHARACTER SET utf8mb4  DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `ID_USER` bigint(6) NOT NULL AUTO_INCREMENT,
  `MONNAIE` varchar(255) DEFAULT NULL,
  `PROFESSION` varchar(255) DEFAULT NULL,
  `DATE_NAISSANCE` date DEFAULT NULL,
  `VILLE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_USER`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`NOM`, `PRENOM`, `TELEPHONE`, `STATUT`, `ID_PAYS`, `MOT_PASSE`, `PHOTO`, `EMAIL`, `ID_USER`, `MONNAIE`, `PROFESSION`, `DATE_NAISSANCE`, `VILLE`) VALUES
('Tchuente', 'Burelle', '657745081', '/', 237, '$2b$10$k4knJYNCZYn6TtRfM3.JHOliQkewkLFIEpErK.ypevOJyGLdzbNMi', 'photo_1692808333249_hewosicon.png', 'joslintchuentep@gmail.com', 17, 'XAF', 'developpeur', '2001-12-01', 'Douala'),
('Fanken', 'Burelle', '657745082', '/', 237, '$2b$10$WLXzOTXvcanG79OQ6KXJd.1gPsGBXkSzWunwRrKOpN1Vhi5pYyGJW', 'photo_1692808574312_afiry2.png', 'fonkenburelle@gmail.com', 18, 'XAF', 'developpeur', '2004-12-01', 'Bafoussam');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
