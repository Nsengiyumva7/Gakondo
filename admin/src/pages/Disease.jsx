import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddDisease from '../components/AddDisease';
import axios from 'axios';

const Disease = () => {

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const [open, setOpen] = useState(false);
  const [diseases, setDiseases] = useState([]); //for default is empty

  useEffect(() => {

    const fetchData = async() => {
      const resultDiseases = await axios.get('api/diseases/all');

      //i want first the latest user to show
      //console.log(resultDiseases);
      const resultDiseasesData = resultDiseases.data;
      //console.log(resultDiseasesData);
      const sortResultDiseasesData = resultDiseasesData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setDiseases(sortResultDiseasesData);
    }

    fetchData();

  }, []);

  
  
  const [responsive] = useState("vertical");
  const [tableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight] = useState("");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);

  const columns = [
      { name: "Disease NAME", options: { filterOptions: { fullWidth: true } } },
      "Symptoms",
      "Medecine",
      "TOTAL Medecine"
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
    ["Web Development", "Miljan Peric", "50"],
    ["Marketing", "John Deep", "13"],
    ["App Development", "Frank Camly", "21"],
    ["Support", "Gary Camara", "85"],
  ];*/


  return (
    <div className='u-container'>
      <div className="u-row">
        <button className="u-btn" onClick={() => setOpen(true)}>Add New</button>
      </div>
      <div className="u-row">
        {
            diseases.length === 0 ? (
              <h3 className='no-data'> Disease!</h3>
            ) : (
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                    title={"Disease"}
                    data={
                      diseases.map((disease) => (
                        [disease.diseaseName, disease.diseaseSymptoms, disease.diseaseMedecine, disease.totalMedecine]
                      ))
                    }
                    columns={columns}
                    options={options}
                    />
                </ThemeProvider>
            </CacheProvider>
          )
        }
      </div>
      {open && <AddDisease setOpen={setOpen} />}
    </div>
  )
}

export default Disease