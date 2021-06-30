const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");
const Patients = require("./Patients");

const Payments = conn.define("Payment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  total: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  current_credit: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  limit_payment_date: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  last_payment_date: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  debt: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  assigned_to: {
    type: Sequelize.STRING(100),
    references: {
      model: "Patients",
      key: "email",
    },
  },
});

Payments.belongsTo(Patients);

module.exports = Payments;
