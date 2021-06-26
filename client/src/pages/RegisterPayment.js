import React from "react";
import Axios from "axios";

import { Formik, FastField } from "formik";
import { useHistory } from "react-router-dom";

import { Modal } from "../components/Modal/Modal";
// import { registerDoctorSchema } from "../utils/formSchemas";

export const RegisterPayment = () => {
  const history = useHistory();
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
                <Formik
                  initialValues={{
                    patientEmail: "",
                    amount: "",
                    paymentID: "",
                  }}
                  // validationSchema: registerDoctorSchema,

                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.post(
                        "http://localhost:9000/registerPayment",
                        values
                      );
                      if (result.status === 202) {
                        document.getElementById("launchModal").click();
                      }
                    } catch (e) {
                      if (e.response) {
                        console.log(e);
                      } else {
                        console.log(e);
                      }
                    }
                  }}
                >
                  {({ values, errors, touched, handleSubmit }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="paymentID">
                            ID del ticket
                          </label>
                          <FastField
                            id="paymentID"
                            name="paymentID"
                            value={values["paymentID"]}
                            placeholder="ID del ticket"
                            className="form-control form-control-user"
                          />
                        </div>
                        <div className="col">
                          <label
                            style={{ color: "black" }}
                            htmlFor="patientEmail"
                          >
                            Email del paciente
                          </label>
                          <FastField
                            id="patientEmail"
                            name="patientEmail"
                            value={values["patientEmail"]}
                            placeholder="Email del paciente"
                            className="form-control form-control-user"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="amount">
                            Cantidad a abonar
                          </label>
                          <FastField
                            id="amount"
                            name="amount"
                            value={values["amount"]}
                            placeholder="Abono"
                            className="form-control form-control-user"
                          />
                        </div>
                      </div>
                      <button
                        id="launchModal"
                        type="button"
                        data-bs-toggle="modal"
                        className="btn btn-primary"
                        style={{ display: "none" }}
                        data-bs-target="#staticBackdrop"
                      ></button>
                      <Modal
                        modalTitle={"Pago Realizado"}
                        modalFunction={() => {
                          history.push("/");
                        }}
                        patientEmail={values["patientEmail"]}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Registrar paciente
                      </button>
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
