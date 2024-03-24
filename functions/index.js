const functions = require("firebase-functions");
const cors = require("cors");
const axios = require("axios");

// Initialize CORS middleware with broader options if needed
const corsHandler = cors({ origin: true });

exports.addEmailToAirtable = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    // Explicitly set CORS headers here
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST');

    console.log("Request received:", request.body);
    console.log("Method received:", request.method);

    if (request.method === "POST") {
      const { email, timestamp } = request.body;

      // Define the Axios request config
      const config = {
        method: "POST",
        url: `https://api.airtable.com/v0/${functions.config().airtable.base}/tbl3Mm0Exzo8eUkPg`,
        headers: {
          Authorization: `Bearer ${functions.config().airtable.key}`,
          "Content-Type": "application/json",
        },
        data: {
          fields: {
            Email: email,
            Timestamp: timestamp,
          },
        },
      };

      // Attempt to send data to Airtable
      axios(config)
        .then((res) => {
          // Ensure these headers are included in the success response as well
          response.status(200).send({ data: res.data });
        })
        .catch((error) => {
          console.error("Error adding to Airtable:", error);
          // Ensure these headers are included if there's an error response
          response.status(500).send({ error: "Failed to add to Airtable." });
        });
    } else if (request.method === "OPTIONS") {
      // OPTIONS requests are automatically handled by Firebase; no need for explicit handling
      response.status(204).send("");
    } else {
      console.log("Invalid request method:", request.method);
      response.status(405).send("Method Not Allowed");
    }
  });
});
