// //MIDDLEWARE
// //auth.js

// //to protect sa route


// const jwt = require("jsonwebtoken")



// //check auth user
// const check_user_auth = (req, res, next) => {

//     //step 1 get token in cookies

//     const token = req.cookies.token

//     //step 2 check if token is empty
//     if(token) {

//         //step 3 check if token is valid
//         jwt.verify(token , "secretKey" , (err, decode) => {
//             if(err) {
//                 res.redirect("login")

//             }else {
//                 req.user = decode
//                 next()

//             }


//             })

//     }else {
//         res.redirect("login")

//     }


//     }


// //check not auth user
// const check_user_not_auth = (req, res, next) => {
//     //step 1 get token in cookies

//     const token = req.cookies.token

//     if(token) {
//         res.redirect("Admindashboard")

//     }else{
//         next()

//     }
    
// }

// module.exports = { check_user_auth, check_user_not_auth }