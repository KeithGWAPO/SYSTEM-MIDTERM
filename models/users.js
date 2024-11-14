'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    Users_ID: DataTypes.BIGINT,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Users_Birthdate: DataTypes.INTEGER,
    Users_Gender: DataTypes.STRING,
    Users_Role: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};