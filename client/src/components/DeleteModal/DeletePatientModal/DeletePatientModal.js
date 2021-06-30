import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

export const DeletePatientModal = ({ patientEmail }) => {
  const history = useHistory();
  const [deletedPatient, setDeletedPatient] = useState(false);

  return (
    <div>
      <div
        className="modal"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {!deletedPatient ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Eliminando a {patientEmail}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Paciente eliminado!
                </h5>
              )}
              <button
                id="closeDeleteModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!deletedPatient ? (
                <Formik
                  initialValues={{
                    email: patientEmail,
                  }}
                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.delete(
                        "http://localhost:9000/deletePatient",
                        {
                          params: {
                            email: values.email,
                          },
                        }
                      );
                      if (result.status === 202) {
                        setDeletedPatient(true);
                      }
                    } catch (e) {
                      if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
                >
                  {({ handleSubmit }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="phone">
                            ¿Seguro que desea eliminar al paciente con el correo{" "}
                            {`${patientEmail}`}?
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Eliminar paciente
                      </button>
                      <button
                        type="button"
                        aria-label="Close"
                        id="closeDeleteModal"
                        data-bs-dismiss="modal"
                        className="btn btn-outline-danger btn-user btn-block"
                      >
                        Cancelar
                      </button>
                    </form>
                  )}
                </Formik>
              ) : (
                <div>
                  <h3>El doctor ha sido eliminado exitosamente</h3>

                  <hr />

                  <button
                    type="button"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => {
                      document.getElementById("closeDeleteModal").click();
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
