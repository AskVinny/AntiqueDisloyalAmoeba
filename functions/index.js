const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const { defineString } = require('firebase-functions/params');


const airtableTable = defineString('AIRTABLE_TABLE_KEY');
const airtableBase = defineString('AIRTABLE_BASE_KEY');
const airtableSecret = defineString('AIRTABLE_API_KEY');


exports.addEmailToAirtable = onRequest(
  { cors: { origin: true, methods: ["POST"] } }, // Enable CORS for POST requests
  (req, res) => {
    // Proceed only if it's a POST request; otherwise, end the request
    if (req.method !== "POST") {
      res.status(405).send({ error: "Method Not Allowed" });
      return;
    }

    // Extract email and timestamp from the request body
    const { email, timestamp } = req.body;

    // Define the Axios request config for Airtable API
    const config = {
      method: "post",
      url: `https://api.airtable.com/v0/${
        airtableBase.value()
      }/${airtableTable.value()}`,
      headers: {
        Authorization: `Bearer ${airtableSecret.value()}`,
        "Content-Type": "application/json",
      },
      data: {
        fields: {
          Email: email,
          Timestamp: timestamp,
        },
      },
    };
    // Attempt to send data to Airtable using Axios
    axios(config)
      .then((airtableResponse) => {
        res.status(200).send({ data: airtableResponse.data });
      })
      .catch((error) => {
        console.error("Error adding to Airtable:", error);
        res.status(500).send({ error: "Failed to add to Airtable." });
      });
  },
);

// Function to hide an image on mobile devices
function hideImageOnMobile() {
  var image = document.getElementById('heroImage'); // Replace 'yourImageId' with your image's ID
  if (window.innerWidth <= 768) { // 768px is a common breakpoint for mobile devices
    image.style.visibility = 'hidden'; // Hides the image on mobile devices
  } else {
    image.style.visibility = 'visible'; // Makes sure the image is visible on larger devices
  }
}

// Call the function on initial load
hideImageOnMobile();

// Optionally, call the function on window resize to handle dynamic changes
window.addEventListener('resize', hideImageOnMobile);