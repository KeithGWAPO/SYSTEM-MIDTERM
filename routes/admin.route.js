const express = require("express");

// Import the controller modules
const admin_Controller = require("../controller/admin.controller.js");
const addPatientController = require("../controller/addPatient.controller.js");
const appointmentController = require("../controller/appointment.controller.js");

const router = express.Router();

// Admin Routes
router.get("/admin/Admindashboard", admin_Controller.Admindashboard_view);  // Admin dashboard
router.get("/admin/usermanagement", admin_Controller.usermanagement_view);  // User management
router.get("/admin/logs", admin_Controller.logs_view);  // Admin logs

// Staff Routes
router.get("/staff/Staffdashboard", admin_Controller.Staffdashboard_view);  // Staff dashboard
router.get("/staff/appointment", appointmentController.appointment_view); // Appointment page for staff
router.get("/staff/patients", addPatientController.patients_view);  // View patients for staff

// API routes for CRUD operations
// Add new appointment
router.post("/staff/appointment", appointmentController.save_addAppointment);  // Save new appointment

// Admin - Add new user
router.post("/admin/addUser", admin_Controller.addUser);  // Add new user (admin)

// Add new patient (for staff)
router.post("/staff/addPatient", addPatientController.save_addPatient);  // Save new patient

// Admin - Get total clinic staff
router.get("/admin/getTotalClinicStaff", admin_Controller.getTotalClinicStaff);  // Fetch total clinic staff

// Staff - Get total number of patients
router.get("/staff/getTotalPatients", addPatientController.getTotalPatients);  // Fetch total number of patients

// Export the router so it can be used in the app.js (main server file)
module.exports = router;
