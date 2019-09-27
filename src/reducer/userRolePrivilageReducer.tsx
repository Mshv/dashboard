const INITIAL_STATE = {
    users: [],
    roles: [],
    selectedUserIndex: -1,
    selectedRoleItems: [],
    open: false,
    hasErrorUser: false,
    hasErrorRole: false,
  };
  
  function userRolePrivilageReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USERS':
        console.log(action.users);
        return { 
            ...state, 
            users: action.users.data
        };
        case 'SET_ROLES':
        return { 
            ...state, 
            roles: action.roles.data
        };
        case 'USER_INDEX':
        return { 
            ...state, 
            selectedUserIndex: action.value
        };
        case 'ROLE_ITEMS':
        return { 
            ...state, 
            selectedRoleItems: action.value
        };
      case 'ASSIGN_ROLE_TO_USER':
        return { 
            ...state, 
            selectedRoleItems: state.selectedRoleItems.push([action.selectedRoleItem])
        };
        case 'UNASSIGN_ROLE_TO_USER':
        return { 
            ...state, 
            selectedRoleItems: this.state.selectedRoleItems.filter(function(selectedRoleItems) { 
                return selectedRoleItems !== action.removeRoleItem
            }),
        };
        case 'DIALOG':
        return { 
            ...state, 
            open: action.value
        };
        case 'ERROR_USER':
        return { 
            ...state, 
            hasErrorUser: action.value
        };
        case 'ERROR_ROLE':
        return { 
            ...state, 
            hasErrorRole: action.value
        };
      default: return state;
    }
  }
  export default userRolePrivilageReducer;