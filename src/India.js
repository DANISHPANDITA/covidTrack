import React, {  useState, useEffect } from "react";
import IndiaTable from './IndiaTable';

import USTable from './USTable';
import './India.css';


function India() {
 
  const [state, setstate] = useState([]);
  const [indiatotal, setindiatotal] = useState([]);
 const [USstate, setUSstate] = useState([]);
 const [USTotal, setUSTotal] = useState([]);


 

useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries/India?strict=true')
      .then(response => response.json())
      .then(data => {
        setindiatotal(data);
      })
  }, []);

  useEffect(() => {
    fetch("https://covid-india-cases.herokuapp.com/states/")
      .then((response) => response.json())
      .then((data) => {
        setstate(data);
      });
  }, []);


  
useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/countries/usa?strict=true')
    .then(response => response.json())
    .then(data => {
      setUSTotal(data);
    })
}, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/states")
      .then((response) => response.json())
      .then((data) => {
        setUSstate(data);
      });
  }, []);

  return (
    <React.Fragment>
    <h1 className="pagetitle"> Details of States of Top 2  Affected Countries </h1>
    <div className="tables">
    <div className="india">
    <h1 className="pagetitle"> States of India </h1>
      <IndiaTable
      state={state}
      indiatotal = {indiatotal}
      />
      </div>
     <div className="usa">
      <h1 className="pagetitle">States of U.S.A </h1>
   
    <USTable
    state={USstate}
    total={USTotal}
    />
    </div>
    </div>
    </React.Fragment>
  );
}

export default India;
