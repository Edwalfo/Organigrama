import { Tree, TreeNode } from "react-organizational-chart";

function Organigrama() {
  const tree = [
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
  ];

  const handleTreeClick = (node) => {
    console.log("click", node);
  }

  const renderTree = (node) => (
    <TreeNode
      key={node.id}
      label={
        <div
          className="styleNode"
          onClick={() =>handleTreeClick(node)}
        >
          {node.name}
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
          <div
            className="styleNode"
            onClick={() =>handleTreeClick(tree[0])}
          >
            {tree[0].name}
          </div>
        }
      >
        {tree[0].children.map((childNode) => renderTree(childNode))}
      </Tree>
    </>
  );
}

export default Organigrama;
