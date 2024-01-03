import Organigrama from "./components/Organigrama";
import Page from "./pages/Page";
import { useState, useEffect } from "react";
import servicio from "./servicios/servicio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  const updateData = async () => {
    try {
      const newData = await servicio.getOrganigrama();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateData();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Page updateData={updateData} />} />
          <Route path="/Organigrama" element={<Organigrama data={data} />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
