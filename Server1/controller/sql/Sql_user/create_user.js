"use strict";
const helper = require("../../../common/index");
const { generateKeyPair } = require("../../../cryptoFunctions");
(() => {
  module.exports = async (call) => {
    try {
      let myDate = new Date().getTime(); //epoch value
      const { v4: uuidv4 } = require("uuid"); //super key

      const keys = generateKeyPair();
      const { privateKey, publicKey } = keys;

      const query = `
  INSERT INTO users (uuid, username, email, password, phone, created_at, private_key, public_key)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

      const output = await helper.mysqlHelper.query(query, [
        uuidv4(),
        call.username,
        call.email,
        call.password,
        call.phone,
        myDate,
        privateKey,
        publicKey,
      ]);

      console.log(output[0].affectedRows > 0);
      if (output[0].affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
})();

