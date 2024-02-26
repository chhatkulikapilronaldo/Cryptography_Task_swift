"use strict";
(() => {
    const create_user = require('../../sql/Sql_user/create_user')
    const helper = require("../../helper/index")
    module.exports = async (req, res, next) => {
        try {
            const password = req.body.password;
            const hashedPassword = await helper.hasher.hashpassword(password);
            const requestObject = {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
            };
            let output = await helper.userValidateHelper.uservalidation(requestObject);
            if (output == true) {
                const output2 = await create_user(requestObject);
                if (output2 == true) {
                    res.status(201).send({  //created
                        //status: 201, //created
                        success: true,
                        message: "SignUp Succesful"
                    })
                } else {
                    res.status(400).send({
                        //status: 400,  //bad request
                        success: false,
                        message: 'SignUp UnSuccesful'
                    })

                }
            }
            else {
                res.status(400).send({
                    success: false,
                    // status: 400, //bad request
                    message: 'Please provide appropriate data'
                });
            }

        } catch (error) {
            res.status(500).send({
                success: false,
                //status: 500, 
                message: 'Internal Error',
                error
            });
        }
    }
})()