// admin.controller.js

const models = require("../models");  // Ensure correct import of models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Fetch users (clinic staff or others) for the user management view
const usermanagement_view = async (req, res) => {
    try {
        // Fetch all users from the User model
        const users = await models.User.findAll();  // This will retrieve all users from the database

        // Pass users data to the view
        res.render('admin/usermanagement', { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.render('admin/usermanagement', { users: [], error: "Failed to load users" });
    }
};

// Fetch total clinic staff users
const getTotalClinicStaff = (req, res) => {
    models.User.count({
        where: {
            User_Role: 'clinic staff'
        }
    })
    .then(totalStaff => {
        res.json({ totalStaff });
    })
    .catch(error => {
        console.error('Error fetching total clinic staff:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    });
};

// Admin dashboard view
const Admindashboard_view = (req, res) => {
    res.render("admin/Admindashboard");
};

// View logs page
const logs_view = (req, res) => {
    res.render("admin/logs");
};

// Staff dashboard view
const Staffdashboard_view = (req, res) => {
    res.render("staff/Staffdashboard");
};

// View appointment page
const appointment_view = (req, res) => {
    res.render("staff/appointment");
};

// View patients page
const patients_view = (req, res) => {
    res.render("staff/patients");
};

// Handle logout action
const logout = (req, res) => {
    res.cookie("token", "", { maxAge: 1000 });
    res.render("login");
};

// Add new user function (hashing password before saving)
const addUser = async (req, res) => {
    try {
        const data_addUser = {
            FirstName: req.body.firstName_data,
            LastName: req.body.lastName_data,
            Users_Birthdate: req.body.birthdate_data,
            Users_Gender: req.body.gender_data,
            ContactNumber: req.body.contactNumber_data,
            User_Role: req.body.role,
            Username: req.body.Username_data,
            Password: req.body.Password_data,
        };

        // Hash password using bcrypt before saving
        data_addUser.Password = bcrypt.hashSync(data_addUser.Password, 10);
        console.log("Hashed password:", data_addUser.Password);

        // Add user to the database
        const result = await models.User.create(data_addUser);
        console.log("New user added successfully:", result);

        // Redirect to user management page with success message
        res.redirect("/admin/usermanagement?message=UserAdded");
    } catch (error) {
        console.error("Error adding new user:", error);
        // Redirect with an error message
        res.redirect("/admin/usermanagement?message=ServerError");
    }
};

module.exports = {
    Admindashboard_view,
    usermanagement_view,
    logs_view,
    Staffdashboard_view,
    appointment_view,
    patients_view,
    logout,
    addUser,
    getTotalClinicStaff
};
