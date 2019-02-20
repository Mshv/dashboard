import * as React from 'react';
import NavBar from './NavBar'
import Connection from './Connection'
import LeftSideNav from './LeftSideNav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Root extends React.Component {
   render() {
   return (
   <div>
   <NavBar></NavBar>
   <LeftSideNav></LeftSideNav>
   <h1>Connection configuration</h1>
   <Connection></Connection>
   </div>
   )
   }
}

export default Root;