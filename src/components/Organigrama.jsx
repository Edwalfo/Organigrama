import { Tree, TreeNode } from "react-organizational-chart";
import { useEffect, useState } from "react";
import Servicio from "../servicios/servicio";
import Modal from "../components/Modal";
import Spinner from "./Spinner";

function Organigrama() {
  const [tree, setTree] = useState([{}]); // Estado para almacenar el árbol de nodos
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal
  const [nodo, setNodo] = useState({ name: "", parent_id: null, id: 0 }); // Estado para almacenar el nodo que se está editando
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje de error
  const [isLoading, setIsLoading] = useState(false); // Estado para almacenar el estado de carga de la página

  // Llamar a fetchArbol cuando el componente se monte
  useEffect(() => {
    fetchArbol();
  }, []);

  // Función para obtener el árbol de nodos
  const fetchArbol = async () => {
    setIsLoading(true); // Establecer isLoading en true para mostrar el spinner de carga
    try {
      const organigrama = await Servicio.getOrganigrama();

      setTree(organigrama);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
    setIsLoading(false); // Establecer isLoading en false para ocultar el spinner de carga
  };

  // Función para generar un ID único
  const generateUniqueId = () => {
    // Crear un array vacío para almacenar todos los IDs
    const allIds = [];

    // Función para extraer todos los IDs de un nodo y sus hijos
    const extractIds = (node) => {
      // Agregar el ID del nodo al array
      allIds.push(node.id);
      // Llamar a esta función recursivamente para cada hijo del nodo
      node.children.forEach((child) => extractIds(child));
    };

    // Llamar a la función extractIds para cada nodo en el árbol
    tree.forEach((node) => extractIds(node));

    // Encontrar el ID más grande en el array
    const maxId = Math.max(...allIds);
    // Devolver el ID más grande más uno, que será un ID único
    return maxId + 1;
  };

  // Función para manejar la eliminación de un nodo
  const handleDeleteNode = async (nodeId) => {
    try {
      await Servicio.deleteOrganigrama(nodeId);
      fetchArbol();
    } catch (error) {
      console.error("Error borrando nodo:", error);
    }
  };

  // Función para manejar la adición de un nuevo nodo
  const handleAddNode = async (parentId) => {
    // Generar un ID único para el nuevo nodo
    const newNodeId = generateUniqueId();
    // Crear el nuevo nodo con un nombre basado en su ID y el ID de su nodo padre
    const newNode = {
      name: `nuevo${newNodeId}`,
      parent_id: parentId,
    };

    try {
      // Intentar crear el nuevo nodo en el organigrama utilizando el servicio
      await Servicio.createOrganigrama(newNode);
      // Si la creación fue exitosa, actualizar el árbol para reflejar el nuevo nodo
      fetchArbol();
    } catch (error) {
      // Si hubo un error al crear el nodo, imprimir el error en la consola
      console.error("Error creando nodo:", error);
    }
  };

  // Función para cerrar el modal
  const handleModalClose = () => setShowModal(false);

  // Función para actualizar el nodo
  const handleUpdateNodo = async () => {
    // Validamos que el nombre no esté vacío
    if (nodo.name.trim() === "") {
      setMensaje("El nombre es requerido");
      return;
    }
    // Validamos que el nombre tenga al menos 3 caracteres
    if (nodo.name.length < 3) {
      setMensaje("El nombre debe tener al menos 3 caracteres");
      return;
    }

    // Convertimos la primera letra del nombre a mayúscula
    nodo.name = capitalizeFirstLetter(nodo.name);

    try {
      await Servicio.updateOrganigrama(nodo.id, nodo);

      setNodo({ name: "", parent_id: null, id: 0 }); // Limpiamos el nodo
      setMensaje(""); // Limpiamos el mensaje
      setShowModal(false); // Cerramos el modal después de actualizar
      fetchArbol(); // Actualizamos el árbol
    } catch (error) {
      console.error("Error actualizando nodo:", error);
    }
  };

  // Función para manejar el cambio de valor del nodo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNodo((prevNodo) => ({ ...prevNodo, [name]: value }));
  };

  // Función para editar el nodo
  const handleEditNodo = async (id) => {
    console.log("Edit nodo", id);
    try {
      const nodoEdit = await Servicio.getOrganigramaById(id);

      setNodo(nodoEdit[0]); //Establecemos un valor predeterminado para el nodo
    } catch (error) {
      console.error("Nodo no encontrado");
    }

    setShowModal(true); // Abrimos el modal para editar
  };

  // Función para convertir la primera letra de una cadena a mayúscula
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Función para renderizar un árbol de nodos
  const renderTree = (node) => (
    // Crear un TreeNode para cada nodo
    <TreeNode
      // Usar el ID del nodo como key para React
      key={node.id}
      // El contenido del nodo se compone de su nombre y tres botones
      label={
        <div className="styleNode">
          {/* Mostrar el nombre del nodo */}
          <div className="mb-2">{node.name}</div>

          {/* // Botón para agregar un nuevo nodo hijo a este nodo
        // Al hacer clic, se llama a handleAddNode con el ID de este nodo */}
          <button
            className="btn btn-primary btn-sm me-1"
            onClick={() => handleAddNode(node.id)}
          >
            <i className="fas fa-plus"></i>
          </button>

          {/* // Botón para editar este nodo
        // Al hacer clic, se llama a handleEditNodo con el ID de este nodo */}
          <button
            className="btn btn-warning btn-sm me-1"
            onClick={() => handleEditNodo(node.id)}
          >
            <i className="fas fa-edit"></i>
          </button>

          {/* // Botón para eliminar este nodo
        // Al hacer clic, se llama a handleDeleteNode con el ID de este nodo */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteNode(node.id)}
          >
            <i className="fas fa-trash "></i>
          </button>
        </div>
      }
    >
      {/* // Para cada nodo hijo de este nodo, llamar a renderTree recursivamente */}
      {node.children.map((childNode) => renderTree(childNode))}
    </TreeNode>
  );

  return (
    <>
      <h1 className="center mb-3">Organigrama</h1>
      {isLoading ? (
        <Spinner /> // Mostrar el spinner de carga si isLoading es true
      ) : tree[0].children ? (
        <Tree
          lineWidth={"2px"}
          lineColor={"green"}
          lineBorderRadius={"2px"}
          label={
            <div className="styleNode">
              <div className="mb-2">{tree[0].name}</div>
              <button
                className="btn btn-primary btn-sm me-1"
                onClick={() => handleAddNode(tree[0].id)}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="btn btn-warning btn-sm me-1"
                onClick={() => handleEditNodo(tree[0].id)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          }
        >
          {tree[0].children.map((node) => renderTree(node))}
        </Tree>
      ) : (
        <div className="alert alert-info">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className ="btn btn-primary"
              onClick={() => handleAddNode(null)}
            >
              Crear nodo raíz
            </button>
          </div>
        </div>
      )}

      <Modal
        onClose={handleModalClose}
        showModal={showModal}
        updateNodo={handleUpdateNodo}
        handleInputChange={handleInputChange}
        nodo={nodo}
        mensaje={mensaje}
      />
    </>
  );
}

export default Organigrama;
