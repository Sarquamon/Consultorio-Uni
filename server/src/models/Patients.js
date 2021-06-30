const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Patients = conn.define("Patient", {
  email: {
    type: Sequelize.STRING(100),
    primaryKey: true,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(50),
    unique: false,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Patients;
