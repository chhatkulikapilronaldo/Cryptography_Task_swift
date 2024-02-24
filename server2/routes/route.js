"use strict";
(() => {
    const express = require("express");
    const router = express.Router();

    const user_route = require("./user_route/user_route");
   //const requestrespons=require("./user_route/user_route");

    router.use("/users", user_route);
  //  router.use("/users",requestrespons);
    

  // for public & private  
  // https://plainenglish.io/blog/rsa-encryption-in-nodejs-with-code-samples-86bb829718e0
  
    module.exports = router;
})()