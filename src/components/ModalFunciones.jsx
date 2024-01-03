function ModalFunciones({ showModal, closeModal, cargo }) {
  const modalDisplay = showModal ? "block" : "none";
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: modalDisplay }}
        id="modalFunciones"
        tabIndex="-1"
        aria-labelledby="modalFuncionesLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title" id="modalFuncionesLabel">
                Funciones de <strong>{cargo.name}</strong>
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <h5>Lista de funciones</h5>
              <ol className="list-group">
                <li className="list-group-item">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aliquid, odit quibusdam! Magni eligendi veritatis fugit
                  incidunt error quas, praesentium dignissimos, voluptatem optio
                  eum autem! Enim minus qui doloremque quia earum.
                </li>
                <li className="list-group-item">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nesciunt repellendus porro non ipsam facere. Provident nulla
                  saepe fuga tempora suscipit! Excepturi porro praesentium eum
                  blanditiis cupiditate temporibus tenetur voluptatem! Ad?
                </li>
                <li className="list-group-item">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
                  ducimus ut eveniet voluptates facere quaerat architecto
                  voluptatem unde nostrum quam autem quae maiores corrupti
                  expedita commodi nihil odio, numquam culpa.
                </li>
              </ol>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalFunciones;
