/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const axios = require('axios');

// Make sure to run `npm install axios` in the functions directory

exports.addEmailToAirtable = functions.https.onRequest(async (request, response) => {
    const {email, timestamp} = request.body;

    const config = {
        method: 'post',
        url: `https://api.airtable.com/v0/${functions.config().airtable.base}/tbl3Mm0Exzo8eUkPg"`,
        headers: { 
            'Authorization': `Bearer ${functions.config().airtable.key}`,
            'Content-Type': 'application/json'
        },
        data: {
            fields: {
                Email: email,
                Timestamp: timestamp,
            }
        }
    };

    try {
        const res = await axios(config);
        response.send({data: res.data});
    } catch (error) {
        console.error("Error adding to Airtable:", error);
        response.status(500).send({error: "Failed to add to Airtable."});
    }
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
