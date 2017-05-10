let admin = require('firebase-admin');

let database = null;

const init = function init() {
  database = admin.database();
};

async function watch(path, callback) {
  const ref = database.ref(path);
  ref.on('value', callback);
  return ref;
}

async function get(path) {
  return new Promise((resolve, reject) => {
    database.ref(path).once('value', (snapshot) => {
      const data = snapshot.val();
      return resolve(data);
    }, (err) => {
      return reject(err);
    });
  });
}

async function save(path, data) {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(JSON.stringify(data));
    database.ref(path).set(parsedData)
      .then((success) => {
        return resolve(success);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  })
}

module.exports = {init, get, save, watch};