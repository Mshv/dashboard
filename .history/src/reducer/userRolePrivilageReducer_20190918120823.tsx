const INITIAL_STATE = {
    selectedRoleItems: [],
  };
  
  function userRolePrivilageReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ASSIGN_ROLE':
        return { 
            ...state, 
            selectedRoleItems: state.selectedRoleItems.push([action.selectedRoleItem])
        };
      default: return state;
    }
  }
  export default userRolePrivilageReducer;