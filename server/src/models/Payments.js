const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");
const Patients = require("./Patients");

const Payments = conn.define(
  "T_PAYMENTS",
  {
    ID_PAYMENT: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    TOTAL: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    CURRENT_CREDIT: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    LIMIT_PAYMENT_DATE: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    LAST_PAYMENT_DATE: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    DEBT: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    ASSIGNED_TO: {
      type: Sequelize.STRING(100),
      references: {
        model: Patients,
        key: "EMAIL",
      },
    },
    CREATED_AT: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Payments;
