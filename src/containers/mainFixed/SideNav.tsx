import React from 'react';
import styled from 'styled-components';


const NavBlock = styled.div`
    position:fixed;
    width:60px;
    height:100vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background:${({theme}) => theme.sidebarbgcolor};
    transition:background .2s;
    z-index:111;
`
const SideNav = () => {
    return (
        <NavBlock/>
    )   
}

export default SideNav;