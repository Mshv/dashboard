const INITIAL_STATE = {
    users: [],
    roles: [],
    selectedUser:'',
    selectedRoleItems: [],
    handleClose:'',
  };
  
  function userRolePrivilageReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USERS':
        return { 
            ...state, 
            users: action.users
        };
        case 'SET_ROLES':
        return { 
            ...state, 
            roles: action.roles
        };
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