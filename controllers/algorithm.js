let admin = require('firebase-admin');
let generateSplit = require('../algorithm/generate-split');

exports.generateSplit = function(req, res) {
  let db = admin.database();
  let uid = req.uid;

  console.log(uid);

  db.ref(`/userParameters/${uid}`).once('value', (snap) => {
    let userParameters = snap.val();
    console.log(userParameters);

    db.ref(`/preferredMuscles/${uid}`).once('value', (snap) => {
      let preferredMuscles = snap.val();


      console.log(userParameters);
      console.log(preferredMuscles);
      let split = generateSplit(userParameters, preferredMuscles);
      console.log(split);
      if (!split) {
        res.status(400).send({ok: false, error: 'IMPOSSIBLE'});
      } else {


        db.ref(`/split/${uid}`).set(split)
          .then(() => {
            console.log('split done');
            res.status(200).send({ok: true})
          })
          .catch((err) => {
            res.status(400).send({ok: false, error: 'FIREBASE_ERROR'});
          });


      }

    });
  });
};




