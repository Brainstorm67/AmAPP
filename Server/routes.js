const express = require('express');

// Get the router
const router = express.Router();
const User = require ('./models/user.js');
const controllers = require('./controllers');
const auth = require('./auth');
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Welcome message for a GET at http://localhost:8080/restapi
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to AmAPP Server' });
});

router.route('/users').get (function (req,res) {
  Users.find(function(err, users){
    if (err)
      res.send (err);
    res.json(users);
  });
});

router.route('/users').post (function (req,res) {
  var user           	= new User();
  user.firstname	= req.body.user.firstname;
  user.lastname      = req.body.user.lastname;
  user.birthdate        	= req.body.user.birthdate;
  user.email       = req.body.user.email;
  user.adresse        	= req.body.user.adresse;
  user.login        	= req.body.user.login;
  user.password       	= req.body.user.password;
  user.voiture       	= req.body.user.voiture;

  user.save(function(err) {
    if (err)
      res.send (err);
    res.json ({message: 'Nouvelle user cree avec success'});
  });
});

router.route('/users/:user_id').get(function(req,res){
    Users.findById(req.params.user_id, function (err, user){
      if (err)
        res.send(err);
      res.json(user);
    });
});

/* router.route('/user_user').get(function(req,res){
    User.find({person: req.query.person}).exec(function(err, locations){
                  if (err)
                    res.status(500).send(err);
                  res.status(200).json(locations);
                });
});

router.route('/proches').get(function(req,res){
    var limit       = req.query.limit || 10;
    var maxDistance = req.query.distance || 8;
    maxDistance /= 6371;
    var coords = [];
    coords[0] = req.query.lat;
    coords[1] = req.query.lon;
    User.find({ location: {
                 $near: coords,
                 $maxDistance: maxDistance
                      }
                }).limit(limit).exec(function(err, locations){
                  if (err)
                    res.status(500).send(err);
                  res.status(200).json(locations);
                });
});

router.route('/users/:user_id').put(function(req,res){
  User.findById(req.params.user_id, function (err, user){
      if (err)
        res.send(err);
      user.adresseResume	= req.body.user.adresseResume;
	  user.complement      = req.body.user.complement;
	  user.nom_rue        	= req.body.user.nom_rue;
	  user.nom_ville       = req.body.user.nom_ville;
	  user.numS        	= req.body.user.numS;
	  user.numA        	= req.body.user.numA;
	  user.ouverte       	= req.body.user.ouverte;
      user.location      = [req.body.user.latitude, req.body.user.longitude];
	  user.person			=req.body.user.person;
      user.save(function (err){
        if (err)
          res.send(err);
        res.json ({message: 'User mise a jour avec succes'});
      });
  });
}); */

router.route('/users/:user_id').delete(function(req,res){
  User.remove({_id:req.params.user_id}, function(err, user){
    if (err)
      res.send(err);
    res.json({message: 'user supprime avec succes'});
  });
});

router.get('/connexion/', controllers.associateDevice);
router.get('/connexion/aller', auth.connect);
router.get('/connexion/retour', auth.oauthCallback);


router.get('/deconnexion/', auth.disconnect);

router.get('/verifier', auth.verify);

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
