import React from 'react';
import './Table.css';
import numeral from 'numeral';
function Table({countries}) {
    return (
        <div className="table">
            <th className="header"> 
                <td>Country name</td>
                <td>Cases</td>
                <td>Active</td>
                <td>Tests Done</td>
                <td>Cases per One Million</td>
                <td>Tests per One Million</td>
            </th>
            {countries.map (country=>
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
                    <td><strong>{numeral(country.active).format("0,0")}</strong></td>
                    <td><strong>{numeral(country.tests).format("0,0")}</strong></td>
                    <td><strong>{numeral(country.casesPerOneMillion).format("0,0")}</strong></td>
                    <td><strong>{numeral(country.testsPerOneMillion).format("0,0")}</strong></td>
                </tr>
         )}
        </div>
    )
}

export default Table;
