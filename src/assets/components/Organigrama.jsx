import { Tree, TreeNode } from "react-organizational-chart";
import { useState } from "react";

function Organigrama() {
  const [tree, setTree] = useState([
    {
      id: 1,
      name: "root",
      children: [
        {
          id: 2,
          name: "child1",
          children: [{ id: 3, name: "grandchild1", children: [] }],
        },
        {
          id: 4,
          name: "child2",
          children: [
            { id: 6, name: "grandchild2", children: [] },
            { id: 7, name: "grandchild3", children: [] },
          ],
        },
        { id: 5, name: "child3", children: [] },
      ],
    },
  ]);

  const [editNodeId, setEditNodeId] = useState(null);

  const generateUniqueId = () => {
    const allIds = [];

    const extractIds = (node) => {
      allIds.push(node.id);
      node.children.forEach((child) => extractIds(child));
    };

    tree.forEach((node) => extractIds(node));

    const maxId = Math.max(...allIds);
    return maxId + 1;
  };

  const handleTreeClick = (node) => {
    setEditNodeId(node.id);
  };
  const handleSaveEdit = (editedName, nodeId) => {
    const updateNode = (node) => {
      if (node.id === nodeId) {
        return { ...node, name: editedName };
      }
      const updatedChildren = node.children.map((childNode) =>
        updateNode(childNode)
      );
      return { ...node, children: updatedChildren };
    };

    const updatedTree = tree.map((node) => updateNode(node));

    setTree(updatedTree);
    setEditNodeId(null);
  };

  const handleDeleteNode = (nodeId) => {
    const removeNode = (node) => {
      if (node.id === nodeId) {
        return null;
      }
      const updatedChildren = node.children
        .map((childNode) => removeNode(childNode))
        .filter(Boolean);
      return { ...node, children: updatedChildren };
    };

    const updatedTree = removeNode(tree[0]);
    setTree([updatedTree]);
  };

  const handleAddNode = (parentId) => {
    const newNodeId = generateUniqueId();
    const newNode = { id: newNodeId, name: `nuevo${newNodeId}`, children: [] };

    const addNode = (node) => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] };
      }
      const updatedChildren = node.children.map((childNode) =>
        addNode(childNode)
      );
      return { ...node, children: updatedChildren };
    };

    const updatedTree = tree.map((node) => addNode(node));

    setTree(updatedTree);
  };

  const renderTree = (node) => (
    <TreeNode
      key={node.id}
      label={
        <div className="styleNode">
          <div className="mb-2" onClick={() => handleTreeClick(node)}>
            {node.id === editNodeId ? (
              <input
                type="text"
                defaultValue={node.name}
                onBlur={(e) => handleSaveEdit(e.target.value, node.id)}
              />
            ) : (
              node.name
            )}
          </div>
          <button
            className="btn btn-danger btn-sm me-1"
            onClick={() => handleDeleteNode(node.id)}
          >
            <i
              className="fas fa-trash "
              onClick={() => handleDeleteNode(node.id)}
            ></i>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddNode(node.id)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      }
    >
      {node.children.map((childNode) => renderTree(childNode))}
    </TreeNode>
  );

  return (
    <>
      <h1 className="center">Organigrama</h1>
      <Tree
        key={tree[0].id}
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"2px"}
        label={
          <div className="styleNode">
            <div onClick={() => handleTreeClick(tree[0])}>
              {tree[0].id === editNodeId ? (
                <input
                  type="text"
                  defaultValue={tree[0].name}
                  onBlur={(e) => handleSaveEdit(e.target.value, tree[0].id)}
                />
              ) : (
                tree[0].name
              )}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleAddNode(tree[0].id)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        }
      >
        {tree[0].children.map((childNode) => renderTree(childNode))}
      </Tree>
    </>
  );
}

export default Organigrama;
