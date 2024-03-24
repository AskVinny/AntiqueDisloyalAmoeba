const functions = require("firebase-functions");
const cors = require("cors")({ origin: true }); // Automatically allow cross-origin requests
const axios = require("axios");

// Initialize CORS middleware
const corsHandler = cors;

exports.addEmailToAirtable = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    // Wrap the request in the CORS middleware
    // Ensure the request method is POST
    if (request.method !== "POST") {
      return response.status(405).end("Method Not Allowed");
    }

    const { email, timestamp } = request.body;

    // Note: Ensure there's no extra quotation mark at the end of the URL
    const config = {
      method: "post",
      url: `https://api.airtable.com/v0/${
        functions.config().airtable.base
      }/tbl3Mm0Exzo8eUkPg`, // Corrected URL
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
  });
});
