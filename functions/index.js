const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

exports.addEmailToAirtable = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // Your function logic here
    response.send("Hello from Firebase!");
  });
});