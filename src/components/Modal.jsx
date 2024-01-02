// Definimos el componente Modal
function Modal({
  showModal,
  onClose,
  handleAddCargo,
  handleUpdateCargo,
  newCargo,
  handleInputChange,
  isEditMode,
  mensaje,
  cargo
}) {

  
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
                {isEditMode ? "Actualizar Cargo" : "Agregar cargo"}
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
                    value={newCargo.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="parent_id" className="form-label">
                    Dependencias
                  </label>
                  <select
                    className="form-select"
                    id="parent_id"
                    name="parent_id"
                    value={newCargo.parent_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un cargo</option>
                    {cargo.map((dependencia) => (
                      <option key={dependencia.id} value={dependencia.id}>
                        {dependencia.name}
                      </option>
                    ))}
                  </select>
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

              <button
                type="button"
                className="btn btn-primary"
                onClick={isEditMode ? handleUpdateCargo : handleAddCargo}
              >
                {isEditMode ? "Actualizar" : "Agregar"}
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
