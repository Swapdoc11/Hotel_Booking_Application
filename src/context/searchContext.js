import { createContext } from "react"


const INNITIAL_STATE = {
    city:'',
    dates:[],
    options:{
        adults:undefined,
        children:undefined,
        room:undefined,
    },
}

const searchContext = createContext(INNITIAL_STATE)

export const searchReducer = (state,action) =>{
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
            break;
        case "RESET_SEARCH":
            return INNITIAL_STATE;
            break;
        default:
            return state;
            break;
    }
}

