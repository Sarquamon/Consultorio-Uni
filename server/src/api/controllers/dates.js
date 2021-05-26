// TODO check if doctor has an appointment at that date and time
// TODO check if patient has an appointment at that date and time
// TODO check if there are available doctors
// TODO check if there are available doctors for that date and time
// TODO check if user exists; if not, create it.

const { getAllDayDates } = require("../functions/dateFunctions");

exports.bookADate = async (req, res) => {
  const { bookingDate, doctorID, patientEmail } = req.body;
  try {
    const result = await getAllDayDates("2021-05-21");
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    res.status(200).json({ message: "ok" });
  }
};
