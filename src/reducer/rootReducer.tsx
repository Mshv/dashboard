import datasourceReducer from './datasourceReducer';
import piiSettingReducer from './piiSettingReducer';
import loginReducer from './loginReducer';
import { combineReducers } from 'redux';
import datasourceListReducer from './datasourceListReducer';

const rootReducer = combineReducers({
    login: loginReducer,  
    datasourceList: datasourceListReducer,
    datasource: datasourceReducer,
    piiSetting: piiSettingReducer,
    // job: jobReducer,
    // setting: settingReducer,
  });
export default rootReducer;