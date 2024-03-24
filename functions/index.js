const functions = require("firebase-functions");
const cors = require("cors")({ origin: true }); // Automatically allow cross-origin requests
const axios = require("axios");

exports.addEmailToAirtable = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    // Explicitly handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      // Preflight handling. Browsers send an OPTIONS request to check what HTTP methods are allowed by the server.
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "POST");
      response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.set("Access-Control-Max-Age", "3600"); // Cache preflight response for 60 minutes
      response.status(204).send('');
      return;
    }

    // Handle POST requests
    if (request.method === "POST") {
      const { email, timestamp } = request.body;

      const config = {
        method: "post",
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

      try {
        const res = await axios(config);
        response.send({ data: res.data });
      } catch (error) {
        console.error("Error adding to Airtable:", error);
        response.status(500).send({ error: "Failed to add to Airtable." });
      }
    } else {
      // Respond to non-POST requests with a method not allowed status
      response.status(405).send("Method Not Allowed");
    }
  });
});
