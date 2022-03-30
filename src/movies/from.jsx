// import React from 'react'
import React, { useState, useEffect, useContext } from "react";
import  "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from 'react-redux';
import Joi from "joi-browser";


function Form(props){

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        rank: "",
        imageUrl: "",
        releaseDate: "",
        synopsis: "",
      });
    
    
    const data = useSelector(state => state.data);
    const sortOrder = useSelector(state => state.sort);
    const dispatch = useDispatch()

    const schema = {
        title: Joi.string().min(1).max(20).required(),
        rank: Joi.number().required(),
        imageUrl: Joi.string().required(),
        releaseDate: Joi.number().min(1980).required(),
        synopsis: Joi.string().required(),
    };

    const addHandler = (e) => {
        e.preventDefault()
        validateForm(e);
        if(Object.keys(errors).length === 0){
            dispatch({type:"add",formData})
            clearState()
        }

    }

    const clearState = () => {
        setFormData({
            title: "",
            rank: "",
            imageUrl: "",
            releaseDate: "",
            synopsis: "",
        });
    };

    const handleChange = (e) => {

        // validation
        const { name, value } = e.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(e);
        if (errorMessage) {
          errorData[name] = errorMessage;
        } else {
          delete errorData[name];
        }
        let formDataData = { ...formData };
        formDataData[name] = value;
        setFormData(formDataData);
        setErrors(errorData);

    };

    const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
    };

    
    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(formData, 
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            return null;
        } else {
            const errorData = {};
            for (let item of error.details) {
            const name = item.path[0];
            const message = item.message;
            errorData[name] = message;
            }
            // console.log(errors);
            setErrors(errorData);
            return errorData;
        }
    };

    return(
            <div className="container from-bg"  >
                <div className="row">
                <div className="col-lg-12" >
                    <h5 style={{textAlign:"center"}}>Add New Movie</h5><br></br>
                    <form >
                   
                    {errors.title && ( <div><span className="text-danger"> {errors.title} </span></div>)}
                    {errors.rank && ( <div><span className="text-danger"> {errors.rank} </span></div>)}
                    {errors.imageUrl && ( <div><span className="text-danger"> {errors.imageUrl} </span></div>)}
                    {errors.releaseDate && ( <div><span className="text-danger"> {errors.releaseDate} </span></div>)}
                    {errors.synopsis && ( <div><span className="text-danger"> {errors.synopsis} </span></div>)}
                
                        <table>
                        <tbody>
                        <tr>
                        </tr>
                        <tr>
                            <th><label>Title: </label></th>
                            <td><input 
                                type="text" 
                                name="title" 
                                className="form-control" 
                                value={formData.title} 
                                onChange={handleChange}
                            /> </td>
                        </tr>
                        <tr>
                            <th><label>Rank: </label></th>
                            <td><input 
                                type="number" 
                                name="rank"
                                className="form-control"  
                                value={formData.rank} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>ImageUrl: </label></th>
                            <td><input 
                                type="text" 
                                name="imageUrl" 
                                className="form-control" 
                                value={formData.imageUrl} 
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>Release Date: </label></th>
                            <td><input 
                                type="number" 
                                name="releaseDate" 
                                className="form-control" 
                                value={formData.releaseDate}  
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <th><label>synopsis: </label></th>
                            <td><textarea 
                                type="text" 
                                name="synopsis" 
                                className="form-control" 
                                value={formData.synopsis} 
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