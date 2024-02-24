"use strict";
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cryptoFunctions = require('./cryptoFunctions');
const jwt=require("jsonwebtoken");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname,"./.env"),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { verifySignature, signMessage, encryptMessage, decryptMessage } = require('./cryptoFunctions');

const port = process.env.PORT 

const checkJwtToken = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  const token = req.headers.authorization;
  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    // Token is valid, add decoded payload to the request object
    req.decoded = decoded;
    next();
  });
};
app.post('/verify-request',checkJwtToken, async (req, res) => {
  try {
    const { encryptedData, signature } = req.body;

    // Verify the signature using User 1's public key
    const isVerified = verifySignature(encryptedData.toString('base64'), signature, process.env.USER1_PUBLIC_KEY);

    if (isVerified) {
      // Decrypt the encrypted request data
      let decryptedData = decryptMessage(encryptedData, process.env.PRIVATE_KEY_2);
      decryptedData = JSON.parse(decryptedData)
      // Process the decrypted data (example: add new field)
      decryptedData.newField = 'hello';

      // Encrypt the processed data with User 1's public key
      const encryptedResponse = encryptMessage(JSON.stringify(decryptedData), process.env.USER1_PUBLIC_KEY);

      // Sign the encrypted response with User 2's private key
      const responseSignature = signMessage(encryptedResponse.toString('base64'), process.env.PRIVATE_KEY_2);

      // Send the response back to User 1
      res.json({ success: true, encryptedResponse, responseSignature });
    } else {
      // Signature verification failed
      res.status(400).json({ error: 'Signature verification failed' });
    }
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});

