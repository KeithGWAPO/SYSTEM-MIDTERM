'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      Appointment_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Patient_ID: { // Foreign key ref Patient
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', 
          key: 'Patient_ID', // Key in the Patients model
        },
        allowNull: false, 
      },
      User_ID: { // Foreign key ref User
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'Users_ID',
        },
        allowNull: false, 
      },
      Appointment_Date: {
        type: Sequelize.DATE
      },
      Appointment_Time: {
        type: Sequelize.TIME
      },
      Appointment_Purpose: {
        type: Sequelize.STRING
      },
      Appointment_Status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};