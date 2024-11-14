// models/patient.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
    }
  }

  Patient.init({
    Patient_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Patient_FirstName: DataTypes.STRING,
    Patient_LastName: DataTypes.STRING,
    Patient_Gender: DataTypes.STRING,
    DateofBirth: DataTypes.DATE,
    Patient_ContactNumber: DataTypes.BIGINT,
    Patient_Address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });

  return Patient;
};
