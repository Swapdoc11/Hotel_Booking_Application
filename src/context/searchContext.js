import { createContext, useReducer } from "react";

const INNITIAL_STATE = {
  city: "",
  dates: [],
  options: {
    adults: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INNITIAL_STATE);

export const SearchReducer = (state, action) => {
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
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INNITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}>

      {children}

    </SearchContext.Provider>
  );
};
