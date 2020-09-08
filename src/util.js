import React from "react";
import {Circle,Popup} from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 500,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 600,
    },
    deaths: {
        hex: "#393b44",
        multiplier: 3500,
    },
    active: {
        hex: "#0f3460",
        multiplier : 800,
    }
};

export const sortData =(data) =>{
    const SortedData = [...data];
    SortedData.sort((a,b)=>
    {
        if(a.cases >  b.cases){
            return -1;
        }else{
            return 1;
        }
    });
    // another way -> return SortedData.sort((a,b)=>(a.cases>b.cases? -1 :1))
    return SortedData;
};


export const sortIndiaData =(data) =>{
    const SortedIndiaData = [...data];
    SortedIndiaData.sort((a,b)=>
    {
        if(a.cases >  b.cases){
            return -1;
        }else{
            return 1;
        }
    });
    // another way -> return SortedData.sort((a,b)=>(a.cases>b.cases? -1 :1))
    return SortedIndiaData;
};

export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStatTotal = (stat) => 
stat ? `${numeral(stat).format("0.0a")}` : "0";

export const showDataOnMap = (data, casesType='cases') => 
    data.map((country) => (
        <Circle 
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
        <Popup>
            <div className="infocontainer">
                <div className="infoflag"
                    style={{backgroundImage:`url(${country.countryInfo.flag})`}}   
                ></div>
                <div className="infoname">{country.country}</div>
                <div className="infototaltests"><strong>Tests Done:</strong>{numeral(country.tests).format("0,0")}</div>
                <div className="infoactive"><strong>Active:</strong>{numeral(country.active).format("0,0")}</div>
                <div className="infototalcases"><strong>Cases:</strong>{numeral(country.cases).format("0,0")}</div>
                <div className="inforecovered"><strong>Recovered:</strong>{numeral(country.recovered).format("0,0")}</div>
                <div className="infodeaths"><strong>Deaths:</strong>{numeral(country.deaths).format("0,0")}</div>
            </div>
        </Popup>
        </Circle>
        
    ));

