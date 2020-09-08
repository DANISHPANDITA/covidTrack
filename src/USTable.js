import React from 'react';
import numeral from "numeral";
import './USTable.css';

function USTable({state,total}) {
    return (
        <div className="ustable table table-striped table-bordered table-md">
        <th>
        <td className="regiontitle">  Region   </td>
       <td> Confirmed Cases</td>
       <td>Recoveries</td>
       <td>Deceased</td>
       <td>Active Cases</td>
       </th>
       <tr>
       <td> {total.country}</td>
       <td>  <strong>{numeral(total.cases).format("0,0")}</strong> </td>  
       
       <td> {numeral(total.recovered).format("0,0")}</td>
       <td> {numeral(total.deaths).format("0,0")}</td>
       <td> {numeral(total.active).format("0,0")}</td>
       
       </tr>
       
      
       {state.map((item) => (
         <tr>
         <td> {item.state}</td>
          <td>  <strong>{numeral(item.cases).format("0,0")}</strong> </td>
          <td> <strong>{numeral(item.recovered).format("0,0")}</strong></td>
          <td> <strong>{numeral(item.deaths).format("0,0")}</strong></td>
          <td> <strong>{numeral(item.active).format("0,0")}</strong></td>
         </tr>
       ))}
         
        </div>
    )
}

export default USTable;
