import ActionButton from "./ActionButton";

const TablaOrganigrama = ({ cargos, handleEditCargo, handleDeleteCargo  }) => {
  // Agrega un mensaje si no hay categorías
  if (cargos.length === 0) {
    return <p className="text-center">No tiene datos.</p>;
  }

  return (
    <table className="table table-bordered table-striped mt-2">
      <thead className="thead-dark">
        <tr>
          <th>N°</th>
          <th>Cargo</th>
          <th>Dependecia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cargos.map((cargo, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{cargo.name}</td>
            <td>
              {cargo.parent_id === null
                ? "Sin depencia"
                : cargos.map((depencia) =>
                    depencia.id === cargo.parent_id ? depencia.name : null
                  )}
            </td>
            <td>
              <ActionButton
                actionType="edit"
                onClick={() => handleEditCargo(cargo.id)}
                
              />
              <ActionButton
                actionType="delete"
                onClick={() => handleDeleteCargo(cargo.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaOrganigrama;
