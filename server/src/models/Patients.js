const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Patients = conn.define(
  "T_PATIENTS",
  {
    ID_PATIENT: {
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
    CREATED_AT: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Patients;
