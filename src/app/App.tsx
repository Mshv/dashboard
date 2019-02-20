import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './components/Root';

declare let module: any

ReactDOM.render(<Root/> ,
document.getElementById('root'));


if (module.hot) {
    module.hot.accept();
 } 