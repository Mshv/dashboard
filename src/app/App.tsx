import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './components/Root';
import { Provider } from 'react-redux';
import store from '../store/Store'
declare let module: any


ReactDOM.render(<Provider store={store}><Root/></Provider> ,
document.getElementById('root'));


if (module.hot) {
    module.hot.accept();
 } 