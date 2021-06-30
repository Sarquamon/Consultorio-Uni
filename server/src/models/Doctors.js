const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Doctors = conn.define("Doctor", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(100),
    unique: true,
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
  speciality: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Doctors;
