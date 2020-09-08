import React from 'react';
import './IndiaTable.css';
import numeral from 'numeral';


function IndiaTable({indiatotal,state} ){

  return (
        
        <div className="indiatable table table-striped table-bordered hover table-md"  id="dtBasicExample" >
        <th>
         <td className="regiontitle">  Region   </td>
        <td> Confirmed Cases</td>
        <td>Recoveries</td>
        <td>Deceased</td>
        <td>Active Cases</td>
        </th>
        <tr>
        <td> {indiatotal.country}</td>
        <td>  <strong>{numeral(indiatotal.cases).format("0,0")}</strong> </td>  
        
        <td> {numeral(indiatotal.recovered).format("0,0")}</td>
        <td> {numeral(indiatotal.deaths).format("0,0")}</td>
        <td> {numeral(indiatotal.active).format("0,0")}</td>
        
        </tr>
        
       
        {state.map((item) => (
          <tr>
          <td> {item.state}</td>
           <td>  <strong>{numeral(item.noOfCases).format("0,0")}</strong> </td>
           <td> <strong>{numeral(item.cured).format("0,0")}</strong></td>
           <td> <strong>{numeral(item.deaths).format("0,0")}</strong></td>
           <td> <strong>{numeral(item.active).format("0,0")}</strong></td>
          </tr>
        ))}
          
        </div>
    )
};

export default IndiaTable;
