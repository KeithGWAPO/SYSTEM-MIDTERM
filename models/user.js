
//MODELS
//user.js

//MAO NI TINOODD

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Users_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Users_Birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        Users_Gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ContactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        User_Role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure username is unique
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return User;
};
