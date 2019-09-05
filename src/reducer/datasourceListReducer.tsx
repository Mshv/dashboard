import * as Collections from "typescript-collections";

const initialState = {
  
  datasources: [],
  selected: [],
  selectedCheckboxes: new Collections.Set()
  };
  
  function datasourceListReducer(state = initialState, action) {
    switch (action.type) {
      case 'undefined':
        return initialState ;
        case 'datasources':
        return { 
          ...state, 
          datasources: action.datasources,
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
  
  export default datasourceListReducer;