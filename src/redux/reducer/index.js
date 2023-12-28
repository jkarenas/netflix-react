import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "../actions/types"
const initialState = {
    list: [],
}
const rootReducer = (state=initialState,actions) => {
    let {type,payload} = actions


    switch(type){

        case ADD_FAVORITE:
            return {
                ...state,
                list:[...state.list,payload]
            }

        case DELETE_FAVORITE:
            return {
                ...state,
                list:state.list.filter(item => item.id !== Number(payload))
            }

        case GET_FAVORITES:    
            return {
                ...state,
                list: payload
            }



        default: 
        return {
            ...state
        }
    }

}

export default rootReducer