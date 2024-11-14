'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      Patient_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Patient_FirstName: {
        type: Sequelize.STRING
      },
      Patient_LastName: {
        type: Sequelize.STRING
      },
      Patient_Gender: {
        type: Sequelize.STRING
      },
      DateofBirth: {
        type: Sequelize.DATE
      },
      Patient_ContactNumber: {
        type: Sequelize.BIGINT
      },
      Patient_Address: {
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
    await queryInterface.dropTable('Patients');
  }
};