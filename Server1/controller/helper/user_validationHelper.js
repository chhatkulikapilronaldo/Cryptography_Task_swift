"use strict";
((validationHelper) => {
    let pattern = /@gmail.com/;
    //validationHelper.uservalidation = async(username,email,password,phone) =>{
    validationHelper.uservalidation = async (requestObject) => {
        try {
            if (requestObject.username == "" || requestObject.password == "" || requestObject.email == "" || requestObject.phone == "") {
                return false
            }

            else if (requestObject.password.length <= 8) {
                return false

            }
            else if (pattern.test(requestObject.email) == false) {
                return false
            }
            else if (requestObject.phone.length <= 9) {
                return false
            }
            else {
                return true;
            }
        } catch (error) {
            console.log(error);
        }

    };
})(module.exports);