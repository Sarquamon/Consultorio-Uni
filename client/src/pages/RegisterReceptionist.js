import React from "react";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import { registerReceptionistSchema } from "../utils/formSchemas";

export const RegisterReceptionist = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerReceptionistSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post(
          "http://localhost:9000/register",
          values
        );
        if (result.status === 202) {
          console.log("Recepcionista creado");
          history.push("/signin");
        } else {
          console.log(result);
        }
      } catch (e) {
        if (e.response.status === 409) {
          console.log("El email ya fue tomado, elija otro");
        } else {
          console.log(e);
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
                    ¡Registra un recepcionista!
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
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col">
                      <label style={{ color: "black" }} htmlFor="password">
                        Contraseña
                      </label>

                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="form-control form-control-user"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Registrar recepcionista
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
