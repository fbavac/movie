import { createStore } from "redux";
import JsonData from '../movies/data.json'

const data = {
    data :JsonData
}

const movieReducer = (state = {data: data}, action) => {
    
    if(action.type === "add"){  //add movie
        const newData = {"id": 15,
                        "type": "poster",
                        "rank": action.formData.rank,
                        "synopsis": action.formData.synopsis,
                        "title": action.formData.title,
                        "imageUrl": action.formData.imageUrl,
                        "releaseDate": action.formData.releaseDate, }

        state.data =  state.data.concat(newData);
        return{
            data:state.data,
            sort:state.sort
        }
    }
    if(action.type === "addSort"){ //add sort options
        state.sort =  state.sort.concat(action.sortData);
        return {
           
            data : state.data,
            sort : state.sort
        }
    }
    
    const movieList = state.data.data.components.filter((item) => item.type == "movie-list")
    const sortList = state.data.data.components.filter((item) => item.type == "order-select")
    return  {
                
                data: movieList[0].items,
                sort: sortList[0].items
            }
}

const store = createStore(movieReducer);

export default store;