const Sequelize = require("sequelize");
const conn = require("../config/sqlconn");
const Doctors = require("./Doctors");
const Patients = require("./Patients");
const Payments = require("./Payments");
const Receptionists = require("./Receptionists");

const Dates = conn.define("Date", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  patientEmail: {
    type: Sequelize.STRING(100),
    references: {
      model: "Patients",
      key: "email",
    },
  },
  doctorId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Doctors",
      key: "id",
    },
  },
  booked_date: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  receptionistId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Receptionists",
      key: "id",
    },
  },
  paymentId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Payments",
      key: "id",
    },
  },
});

Dates.belongsTo(Doctors, { foreignKey: "doctorId" });
Dates.belongsTo(Payments, { foreignKey: "paymentId" });
Dates.belongsTo(Patients, { foreignKey: "patientEmail" });
Dates.belongsTo(Receptionists, { foreignKey: "receptionistId" });

module.exports = Dates;
