import ModalFunciones from "./ModalFunciones";

const [showModal, setshowModal] = useState(false);

const mostrar =()=>{
    console.log("prueba");
}

function Nodo({tree}) {
  return (
    <>
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <h5 className="title"> {tree.name}</h5>
        </div>
      </div>
      <div className="row justify-content-center align-items-center g-2">
        <div className="col" onClick={()=>console.log("mostrar")}>
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

      <ModalFunciones/>
    </>
  );
}

export default Nodo;
