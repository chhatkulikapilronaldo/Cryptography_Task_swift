"use strict";
const express = require("express");
const app = express();
const mysqlHelper = require("./common/mysqlHelper");
const bodyParser = require('body-parser');
app.use(express.json());
const mainroute = require("./routes/route")
const cryptoFunctions = require('./cryptoFunctions');
const axios = require("axios");
const jwt=require("jsonwebtoken");
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname,"./.env"),
});
app.use("/",mainroute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { signMessage, verifySignature, encryptMessage, decryptMessage } = require('./cryptoFunctions');

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

app.post('/send-request', checkJwtToken,async (req, res) => {
  try {
    const requestData = req.body;
    // Encrypt the request data with User 2's public key
    const encryptedData = encryptMessage(JSON.stringify(requestData), process.env.USER2_PUBLIC_KEY);
    // Sign the encrypted request with User 1's private key
    const signature = signMessage(encryptedData, process.env.USER1_PRIVATE_KEY);
    const response = await axios.post('http://localhost:9000/verify-request', { encryptedData, signature });
    let data = response.data

    const isVerified = verifySignature(data.encryptedResponse.toString('base64'), data.responseSignature, process.env.USER2_PUBLIC_KEY);
    if(isVerified) {
      let decryptedData = decryptMessage(data.encryptedResponse, process.env.USER1_PRIVATE_KEY);
      decryptedData = JSON.parse(decryptedData)
      return res.send(decryptedData)
    }
    return res.json({failed: true, message: "failed"});  
  } catch (error) {
    console.error('Error sending request:', error.message);
    res.status(500).json({ error: error.message }); // Return specific error message in response
  }
});

app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});

