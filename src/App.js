import React ,{useState,useEffect}from "react";
import './App.css';
import {FormControl, MenuItem as Menuitem,Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData,prettyPrintStat ,prettyPrintStatTotal} from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Flip from 'react-reveal/Flip';
import {Helmet} from 'react-helmet';
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Slide from 'react-reveal/Slide';
import { Button } from "react-bootstrap";
import India from "./India";


 function App() {
   const [countries, setcountries] = useState([]);
   const [defcountry, setdefcountry] = useState("Worldwide");
   const [countryInfo, setcountryInfo] = useState({});
   const [TableData, setTableData] = useState([]); 
   const [mapcenter, setmapcenter] = useState({lat: 21.80746 , lng:  79.4786});
   const [zoomcenter, setzoomcenter] = useState(3);
   const [mapCountries, setmapCountries] = useState([]);
   const [casesType, setcasesType] = useState("cases");
   


  useEffect (()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data) => {
      setcountryInfo(data);
    });
  },[]);

   useEffect(() => {
     const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
             const countries =data.map((country) =>({
              name: country.country,
              value :country.countryInfo.iso2
            }
            ));
            const SortedData = sortData(data);
            setTableData(SortedData);
            setmapCountries(data);
            setcountries(countries);
      });
     };
     getCountriesData();
   }, []);


 


   const handleCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "worldwide"
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setdefcountry(countryCode);
        setcountryInfo(data);
        if(countryCode === 'worldwide'){
          setmapcenter(mapcenter);
          setzoomcenter(zoomcenter);         
        } else {
          setmapcenter([data.countryInfo.lat, data.countryInfo.long]);
          setzoomcenter(4);
        }
      });
  
  };
   const activeshow = () =>{
     window.alert("Active Cases per Country given in the Table 😄 ");
   };



   return (
    <React.Fragment>
    <Helmet>
    <title>Covid 19 Tracker</title>
    <meta
      name="title"
      content="Coronavirus Outbreak in India: Latest Map and Case Count"
      />
    </Helmet>
    <Router>
    <Switch>
    
      <Route path = "/india">
      <India />
      </Route>
    <Route path = "/">
   
     <div className="App">
       <div className="Appleft">
        <div className="App_header">
          <h1> Covid-19 Tracker</h1>
          <Link to ="/india"> 
          <Button variant="link" size="lg">Indian and USA (Statewise)</Button>
          
          </Link>
          <FormControl classname="App_dropdown">
            <Select variant="outlined" onChange={handleCountryChange} value={defcountry}>   
              <Menuitem value="Worldwide">Worldwide</Menuitem>
              {
                countries.map(country =>(
                  <Menuitem value={country.value}>{country.name}</Menuitem>
                ))
             }
            </Select>
          </FormControl>
        </div>
      <div className="stats">
       <Flip top>
        <InfoBox 
          isRed
          active={casesType ==="cases"}
          onClick={(e)=>setcasesType("cases")}
          title="Total Cases"
          increaseincases={prettyPrintStat(countryInfo.todayCases)}
          total={prettyPrintStatTotal(countryInfo.cases)}/>
          </Flip>
          <Flip bottom>
          <InfoBox
            active={casesType ==="recovered"}
            onClick={(e)=>setcasesType("recovered")}
            title="Recovered"
            increaseincases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStatTotal(countryInfo.recovered)}
          />
          </Flip>
          <Flip top>
        <InfoBox
          isGrey
          active={casesType ==="deaths"}
          onClick={(e)=>setcasesType("deaths")}
          title="Deaths"
          increaseincases={prettyPrintStat(countryInfo.todayDeaths)}
          total={prettyPrintStatTotal(countryInfo.deaths)}
        />
        </Flip>
        <Flip bottom>
        <InfoBox
          isViolet
          onClick={activeshow}
          title="Active Cases"
          total={prettyPrintStatTotal(countryInfo.active)} 
        />
        </Flip>
        </div>
        <Map 
            casesType={casesType}
            countries={mapCountries}
            center={mapcenter}
            zoom={zoomcenter}
          />
     </div>
           
     <Card className="Appright">
     <Slide right cascade>
        <CardContent className="rightcontent">
             <h4>Live Cases By Country</h4>
             <Table countries={TableData}/>
             <h4 className="graphtitle">Worldwide total {casesType} </h4>
             <h3 className="graphinfo">Graph data available for Worldwide..</h3>
             <LineGraph className="graph" casesType={casesType}/>
            
        </CardContent>
        </Slide>  
    </Card>
     
   </div>
   
   </Route>
   </Switch>
  </Router>
  </React.Fragment>
   )
}


export default App;
