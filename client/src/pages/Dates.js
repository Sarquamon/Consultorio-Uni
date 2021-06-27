import React, { useState } from "react";
import Axios from "axios";

import { Formik, FastField } from "formik";
// import { signinSchema } from "../utils/formSchemas";

export const Dates = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);

  const searchAvailableDoctor = async (date, doctorSpeciality) => {
    try {
      const result = await Axios.get(
        "http://localhost:9000/listAllAvailableDoctors",
        {
          params: {
            date,
            doctorSpeciality,
          },
        }
      );
      if (result) {
        setAvailableDoctors(result.data);
      }
    } catch (e) {
      console.log("Error on request: ", e);
    }
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-100 mb-4">¡Agenda una cita!</h1>
                </div>

                <Formik
                  initialValues={{
                    date: "", //2021-05-30
                    doctorID: "",
                    patientEmail: "",
                    receptionistID: "",
                    totalPayment: "",
                    currentPayment: "",
                    doctorSpeciality: "",
                  }}
                  // validationSchema: signinSchema,

                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.post(
                        "http://localhost:9000/book",
                        {
                          ...values,
                          jwt: localStorage.getItem("currentToken"),
                        }
                      );
                      console.log(result);
                    } catch (e) {
                      console.log(
                        "Error on request: ",
                        e.response.data.message
                      );
                    }
                  }}
                >
                  {({ values, errors, touched, handleSubmit }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="date">
                            Fecha de cita
                          </label>

                          <FastField
                            id="date"
                            name="date"
                            value={values["date"]}
                            placeholder="Fecha deseada (Ej. 2021-06-30)"
                            className="form-control form-control-user"
                          />
                          {touched.date && errors.date ? (
                            <div>{errors.date}</div>
                          ) : null}
                        </div>
                        <div className="col">
                          <label
                            style={{ color: "black" }}
                            htmlFor="specialitySelect"
                          >
                            Especialidad
                          </label>
                          <FastField
                            as="select"
                            id="specialitySelect"
                            name="doctorSpeciality"
                            value={values["doctorSpeciality"]}
                            aria-label="Default select example"
                            className="form-select form-control-user"
                          >
                            <option value="0">Seleccione uno</option>
                            <option value="peridoncia">Peridoncia</option>
                            <option value="endodoncia">Endodoncia</option>
                            <option value="odontologíaEstética">
                              Odontología estética
                            </option>
                            <option value="cariologia">Cariologia</option>
                            <option value="patologia">Patología</option>
                            <option value="maxilofacial">Maxilofacial</option>
                            <option value="rehabilitaciónOral">
                              Rehabilitación oral
                            </option>
                          </FastField>
                          {touched.doctorSpeciality &&
                          errors.doctorSpeciality ? (
                            <div style={{ color: "red" }}>
                              {errors.doctorSpeciality}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group row">
                        <button
                          type="button"
                          className="btn btn-primary btn-user btn-block"
                          onClick={() =>
                            searchAvailableDoctor(
                              values.date,
                              values.doctorSpeciality
                            )
                          }
                        >
                          Buscar
                        </button>
                      </div>
                      {availableDoctors && availableDoctors.length > 0 ? (
                        <>
                          <div className="form-group row">
                            <label
                              style={{ color: "black" }}
                              htmlFor="doctorID"
                            >
                              Doctor
                            </label>
                            <FastField
                              as="select"
                              id="doctorID"
                              name="doctorID"
                              value={values["doctorID"]}
                              aria-label="Default select example"
                              className="form-select form-control-user"
                            >
                              <option value="0">Seleccione un doctor</option>
                              {availableDoctors.map((doctor) => {
                                return (
                                  <option
                                    key={doctor.ID_DOCTOR}
                                    value={doctor.ID_DOCTOR}
                                  >
                                    {doctor.FIRST_NAME} {doctor.LAST_NAME}
                                  </option>
                                );
                              })}
                            </FastField>
                          </div>

                          <div className="form-group row">
                            <div className="col">
                              <label
                                style={{ color: "black" }}
                                htmlFor="patientEmail"
                              >
                                Paciente
                              </label>

                              <FastField
                                name="patientEmail"
                                id="patientEmail"
                                value={values["patientEmail"]}
                                placeholder="Email del paciente"
                                className="form-control form-control-user"
                              />
                            </div>
                            <div className="col">
                              <label
                                style={{ color: "black" }}
                                htmlFor="receptionistID"
                              >
                                Recepcionista
                              </label>
                              <FastField
                                name="receptionistID"
                                id="receptionistID"
                                value={values["receptionistID"]}
                                placeholder="ID recepcionista"
                                className="form-control form-control-user"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col">
                              <label
                                style={{ color: "black" }}
                                htmlFor="totalPayment"
                              >
                                Monto total
                              </label>

                              <FastField
                                name="totalPayment"
                                id="totalPayment"
                                value={values["totalPayment"]}
                                placeholder="Monto total"
                                className="form-control form-control-user"
                              />
                            </div>
                            <div className="col">
                              <label
                                style={{ color: "black" }}
                                htmlFor="currentPayment"
                              >
                                Abono
                              </label>

                              <FastField
                                name="currentPayment"
                                id="currentPayment"
                                value={values["currentPayment"]}
                                placeholder="Abono"
                                className="form-control form-control-user"
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Submit
                          </button>
                        </>
                      ) : null}

                      <pre style={{ color: "black" }}>
                        {JSON.stringify(values, null, 2)}
                      </pre>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
