import React from "react";
import Axios from "axios";

import { useFormik } from "formik";
import { signinSchema } from "../utils/formSchemas";

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post("http://localhost:9000/login", values);
        console.log(result);
        localStorage.setItem("currentToken", result.data.token);
      } catch (e) {
        console.log("Error on request: ", e);
      }
    },
  });

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          ¡Bienvenido de regreso!
                        </h1>
                      </div>

                      <form onSubmit={formik.handleSubmit} className="user">
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
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
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
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
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Recuerdame en este dispositivo
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Iniciar Sesión
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
