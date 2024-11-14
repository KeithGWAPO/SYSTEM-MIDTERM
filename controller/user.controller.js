

// user.controller.js

const { where } = require("sequelize");
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login_view = (req, res) => {
    const message = req.query.message || null;
    res.render("login", { message });
};

const register_view = (req, res) => {
    const message = req.query.message;
    res.render("register", { message });
};

const addUser_view = (req, res) => {
    const message = req.query.message;
    res.render("addUser", { message });
};

const save_user = (req, res) => {
    const ConfirmPassword_data = req.body.ConfirmPassword_data;

    const user_data = {
        FirstName: req.body.firstName_data,
        LastName: req.body.lastName_data,
        Users_Birthdate: req.body.birthdate_data,
        Users_Gender: req.body.gender_data,
        ContactNumber: req.body.contactNumber_data,
        User_Role: req.body.role,
        Username: req.body.Username_data,
        Password: req.body.Password_data,
    };

    console.log("User registration data:", user_data);
    console.log("Confirm password:", ConfirmPassword_data);

    // Validate password confirmation
    if (ConfirmPassword_data !== user_data.Password) {
        return res.redirect("register?message=wrongPassword");
    }

    // Hash the password before saving to the database
    user_data.Password = bcrypt.hashSync(user_data.Password, 10);
    console.log("Hashed password:", user_data.Password);

    // Insert to database
    models.user.create(user_data)
        .then(result => {
            res.redirect("register?message=Added_Success");
        })
        .catch(error => {
            console.error("Database insertion error:", error);
            res.redirect("register?message=ServerError");
        });
};

const login_user = (req, res) => {
    const user_data = {
        Username: req.body.Username,
        Password: req.body.Password,
    };

    console.log("Login attempt:", user_data);

    // Check if the user exists in the database
    models.user.findOne({ where: { Username: user_data.Username } })
        .then(result => {
            if (!result) {
                console.log("User not found in database");
                return res.render("login", { message: "User not found" });
            }

            console.log("User found:", result);

            // Compare the entered password with the hashed password from the database
            const passwordMatch = bcrypt.compareSync(user_data.Password, result.Password);
            console.log("Password match result:", passwordMatch);

            if (passwordMatch) {
                // Password is correct, generate token with user role included
                const token = jwt.sign({ id: result.id, Username: result.Username, role: result.User_Role }, "secretKey", { expiresIn: '1h' });
                res.cookie("token", token); // Set the token as a cookie
                console.log("Login successful.");

                // Redirect based on the user's role
                if (result.User_Role === "clinic staff") {
                    console.log("Redirecting to Clinic Staff dashboard.");
                    return res.redirect("/staff/Staffdashboard"); // Redirect to Clinic Staff dashboard
                } else if (result.User_Role === "admin") {
                    console.log("Redirecting to Admin dashboard.");
                    return res.redirect("/admin/Admindashboard"); // Redirect to Admin dashboard
                } else {
                    console.log("User role not recognized.");
                    return res.render("login", { message: "User role not recognized" });
                }
            } else {
                console.log("Incorrect password");
                return res.render("login", { message: "Incorrect password" });
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            res.render("login", { message: "Server error" });
        });
};

module.exports = {
    login_view,
    register_view,
    save_user,
    login_user,
    addUser_view,
};
