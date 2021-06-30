const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Receptionists = conn.define("Receptionist", {
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
  pwd: {
    type: Sequelize.STRING(200),
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

module.exports = Receptionists;
