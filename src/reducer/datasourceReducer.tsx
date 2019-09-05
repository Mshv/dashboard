const initialState = {
  dataSourceCategories: [],
  selectedDataSourceCategory: "",

  dataSourceTypes: [],
  selectedDataSourceType: "",

  identifier: "",
  dataSourceName: "",
  driver: "",
  protocol: "",
  ip: "",
  port: "",
  version: "",
  user: "",
  password: "",

  open: false,

  formErrors: { identifier: "", dataSourceName: "" },
  identifierValid: false,
  dataSourceNameValid: false,
  formValid: false,

  textmask: "    .    .    .    ",
  justify: "center",
  alignItems: "center",
  datasources: [],
  isEdit: false,
  dsId: "",
  hasErrorDataSourceCategory: false,
  hasErrorDataSourceType: false,
  hasErrorDataSourceName: false,
  hasErrorDriver:false,
  hasErrorProtocol:false,
  hasErrorIdentifier:false,
  hasErrorIP:false
  };
  
function datasourceReducer(state = initialState, action) {
  switch (action.type) {
    case 'undefined':
      return initialState ;
    case 'selectedDataSourceCategory':
      return { 
        ...state, 
        selectedDataSourceCategory: action.selectedDataSourceCategory,
      };
    default:
      return state
    }
}
  
export default datasourceReducer;