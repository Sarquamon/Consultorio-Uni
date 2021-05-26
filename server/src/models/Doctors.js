const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Doctors = conn.define(
  "T_DOCTORS",
  {
    ID_DOCTOR: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    EMAIL: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    PHONE: {
      type: Sequelize.STRING(50),
      unique: false,
      allowNull: false,
    },
    FIRST_NAME: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    LAST_NAME: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    SPECIALITY: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    CREATED_AT: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Doctors;
