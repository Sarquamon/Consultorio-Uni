import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import { registerPatientSchema } from "../../../utils/formSchemas";

export const RegisterPatientModal = () => {
  const history = useHistory();
  const [registeredPatient, setRegisteredPatient] = useState(false);

  return (
    <div>
      <div
        className="modal"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {!registeredPatient ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Registra un paciente
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Paciente registrado!
                </h5>
              )}
              <button
                id="closeRegisterModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!registeredPatient ? (
                <Formik
                  initialValues={{
                    email: "",
                    phone: "",
                    firstName: "",
                    lastName: "",
                  }}
                  onSubmit={async (values, { setFieldError }) => {
                    try {
                      const result = await Axios.post(
                        "http://localhost:9000/registerPatient",
                        values
                      );
                      if (result.status === 202) {
                        setRegisteredPatient(true);
                      }
                    } catch (e) {
                      if (e.response.status === 409) {
                        setFieldError("email", "El email ya esta en uso");
                      } else if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
                  validationSchema={registerPatientSchema}
                >
                  {({
                    handleSubmit,
                    values,
                    handleChange,
                    errors,
                    touched,
                  }) => (
                    <form className="user" onSubmit={handleSubmit}>
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
                            onChange={handleChange}
                            value={values.firstName}
                          />
                          {touched.firstName && errors.firstName ? (
                            <div style={{ color: "red" }}>
                              {errors.firstName}
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
                            onChange={handleChange}
                            value={values.lastName}
                          />
                          {touched.lastName && errors.lastName ? (
                            <div style={{ color: "red" }}>
                              {errors.lastName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="email">
                            Correo
                          </label>

                          <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Correo"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.email}
                          />
                          {touched.email && errors.email ? (
                            <div style={{ color: "red" }}>{errors.email}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="phone">
                            Numero de telefono
                          </label>

                          <input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Numero de telefono"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.phone}
                          />
                          {touched.phone && errors.phone ? (
                            <div style={{ color: "red" }}>{errors.phone}</div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Registrar paciente
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-info btn-user btn-block"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="closeRegisterModal"
                        className="btn btn-outline-danger btn-user btn-block"
                      >
                        Cancelar
                      </button>
                    </form>
                  )}
                </Formik>
              ) : (
                <div>
                  <h3>El paciente ha sido creado exitosamente</h3>

                  <hr />

                  <button
                    type="button"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => {
                      document.getElementById("closeRegisterModal").click();
                      history.push("/");
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
