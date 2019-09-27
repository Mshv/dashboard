const INITIAL_STATE = {
    users: [],
    roles: [],
    selectedRoleItems: [],
  };
  
  function userRolePrivilageReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ASSIGN_ROLE_TO_USER':
        return { 
            ...state, 
            selectedRoleItems: state.selectedRoleItems.push([action.selectedRoleItem])
            // selectedRoleItems: state.selectedRoleItems.concat([action.selectedRoleItem]) // solution no 2
        };
        case 'UNASSIGN_ROLE_TO_USER':
        return { 
            ...state, 
            selectedRoleItems: this.state.selectedRoleItems.filter(function(selectedRoleItems) { 
                return selectedRoleItems !== action.removeRoleItem
            }),
        };
      default: return state;
    }
  }
  export default userRolePrivilageReducer;