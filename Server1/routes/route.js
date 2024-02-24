"use strict";
(() => {
    const express = require("express");
    const router = express.Router();

    const user_route = require("./user_route/user_route");
   //const requestrespons=require("./user_route/user_route");

    router.use("/users", user_route);
  //  router.use("/users",requestrespons);
    

    module.exports = router;
})()