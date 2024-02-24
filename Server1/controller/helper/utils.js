// const crypto = require('crypto');

// function generateKeyPair() {
//   return crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: { type: 'spki', format: 'pem' },
//     privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
//   });
// }

// function encryptMessage(message, publicKey) {
//   return crypto.publicEncrypt(
//     { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
//     Buffer.from(message, 'utf-8')
//   );
// }

// function decryptMessage(encryptedMessage, privateKey) {
//   return crypto.privateDecrypt(
//     { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
//     encryptedMessage
//   );
// }

// function createSignature(message, privateKey) {
//   const signature = crypto.sign('sha256', Buffer.from(message), { key: privateKey });
//   return signature.toString('base64');
// }

// function verifySignature(message, signature, publicKey) {
//   return crypto.verify(
//     'sha256',
//     Buffer.from(message),
//     { key: publicKey },
//     Buffer.from(signature, 'base64')
//   );
// }

// module.exports = { generateKeyPair, encryptMessage, decryptMessage, createSignature, verifySignature }

// // User1
// const user1KeyPair = generateKeyPair();
// const user1PublicKey = user1KeyPair.publicKey;
// const user1PrivateKey = user1KeyPair.privateKey;

// // User2
// const user2KeyPair = generateKeyPair();
// const user2PublicKey = user2KeyPair.publicKey;
// const user2PrivateKey = user2KeyPair.privateKey;

// // Step 1: User1 encrypts a message with User2's public key
// const messageToEncrypt = 'Hello, User2!';
// const encryptedMessage = encryptMessage(messageToEncrypt, user2PublicKey);
// console.log('\nEncrypted Message:\n', encryptedMessage.toString('base64'));

// // Step 2: User2 decrypts the message with their private key
// const decryptedMessage = decryptMessage(encryptedMessage, user2PrivateKey);
// console.log('\nDecrypted Message:\n', decryptedMessage.toString('utf-8'));

// // Step 3: User2 signs a message with their private key
// const messageToSign = 'Verified by User2!';
// const signature = createSignature(messageToSign, user2PrivateKey);
// console.log('\nSignature:\n', signature);

// // Step 4: User1 verifies the signature with User2's public key
// const isVerified = verifySignature(messageToSign, signature, user2PublicKey);
// console.log('\nVerification Result:', isVerified ? 'Signature is valid' : 'Signature is invalid');





