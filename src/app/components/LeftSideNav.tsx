import '@trendmicro/react-sidenav/dist/react-sidenav.css';  
import * as  React from "react";
// import {default as styled} from "styled-components";
// import {SideNav} from "@trendmicro/react-sidenav";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import {Nav} from "@trendmicro/react-sidenav";
import { Icon } from "react-icons-kit";
// import { ic_home as home } from "react-icons-kit/md/ic_home";
// import { ic_reorder as simple } from "react-icons-kit/md/ic_reorder";
// import { ic_donut_large as render } from "react-icons-kit/md/ic_donut_large";
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// const Text = styled.div`
//   padding-left: 8px;
// `;

const theme = {
  hoverBgColor: "#f5f5f5",
  selectionBgColor: "#f5f5f5",
  selectionIconColor: "#03A9F4"
};

//const SideNav = withRR4();

class LeftSideNav extends React.Component {

    state = { selectedPath: '' }

    onItemSelection = (arg) => {
        this.setState({ selectedPath: arg.path })
    }

    render() {

        return (
            <SideNav defaultSelectedPath="1">
            <Nav id="1">
               
                Item 1
            </Nav>
            <Nav id="2">
                
                Item 2
            </Nav>
            <Nav id="3">
                
                Item 3
            </Nav>
        </SideNav> 
            // <div>Something</div>
        );
    }
//   render() {
//     return (
//       <SideNav theme={theme} defaultSelectedPath={"home"}>
//         <Nav id="home">
//           <NavIcon>
//             {/* <Icon icon={home} />  */}
//           </NavIcon>
//           <Text>Home</Text>
//         </Nav>
//         <Nav id="basic">
//           <NavIcon>
//             {/* <Icon icon={simple} /> */}
//           </NavIcon>
//           <Text>Basic Example</Text>
//         </Nav>
//         <Nav id="renderitems">
//           <NavIcon>
//             {/* <Icon icon={render} /> */}
//           </NavIcon>
//           <Text>Render Ex. 1</Text>
//         </Nav>
//         <Nav id="renderitems2">
//           <NavIcon>
//             {/* <Icon icon={render} /> */}
//           </NavIcon>
//           <Text>Render Ex. 2</Text>
//         </Nav>
//       </SideNav>
//     );
//   } 
}

 export default LeftSideNav;