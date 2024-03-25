const functions = require('firebase-functions');
const cors = require('cors')({
  origin: 'https://www.askvinny.co.uk'
});

exports.addEmailToAirtable = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set('Access-Control-Allow-Origin', 'https://www.askvinny.co.uk');
    // Your function logic here
    response.send("Hello from Firebase!");
  });
});