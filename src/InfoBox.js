import React from 'react';
import './InfoBox.css';
import {Card , CardContent , Typography} from "@material-ui/core";
function InfoBox({title,increaseincases,isViolet,isRed,isGrey,active,total,  ...props  }) {
    return (
        <Card  onClick={props.onClick}
        className={`infobox ${active && 'infobox--selected'} ${isRed && 'infobox--red'} ${isGrey && 'infobox--grey'} ${isViolet && 'infobox--violet'}`}>
            <CardContent className="card info">
                <Typography className="infoboxtitle">
                    {title}
                </Typography>
                <Typography className="infoboxtotal" color="textSecondary" >{total} Total</Typography>
                <h2 className={`infobox__cases ${!isRed && "infobox__cases--green"} ${isGrey &&"infobox__cases--grey"}`}>{increaseincases}</h2>
                
                 
            </CardContent>
        </Card>
    )
}

export default InfoBox;
