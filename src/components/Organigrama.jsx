import { Tree, TreeNode } from "react-organizational-chart";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Nodo from "./Nodo";
import ModalFunciones from "./ModalFunciones";

// Función para generar el árbol, movida fuera del componente
const handleGenerateTree = (data) => {
  const map = {};
  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  let tree = [];
  data.forEach((item) => {
    if (item.parent_id === null) {
      tree.push(map[item.id]);
    } else {
      map[item.parent_id].children.push(map[item.id]);
    }
  });

  return tree;
};

function Organigrama({ data }) {
  const [tree, setTree] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    setTree(handleGenerateTree(data));
  }, [data]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleClickedNode = (node) => {
    setCargo(node);
  };

  const renderTree = (node) => (
    <TreeNode
      key={node.id}
      label={
        <div className="styleNode">
          <Nodo
            tree={node}
            setShowModal={setShowModal}
            handleClickedNode={handleClickedNode}
          ></Nodo>
        </div>
      }
    >
      {node.children.map((childNode) => renderTree(childNode))}
    </TreeNode>
  );

  return (
    <>
      <h1 className="center mb-3">Organigrama</h1>
      {isLoading ? (
        <Spinner />
      ) : tree.length > 0 && tree[0].children ? (
        <Tree
          lineWidth={"2px"}
          lineColor={"#217dbb"}
          lineBorderRadius={"2px"}
          label={
            <div className="styleNode">
              <Nodo
                tree={tree[0]}
                setShowModal={setShowModal}
                handleClickedNode={handleClickedNode}
              ></Nodo>
            </div>
          }
        >
          {tree[0].children.map((node) => renderTree(node))}
        </Tree>
      ) : (
        <div className="alert alert-info">
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-center">No tiene datos.</p>
          </div>
        </div>
      )}

      <ModalFunciones
        showModal={showModal}
        closeModal={handleModalClose}
        cargo={cargo}
      />
    </>
  );
}

export default Organigrama;
