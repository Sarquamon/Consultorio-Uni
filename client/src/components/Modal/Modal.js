import React from "react";

export const Modal = ({ modalTitle, modalFunction, patientEmail }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h1>¡El pago ha quedado registrado!</h1>
            <p>Muchas gracias por su pago {patientEmail}.</p>
            <p>Si tiene dudas, comunicarse a 782 .</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={modalFunction ? () => modalFunction() : null}
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
