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
    return  {
                data: state.data.data.components[1].items,
                sort: state.data.data.components[0].items
            }
}

const store = createStore(movieReducer);

export default store;