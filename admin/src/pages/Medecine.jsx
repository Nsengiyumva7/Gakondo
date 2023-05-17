import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddMedecine from '../components/AddMedecine';
import axios from 'axios';

const Medecine = () => {

  const [medecine, setMedecine] = useState([]); //for default is empty
  //count
  const [countmedecine, setCountMedecine] = useState(0); //for default is 0

  useEffect(() => {

    const fetchData = async() => {
      const resultMedecine = await axios.get('api/medecine/all');

      //i want first the latest user to show
      //console.log(resultMedecine);
      const resultMedecineData = resultMedecine.data;
      //console.log(resultMedecineData);
      const sortResultMedecineData = resultMedecineData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setMedecine(sortResultMedecineData);

      const resultCountMedecine = await axios.get('api/medecine/countMedecine');
      //console.log(resultCountMedecine);
      setCountMedecine(resultCountMedecine.data);
    }

    fetchData();

  }, []);

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const [open, setOpen] = useState(false);
  
    const [responsive] = useState("vertical");
    const [tableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight] = useState("");
    const [searchBtn] = useState(true);
    const [downloadBtn] = useState(true);
    const [printBtn] = useState(true);
    const [viewColumnBtn] = useState(true);
    const [filterBtn] = useState(true);
  
    const columns = [
      "Medecine ID",
      { name: " NAME", options: { filterOptions: { fullWidth: true } } },
      "Disease"
      
    ];
  
    const options = {
      search: searchBtn,
      download: downloadBtn,
      print: printBtn,
      viewColumns: viewColumnBtn,
      filter: filterBtn,
      filterType: "dropdown",
      responsive,
      tableBodyHeight,
      tableBodyMaxHeight,
      onTableChange: (action, state) => {
        console.log(action);
        console.dir(state);
      }
    };

    /*const data = [
      ["John Perera", "Jaden", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera","John", "MALABE", "test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "Kamal", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "Janith", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "WC Perera", "MALABE", "test@gmail.com", "+94714552565", "Available"],
    ];*/

  return (
    <div className='u-container'>
      <div className="u-row">
        <button className="u-btn" onClick={() => setOpen(true)}>Add New</button>
      </div>
      <div className="u-row">
        <div className="u-badge">
          <span className='u-total'>Total Medecines</span>
          <h1 className='u-totalNumber'>{countmedecine?.count}</h1>
        </div>
      </div>
      <div className="u-row">
      {
            medecine.length === 0 ? (
              <h3 className='no-data'>There are currently no Medecine!</h3>
            ) : (
      <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Medecine PROFILES"}
          data={
            medecine.map((medecine) => (
              [medecine.medecineId, medecine.Name, medecine.disease,  medecine.availability]
            ))
          }
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
            )}
      </div>
      {open && <AddMedecine setOpen ={setOpen} />}
    </div>
  )
}

export default Medecine
