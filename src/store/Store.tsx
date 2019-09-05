import { createStore } from 'redux';
import rootReducer from '../reducer/rootReducer';

const Store = createStore(rootReducer);
export default Store;