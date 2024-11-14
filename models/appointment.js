'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    Patient_ID: DataTypes.INTEGER,
    Users_ID: DataTypes.INTEGER,
    Appointment_Date: DataTypes.DATE,
    Appointment_Time: DataTypes.TIME,
    Appointment_Purpose: DataTypes.STRING,
    Appointment_Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};