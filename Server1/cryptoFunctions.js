'use strict';
const crypto = require('crypto');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.USER1_PUBLIC_KEY;

const generateKeyPair = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
};

const encryptMessage = (message, publicKey) => {
  try {
    // Ensure message is a string
    if (typeof message !== 'string') {
      throw new Error('Message must be a string');
    }
    const bufferMessage = Buffer.from(message, 'utf-8');
    const encrypted = crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    }, bufferMessage);

    return encrypted.toString('base64');
  } catch (error) {
    console.error('Error encrypting message:', error.message);
    return null;
  }
};

const signMessage = (data, privateKey) => {
  try {
    if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
      throw new Error('Data must be a string or a buffer');
    }
    const signer = crypto.createSign('sha256');
    signer.update(data);
    const signature = signer.sign(privateKey, 'base64');
    return signature;
  } catch (error) {
    console.error('Error signing message:', error.message);
    return null;
  }
};

const decryptMessage = (encryptedMessage, privateKey) => {
  try {
    const bufferEncryptedMessage = Buffer.from(encryptedMessage, 'base64');
    const decrypted = crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    }, bufferEncryptedMessage);
    return decrypted.toString('utf-8');
  } catch (error) {
    console.error('Error decrypting message:', error.message);
    throw error;
  }
};

const createSignature = (data, privateKey) => {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(data);
  return signer.sign(privateKey, 'base64');
};

const verifySignature = (data, signature, publicKey) => {
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(data);
  return verifier.verify(publicKey, signature, 'base64');
};

module.exports = {
  generateKeyPair,
  encryptMessage,
  decryptMessage,
  createSignature,
  verifySignature,
  signMessage
};


