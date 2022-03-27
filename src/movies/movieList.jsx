import React, { useState, useEffect, useContext } from "react";
import  "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardView from "./cardView";
import 'reactjs-popup/dist/index.css';

 function MovieList(){
    
    return(
        <div style={{background:"grey"}}>
            <CardView/>
        </div>       

    )
 }
 
 export default MovieList;