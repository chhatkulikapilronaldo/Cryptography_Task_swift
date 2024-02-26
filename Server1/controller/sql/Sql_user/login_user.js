"use strict";
const bcrypt = require("bcryptjs");
const helper = require("../../../common/index");
const JWT = require("jsonwebtoken");

module.exports = async (call) => {
    try {
        const output = await helper.mysqlHelper.query(`SELECT * FROM users WHERE email='${call.email}'`);
        if (output[0].length === 0) {
            return "User not found";
        }

        const user = output[0][0];
        const hashedPassword = user.password;

        // Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(call.password, hashedPassword);

        if (passwordMatch) {
            const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "5d",
            });

            const insertResult = await helper.mysqlHelper.query(`
            INSERT INTO login_infos (uuid, email, password, Token) 
            VALUES ('${user.uuid}', '${user.email}', '${user.password}', '${token}')`);

            if (insertResult[0].affectedRows > 0) {
                return token;
            } else {
                throw new Error("Failed to insert token into login_info");
            }
        } else {
            return "Login failed";
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

