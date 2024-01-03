import { Tree, TreeNode } from "react-organizational-chart";
import { useEffect, useState } from "react";
import Servicio from "../servicios/servicio";
import Spinner from "./Spinner";

function Organigrama({ data }) {
  const [tree, setTree] = useState([{}]); // Estado para almacenar el árbol de nodos
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal
  const [isLoading, setIsLoading] = useState(false); // Estado para almacenar el estado de carga de la página

  // Aquí puedes usar 'data' directamente. Por ejemplo:
  useEffect(() => {
    // Suponiendo que 'generateTree' es una función que toma 'data' y genera un árbol
    const tree = handleGenerateTree(data);
    setTree(tree);
  }, [data]); // Esto se ejecutará cada vez que 'data' cambie

  // Función para cerrar el modal
  const handleModalClose = () => setShowModal(false);

  const handleGenerateTree = (data) => {
    // Paso 1: Crear el objeto de mapeo
    const map = {};
    data.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    // Paso 2: Construir la estructura del árbol
    let tree = [];
    data.forEach((item) => {
      if (item.parent_id === null) {
        // Este es un nodo raíz
        tree.push(map[item.id]);
      } else {
        // Este es un nodo hijo, añádelo a la lista de hijos de su padre
        map[item.parent_id].children.push(map[item.id]);
      }
    });

    // Paso 3: Devolver el árbol
    return tree;
  };

  // Función para renderizar un árbol de nodos
  const renderTree = (node) => (
    // Crear un TreeNode para cada nodo
    <TreeNode
      // Usar el ID del nodo como key para React
      key={node.id}
      // El contenido del nodo se compone de su nombre y tres botones
      label={<div className="styleNode">{node.name}</div>}
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
      ) : tree.length > 0 && tree[0].children ? (
        <Tree
          lineWidth={"2px"}
          lineColor={"green"}
          lineBorderRadius={"2px"}
          label={<div className="styleNode">{tree[0].name}</div>}
        >
          {tree[0].children.map((node) => renderTree(node))}
        </Tree>
      ) : (
        <div className="alert alert-info">
          <div className="d-flex justify-content-center">
            <p className="text-center">No tiene datos.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Organigrama;
