import Organigrama from "./components/Organigrama";
import Page from "./pages/Page";
import { useState, useEffect } from "react";
import servicio from "./servicios/servicio";

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
      <Page updateData={updateData} />
      <Organigrama data={data} />
    </>
  );
}

export default App;
