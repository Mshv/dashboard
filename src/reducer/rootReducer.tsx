import datasourceReducer from './datasourceReducer';
import piiSettingReducer from './piiSettingReducer';
import loginReducer from './loginReducer';
import { combineReducers } from 'redux';
import datasourceListReducer from './datasourceListReducer';
import userRolePrivilageReducer from './userRolePrivilageReducer';
import managePIITypeReducer from './managePIITypeReducer';
import managePIITypeListReducer from './managePIITypeListReducer';

const rootReducer = combineReducers({
    login: loginReducer,  
    datasourceList: datasourceListReducer,
    datasource: datasourceReducer,
    piiSetting: piiSettingReducer,
    userRolePrivilage:userRolePrivilageReducer,
    piiType:managePIITypeReducer,
    piiList:managePIITypeListReducer,
    // job: jobReducer,
    // setting: settingReducer,
  });
export default rootReducer;