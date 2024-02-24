"use strict";
(() => {
    const express = require("express");
    const router = express.Router();
    const create_user = require("../../controller/methods/user_method/register_user")
    const login_user = require("../../controller/methods/user_method/login_user");


    router.post('/create_user', create_user);
    router.post('/login_user', login_user);
   

    module.exports = router;
})()