const initialState = {
  piiTypeName: "",
  hasErrorPIIType: false,
  
  dataTypeId:0,

  hasErrorDataType: false,
  dataTypes:[],

  subDataTypes: [],
  subDataTypeName:"",
  hasErrorSubDataType:false,

  techniques:[],
  technique:"",
  hasErrorTechnique:false,

  securityTypes:[],
  securityType:"",
  hasErrorSecurityType:false,

  open:false,

  piiTypeId:"",
  isEdit:false,
  };
  
function managePIITypeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PII_TYPE_NAME':
      return { 
        ...state, 
        piiTypeName: action.piiTypeName,
      };
      case 'ERROR_PII_TYPE':
      return { 
        ...state, 
        hasErrorPIIType: action.value,
      };
      case 'SET_DATA_TYPE':
      return { 
        ...state, 
        dataTypeId: action.dataTypeId,        
      };
      case 'ERROR_DATA_TYPE':
      return { 
        ...state, 
        hasErrorDataType: action.value,
      };
      case 'SET_DATA_TYPES':
      return { 
        ...state, 
        dataTypes: action.dataTypes,
      };
      case 'SET_SUB_DATA_TYPES':
      return { 
        ...state, 
        subDataTypes: action.subDataTypes,
      };
      case 'SET_SUB_DATA_TYPE':
      return { 
        ...state, 
        subDataTypeName: action.subDataTypeName,
      };
      case 'ERROR_SUB_DATA_TYPE':
      return { 
        ...state, 
        hasErrorSubDataType: action.value,
      };
      case 'SET_TECHNIQUES':
      return { 
        ...state, 
        techniques: action.techniques,
      };
      case 'SET_TECHNIQUE':
      return { 
        ...state, 
        technique: action.techniqueItem,
      };
      case 'ERROR_TECHNIQUE':
      return { 
        ...state, 
        hasErrorTechnique: action.value,
      };
      case 'SET_SECURITY_TYPES':
      return { 
        ...state, 
        securityTypes: action.securityTypes,
      };
      case 'SET_SECURITY_TYPE':
      return { 
        ...state, 
        securityType: action.securityType,
      };
      case 'ERROR_SECURITY_TYPE':
      return { 
        ...state, 
        hasErrorTechnique: action.value,
      };
      case 'DIALOG_STATE':
      return { 
          ...state, 
          open: action.open,
      };
      case 'PII_TYPE_ID':
      return { 
          ...state, 
          piiTypeId: action.piiTypeId,
      };
      case 'IS_EDIT_MODE':
      return { 
          ...state, 
          isEdit: action.isEdit,
      };
    default:
      return state
    }
}
  
export default managePIITypeReducer;