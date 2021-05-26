const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");

const Receptionists = conn.define(
  "T_RECEPTIONISTS",
  {
    ID_RECEPTIONIST: {
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
    PWD: {
      type: Sequelize.STRING(200),
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
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Receptionists;
