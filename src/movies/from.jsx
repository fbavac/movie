// import React from 'react'
import React, { useState, useEffect, useContext } from "react";
import  "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from 'react-redux';

function Form(props){

    const [formData, updateFormData] = useState(null);


    const data = useSelector(state => state.data);
    const sortOrder = useSelector(state => state.sort);
    const dispatch = useDispatch()


    const addHandler = (e) => {
        e.preventDefault()
        dispatch({type:"add",formData})
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    return(
            <div className="container" style={{background:"grey"}}>
                <div className="row">
                <div className="col-lg-12" >
                    <h5 style={{textAlign:"center"}}>Add New Movie</h5>
                    <form >
                        <table>
                        <tbody>
                        <tr>
                            <th><label>Title: </label></th>
                            <td><input 
                                type="text" 
                                name="title" 
                                className="form-control" 
                                // value={inputs.username || ""} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>Rank: </label></th>
                            <td><input 
                                type="number" 
                                name="rank"
                                className="form-control"  
                                // value={inputs.username || ""} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>ImageUrl: </label></th>
                            <td><input 
                                type="text" 
                                name="imageUrl" 
                                className="form-control" 
                                // value="https://preview.ibb.co/fn5Xyp/raiders.jpg" 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>Release Date: </label></th>
                            <td><input 
                                type="number" 
                                name="releaseDate" 
                                className="form-control" 
                                // value={inputs.username || ""} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>synopsis: </label></th>
                            <td><textarea 
                                type="text" 
                                name="synopsis" 
                                className="form-control" 
                                // value={inputs.username || ""} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label></label></th>
                            <td><button className="btn btn-success" onClick={addHandler} >Add</button></td>
                        </tr>
                        </tbody>
                        </table>    
                    </form>
                </div>
            </div>    
            </div>       

    )
 }
 
 export default Form;