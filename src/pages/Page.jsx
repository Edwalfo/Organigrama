import { useEffect, useState } from "react";
import TablaOrganigrama from "../components/TablaOrganigrama";
import servicio from "../servicios/servicio";
import Modal from "../components/Modal";

function Page() {
  const [cargo, setCargo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCargoId, setSelectedCargoId] = useState(null);
  const [newCargo, setNewCargo] = useState({
    name: "",
    parent_id: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const cargo = await servicio.getOrganigrama();
      console.log(cargo);
      setCargo(cargo);
    } catch (error) {
      console.error("Error fetching cargos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCargo((prevCargo) => ({
      ...prevCargo,
      [name]: value,
    }));
  };

  const resetNewCargo = () => {
    setNewCargo({
      name: "",
      parent_id: 0,
    });
  };

  const handleAddCargo = async () => {
    try {
      await servicio.createOrganigrama(newCargo);
      fetchCargos(); // Refresh the Cargos after adding a new one
      setShowModal(false);
      setIsEditMode(false);
      resetNewCargo();
    } catch (error) {
      console.error("Error adding Cargo:", error);
    }
  };

  const handleModalClose = () => {
    resetNewCargo();
    setShowModal(false);
    setSelectedCargoId(null);
  };

  const handleUpdateCargo = async () => {
    try {
      await servicio.updateOrganigrama(selectedCargoId, newCargo);
      fetchCargos(); // Refresh the Cargos after updating
      setShowModal(false);
      setIsEditMode(false);
      resetNewCargo();
    } catch (error) {
      console.error("Error updating Cargo:", error);
    }
  };

  const handleEditCargo = (id) => {
    const selectedCargo = cargo.find((Cargo) => Cargo.id === id);
    setNewCargo(selectedCargo);
    setSelectedCargoId(id);
    setShowModal(true);
    setIsEditMode(true);
  };

  const handleDeleteCargo = async (id) => {
    try {
      await servicio.deleteOrganigrama(id);
      fetchCargos(); // Refresh the Cargos after deleting
    } catch (error) {
      console.error("Error deleting Cargo:", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Mostrar</h1>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
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
        handleAddCargo={handleAddCargo}
        handleUpdateCargo={handleUpdateCargo}
        resetNewCargo={resetNewCargo}
        mensaje={mensaje}
        cargo={cargo}
      />
    </>
  );
}

export default Page;
