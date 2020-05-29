const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('./src/app');
var serviceAccount = require("./gloriaschoollmspremission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gloriaschoollms.firebaseio.com"
});
const db = admin.firestore();

// Rest API
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

// create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection('items').doc('/' + req.body.id + '/')
              .create({item: req.body.item});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });


exports.app = functions.https.onRequest(app);