function Modal({
  showModal,
  onClose,
  handleAddCargo,
  handleUpdateCargo,
  newCargo,
  handleInputChange,
  isEditMode,
  mensaje,
  cargo,
}) {
  const modalDisplay = showModal ? "block" : "none";
  const modalTitle = isEditMode ? "Actualizar Cargo" : "Agregar cargo";

  return showModal ? (
    <div className="modal fade show" style={{ display: modalDisplay }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
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

              {newCargo.parent_id !== null && cargo.length > 0 && (
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
                    {cargo
                      .filter((dependencia) => dependencia.id !== newCargo.id)
                      .map((dependencia) => (
                        <option key={dependencia.id} value={dependencia.id}>
                          {dependencia.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <p className="text-danger">{mensaje}</p>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
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
  ) : null;
}

export default Modal;
