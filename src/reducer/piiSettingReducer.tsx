const INITIAL_STATE = {
    searchTerm: '',
  };
  
  function piiSettingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'SEARCH_SET':
        return { ...state, searchTerm: action.searchTerm };
      default: return state;
    }
  }
  
  export default piiSettingReducer;