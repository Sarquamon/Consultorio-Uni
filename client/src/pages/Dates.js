import React, { useState } from "react";
import Axios from "axios";

import { useFormik } from "formik";
// import { signinSchema } from "../utils/formSchemas";

export const Dates = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const formik = useFormik({
    initialValues: {
      date: "", //2021-05-30
      doctorID: "",
      patientEmail: "",
      receptionistID: "",
      totalPayment: "",
      currentPayment: "",
      doctorSpeciality: "",
    },
    // validationSchema: signinSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post("http://localhost:9000/book", {
          ...values,
          jwt: localStorage.getItem("currentToken"),
        });
        console.log(result);
      } catch (e) {
        console.log("Error on request: ", e);
      }
    },
  });

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
        setAvailableDoctors(result);
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
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <div className="col">
                      <label style={{ color: "black" }} htmlFor="date">
                        Fecha de cita
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="text"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        placeholder="Email del paciente"
                        className="form-control form-control-user"
                      />
                      {formik.touched.date && formik.errors.date ? (
                        <div>{formik.errors.date}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label
                        style={{ color: "black" }}
                        htmlFor="specialitySelect"
                      >
                        Especialidad
                      </label>
                      <select
                        name="doctorSpeciality"
                        id="specialitySelect"
                        onChange={formik.handleChange}
                        value={formik.values.doctorSpeciality}
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
                      </select>
                      {formik.touched.doctorSpeciality &&
                      formik.errors.doctorSpeciality ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.doctorSpeciality}
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
                          formik.values.date,
                          formik.values.doctorSpeciality
                        )
                      }
                    >
                      Buscar
                    </button>
                  </div>
                  {availableDoctors && availableDoctors.length > 0 ? (
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Submit
                    </button>
                  ) : null}

                  <pre style={{ color: "black" }}>
                    {JSON.stringify(formik.values, null, 2)}
                  </pre>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
