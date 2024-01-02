// Definimos el componente Modal
function Modal({ onClose, showModal, updateNodo, nodo, handleInputChange ,mensaje}) {
    return (
      <>
        {/* El modal se muestra u oculta dependiendo del valor de showModal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="noModal"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="noModal">
                  Modificar nombre
                </h5>
                {/* Botón para cerrar el modal */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                {/* Formulario para editar el nombre del nodo */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={nodo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <p className="text-danger">{mensaje}</p>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                {/* Botón para cerrar el modal */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                {/* Botón para actualizar el nodo */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateNodo}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  // Exportamos el componente Modal
  export default Modal;