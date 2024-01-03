import { useEffect, useState } from "react";
import TablaOrganigrama from "../components/TablaOrganigrama";
import servicio from "../servicios/servicio";
import Modal from "../components/Modal";

function Page({ updateData }) {
  const [cargo, setCargo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCargoId, setSelectedCargoId] = useState(null);
  const [newCargo, setNewCargo] = useState({
    name: "",
    parent_id: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const fetchedCargos = await servicio.getOrganigrama();
      setCargo(fetchedCargos);
    } catch (error) {
      console.error("Error fetching cargos:", error);
    }
  };

  const resetNewCargo = () => setNewCargo({ name: "", parent_id: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCargo((prevCargo) => ({ ...prevCargo, [name]: value }));
  };

  const validateCargo = () => {
    if (!newCargo.name) return "El nombre es requerido";
    if (newCargo.name.length < 3) return "El nombre debe tener al menos 3 caracteres";
    if (newCargo.parent_id === "") return "Debe seleccionar una dependencia";
    return null;
  };

  const handleAddOrUpdateCargo = async (action) => {
    const errorMessage = validateCargo();
    if (errorMessage) {
      setMensaje(errorMessage);
      return;
    }

    newCargo.name = capitalizeFirstLetter(newCargo.name);

    try {
      if (action === "add") {
        await servicio.createOrganigrama(newCargo);
      } else {
        await servicio.updateOrganigrama(selectedCargoId, newCargo);
      }
      fetchCargos();
      updateData();
      setShowModal(false);
      setIsEditMode(false);
      resetNewCargo();
      setMensaje("");
    } catch (error) {
      console.error(`Error ${action === "add" ? "adding" : "updating"} Cargo:`, error);
    }
  };

  const handleModalClose = () => {
    resetNewCargo();
    setShowModal(false);
    setMensaje("");
    setSelectedCargoId(null);
    setIsEditMode(false);
  };

  const handleEditCargo = (id) => {
    const selectedCargo = cargo.find((Cargo) => Cargo.id === id);
    setNewCargo(selectedCargo);
    setSelectedCargoId(id);
    setShowModal(true);
    setIsEditMode(true);
  };

  const handleDeleteCargo = async (id) => {
    const dependencias = cargo.filter((cargo) => cargo.parent_id === id);
    if (dependencias.length > 0) {
      alert("No se puede eliminar el cargo porque tiene dependencias");
      return;
    }
    try {
      await servicio.deleteOrganigrama(id);
      fetchCargos();
      updateData();
    } catch (error) {
      console.error("Error deleting Cargo:", error);
    }
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <div className="container mt-4">
        <h1>Mostrar</h1>
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          Agregar
        </button>
        <TablaOrganigrama
          cargos={cargo}
          handleEditCargo={handleEditCargo}
          handleDeleteCargo={handleDeleteCargo}
        />
      </div>
      <Modal
        showModal={showModal}
        onClose={handleModalClose}
        handleInputChange={handleInputChange}
        newCargo={newCargo}
        isEditMode={isEditMode}
        handleAddCargo={() => handleAddOrUpdateCargo("add")}
        handleUpdateCargo={() => handleAddOrUpdateCargo("update")}
        resetNewCargo={resetNewCargo}
        mensaje={mensaje}
        cargo={cargo}
      />
    </>
  );
}

export default Page;