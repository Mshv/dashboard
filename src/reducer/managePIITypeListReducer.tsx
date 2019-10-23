import * as Collections from "typescript-collections";

const initialState = {
  
  piiTypes: [],
  selected: [],
  selectedCheckboxes: new Collections.Set()
  };
  
  function managePIITypeListReducer(state = initialState, action) {
    switch (action.type) {
      case 'undefined':
        return initialState ;
        case 'piiTypes':
        return { 
          ...state, 
          piiTypes: action.piiTypes,
        };
        case 'selected':
        return { 
          ...state, 
          selected: action.selected,
        };
        case 'selectedCheckboxes':
        return { 
          ...state, 
          selectedCheckboxes: action.selectedCheckboxes,
        };
      default:
        return state
      }
  }
  
  export default managePIITypeListReducer;