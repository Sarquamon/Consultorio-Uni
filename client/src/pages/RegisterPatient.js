import React from "react";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import { registerPatientSchema } from "../utils/formSchemas";

export const RegisterPatient = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerPatientSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post(
          "http://localhost:9000/registerPatient",
          values
        );
        if (result.status === 200) {
          console.log("Paciente creado");
          history.push("/");
        } else {
          console.log(result);
        }
      } catch (e) {
        if (e.response) {
          if (
            e.response.status === 409 &&
            e.response.data.message ===
              "A patient with that email already exists!"
          ) {
            console.log("A patient with that email already exists!");
          } else {
            console.log("Error on request: ", e);
          }
        } else {
          console.log("Error on request: ", e);
        }
      }
    },
  });

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-100 mb-4">
                    ¡Registra un paciente!
                  </h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <label style={{ color: "black" }} htmlFor="firstName">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Nombre(s)"
                        className="form-control form-control-user"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-sm-6">
                      <label style={{ color: "black" }} htmlFor="lastName">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Apellido(s)"
                        className="form-control form-control-user"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ color: "black" }} htmlFor="email">
                      Correo
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Correo"
                      className="form-control form-control-user"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label style={{ color: "black" }} htmlFor="phone">
                      Numero de telefono
                    </label>

                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="Numero de telefono"
                      className="form-control form-control-user"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div style={{ color: "red" }}>{formik.errors.phone}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Registrar paciente
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
