import React from 'react';
import styled from 'styled-components';
import NavIconBlock from '../../components/SideNav/NavIconBlock';

const NavBlock = styled.div`
    position:fixed;
    display:flex;
    align-items:center;
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
        <NavBlock>
            <NavIconBlock/>
        </NavBlock>
    )   
}

export default SideNav;