const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");
const Doctors = require("./Doctors");
const Patients = require("./Patients");
const Payments = require("./Payments");
const Receptionists = require("./Receptionists");

const Dates = conn.define(
  "T_DATES",
  {
    ID_DATE: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ID_PATIENT: {
      type: Sequelize.INTEGER,
      references: {
        model: Patients,
        key: "ID_PATIENT",
      },
    },
    ID_DOCTOR: {
      type: Sequelize.INTEGER,
      references: {
        model: Doctors,
        key: "ID_DOCTOR",
      },
    },
    BOOKED_DATE: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    ID_RECEPTIONIST: {
      type: Sequelize.INTEGER,
      references: {
        model: Receptionists,
        key: "ID_RECEPTIONIST",
      },
    },
    ID_PAYMENT: {
      type: Sequelize.INTEGER,
      references: {
        model: Payments,
        key: "ID_PAYMENT",
      },
    },
    CREATED_AT: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Dates;
