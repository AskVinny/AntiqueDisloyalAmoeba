const { onRequest } = require("firebase-functions/v2/https");

exports.addEmailToAirtable = onRequest(
  { cors: true },
  (req, res) => {
  res.status(200).send({ message: "Hello world!" });
  }
);