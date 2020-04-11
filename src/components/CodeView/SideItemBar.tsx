import React from 'react';
import styled,{keyframes} from 'styled-components';


const SideSlideIn = keyframes`
    from {
        transform:translateX(-200px);
    }
    to {
        transform:translateX(0);
    }
`

const SideBlock = styled.div`
    width:200px;
    height:100vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background:${({theme}) => theme.codeView.sideItemBarbgcolor};
    animation-duration: 0.75s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-name: ${SideSlideIn};
`
const SideItemBar = () => {
    return (
        <SideBlock>
        </SideBlock>

    )
}

export default SideItemBar;