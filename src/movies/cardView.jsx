import React, { useState, useEffect, useContext } from "react";
import  "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Form from "./from";


import {useSelector, useDispatch} from 'react-redux';

 function CardView(){

    const dispatch = useDispatch()
    const data = useSelector(state => state.data);
    const sortOrder = useSelector(state => state.sort);

    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState("releaseDate");
    const [addedSort, setAddedSort] = useState("releaseDate");
    const [movieAddPopup, setMovieAddPopup] = useState(false);
    const [sortPopup, setSortPopup] = useState(false);

    
    
    useEffect( () => {
        setMovies(data);
        const rank = new URLSearchParams(window.location.search).get('rank');
        if(rank){
            const rankFilter = data.filter((item) => item.rank == rank)
            rankFilter.length === 0 ? alert("No movie found on rank "+ rank) : setMovies(rankFilter);
            
        }
    },[data]);

    const dropSort = (value) => {
        
        setSort(value)
        setMovies(movies.sort((a, b) => (a[value] > b[value]) ? 1 : -1))
        // value=="rank" &&  setMovies(movies.sort((a, b) => (a.rank > b.rank) ? 1 : -1))

    }

    const AddSortOption = (e) => { 
        setAddedSort(e)
    }

    const updateSortOption = (e) => {
        e.preventDefault();
        const isFound = sortOrder.some(element => {
            if (element.valueToOrderBy == addedSort) {
                return true
            }
        });
        if(isFound){
            alert("Already Exist in Sort");
        }else{
            const sortData = {label: addedSort, valueToOrderBy: addedSort}
            dispatch({type:"addSort",sortData})
            alert("Sort option added Successfully.");
            setSortPopup(false)
        }
    }
 
    return(
        <>        
        <div className="container" style={{background:"Black", padding:"100px"}}>
            {/* ------sort filter------------- */}

            <div className="row">
                <div className="col-lg-12">
                    <div style={{float:"right"}} >

                        {/* -----sort add popup----- */}
                        <Popup  trigger={ <button className="btn btn-success" style={{margin:"10px"}}  position="right center">Add New Sort +</button>
                        } position="center right"  open={sortPopup}>
                            <div >
                                <div className="card">
                                    <form >
                                            <table>
                                                <tbody>
                                            <tr>
                                                <th><label>Options</label></th>
                                                <td>
                                                <select value={addedSort} className="" onChange={(e)=>AddSortOption(e.target.value)} >
                                                {movies[0] && Object.keys(movies[0]).map((listValue,index) => {
                                                return ( 
                                                    <option value={listValue} key={index}>{listValue.charAt(0).toUpperCase() + listValue.slice(1)}</option>
                                                    )
                                                })}
                                                </select>
                                                </td>
                                            </tr>
                                            <tr><button className="btn btn-success" onClick={(e) => updateSortOption(e)} >Add</button></tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </Popup>
                        {/* -------------------- */}
                        
                        {/* ----sort dropdown---- */}
                        <select value={sort} className="form-select" onChange={e => dropSort(e.target.value)}>
                            {sortOrder.map((sortValue, index) => {
                            return (
                                <option value={sortValue.valueToOrderBy} key={index}>{sortValue.label.charAt(0).toUpperCase() + sortValue.label.slice(1)}</option>
                                )
                            })}
                        </select>
                        {/* ------------------- */}
                    </div>

                    {/* --------add new movie popup------- */}

                    <Popup trigger={ <button className="btn btn-success">Add New Movie</button>                
                        } open={movieAddPopup} position="center right">
                        <div>
                        <div className="card" style={{width:"510px", paddingLeft:"50px",paddingTop:"240px",paddingBottom:"33px",background:"#808080"}}>
                            <Form/>
                        </div>
                        </div>
                    </Popup>
                    {/* ------------------------------- */}
                </div>
            </div>

            {/* ---------------------------- */}

            {/* -------movie card view------ */}
            <div className="row">
                {movies.map((listValue, index) => {
                    return ( 
                        
                        <Popup trigger={ 
                        <div className="col-lg-3"   style={{marginTop:"10px"}}>
                            <div className="card">
                            <img src={listValue.imageUrl} width={"100%"} />
                            <div className="container">
                                <h5><b>{listValue.title}</b></h5> 
                                <h6>Rank: <span style={{color:"green"}}>{listValue.rank}</span></h6>
                                <p>Released: {listValue.releaseDate}</p> 
                            </div>
                            </div>
                        </div> 
                        } position="center" key={index}>
                        <div>
                        <div className="card" style={{width:"300px"}}>
                            <img src={listValue.imageUrl} width={"100%"} />
                            <div className="container">
                                <h4><b>{listValue.title}</b></h4> 
                                <h5>Rank: <span style={{color:"green"}}>{listValue.rank}</span></h5> 
                                <h6>Released: {listValue.releaseDate}</h6>
                                <h6>Type: {listValue.type}</h6> 
                                <p>{listValue.synopsis}</p>
                            </div>
                            </div>
                        </div>
                        </Popup>
                    );
                })}
                
            </div>
            {/* ----------------------------- */}
        </div>
        </>      

    )
 }
 
 export default CardView;