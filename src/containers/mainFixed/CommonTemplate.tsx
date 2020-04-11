import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
import styled from 'styled-components';

const CommonBlock = styled.div`
`

const CommonTemplate = () => {
    return (
        <CommonBlock>
            <Header/>
            <SideNav/>
        </CommonBlock>
    )
}

export default CommonTemplate;