"use strict";

const loginUser = require("../../sql/Sql_user/login_user");

(() => {
  //const check_user = require("../../sql/Sql_user/login_user")

  module.exports = async (req, res, next) => {
    try {
      const obj = {
        email: req.body.email,
        password: req.body.password
      }
      const output2 = await loginUser(obj);
      if (output2 !== "Login failed") {
        res.status(200).send({
          Message: "Login Success",
          token: output2
        });
      } else {
        res.status(401).send({
          Message: "Login Unsucess",

        });
      }
    } catch (error) {
      res.status(401).send({
        //401 means unauthorized
        success: false,
        message: "Unauthorized User",
        error,
      });
    }
  }
})()
