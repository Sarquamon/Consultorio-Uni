import React from "react";
import Axios from "axios";

import { useFormik } from "formik";
import { registerDoctorSchema } from "../utils/formSchemas";

export const RegisterPayment = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      amount: "",
    },
    validationSchema: registerDoctorSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post(
          "http://localhost:9000/registerPayment",
          values
        );
        console.log(result);
        if (result.status === 202) {
          console.log("Pago realizado");
        }
      } catch (e) {
        if (e.response) {
          console.log(e);
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
                    ¡Registra un doctor!
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
                      <label style={{ color: "black" }} htmlFor="phoneNumber">
                        Numero de telefono
                      </label>

                      <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        placeholder="Numero de telefono"
                        className="form-control form-control-user"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                      {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <label style={{ color: "black" }} htmlFor="phoneNumber">
                        Especialidad
                      </label>
                      <select
                        id=""
                        className="form-select form-control-user"
                        aria-label="Default select example"
                      >
                        <option selected>Seleccione uno</option>
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
                    </div>
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
