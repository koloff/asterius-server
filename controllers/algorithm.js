let admin = require('firebase-admin');
let generateSplit = require('../algorithm/generate-split');

exports.generateExercises = function(req, res) {
  let db = admin.database();
  let uid = req.uid;


  db.ref(`userParameters/${uid}`).once('value', (snap) => {
    let userParameters = snap.val();

    db.ref(`/preferredMuscles/${uid}`).once('value', (snap) => {
      let preferredMuscles = snap.val();

      let selected = []; // todo

      db.ref(`/selectedExercises/${uid}`).set(selected)
        .then(() => {
          res.status(200).end();
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        })
    });
  });
};

exports.generateSplit = function(req, res) {
  let db = admin.database();
  let uid = req.uid;


  db.ref(`selectedExercises/${uid}`).once('value', (snap) => {
    let selectedExercises = snap.val();
    console.log(selectedExercises);

    res.status(200).send({ok: true});
  });
};




