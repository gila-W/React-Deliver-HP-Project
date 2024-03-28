import React from "react";
import "./App.css";
import Routing from "./routing";
import { useData } from "./hooks/useDataHook";

function App() {

  //-----------------------------------------------------------
  //-------changed to custome hook as required-----------------
  //-----------------------------------------------------------
  // const [appData, setAppData] = useState({ customers: [], packages: [] });
  // const [invoices, setInvoices] = useState([]);

  // useEffect(()=> {
  //   fetch("/data.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setAppData(data);
  //   });
  // }, 
  // []);

  const { appData, setAppData } = useData();

  return (
    <div className="App">
      <Routing data={appData} updateData={setAppData}/>
    </div>
  );
}

export default App;
