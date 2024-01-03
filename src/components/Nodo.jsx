function Nodo({ tree, setShowModal, handleClickedNode }) {
  const handleClick = () => {
    setShowModal(true);
    handleClickedNode(tree);
  };

  return (
    <>
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <h5 className="title"> {tree.name}</h5>
        </div>
      </div>
      <div className="row justify-content-center align-items-center g-2">
        <div className="col" onClick={() => handleClick()}>
          <img
            className="image"
            src="https://brighterwriting.com/wp-content/uploads/icon-user-default.png"
            alt="ocupanteImg"
          />
        </div>
        <div className="col">
          <p className="ocupante">Jonh Doe</p>
        </div>
      </div>
    </>
  );
}

export default Nodo;
