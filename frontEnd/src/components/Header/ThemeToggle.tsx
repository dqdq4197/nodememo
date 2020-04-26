import React from 'react';
import styled,{keyframes,css} from 'styled-components';


const Container = styled.div`
    position:relative;
    z-index:999;
    width:100px;
    height:30px;
    margin-right:20px;
    p {
        text-align:center;     
        transition:color .7s;
        font-weight:bold;
        margin-top:3px;
        color:${({active}:ActiveType) => active==='DarkMode' ? 'white' : 'black'};
    }
`

const slideRight = keyframes`
    0%{
        left:0px;
    }
    50% {
        width:70px
    }
    to {
        left:50px;
        width:50px;
    }
`

const slideLeft = keyframes`
    0% {
        left:50px;
    }
    50% {
        width:70px;
    }
    100% {
        left:0px;
        width:50px;
    }
`
const ToggleButton = styled.button`
    position:relative;
    background-color:${({theme}) => theme.palette.purple};
    cursor:pointer;
    width:50px;
    height:100%;
    border:0;
    left:${({active}:StyleProps) => active==='LightMode' ? '50px' : 0};
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    ${({active,isChange}:StyleProps) => active ==='LightMode' ?
     isChange && css`
        animation-name: ${slideRight};
     ` 
     :
     isChange&&  css`
        animation-name: ${slideLeft}
     `
    }
`
const ToggleBlock= styled.div`
    border-radius:5px;
    overflow:hidden;
    width:100%;
    height:100%;
    background-color:${({theme}) => theme.bgtoggle};
    transition:background .2s;
    
`
type ThemeProps = {
    onChangeTheme: () => void;
    active:string;
    isChange:boolean;
}
type StyleProps = {
    active:string;
    isChange:boolean;
}
type ActiveType = {
    active:string;
}

const ThemeToggle =({onChangeTheme,active,isChange}:ThemeProps) => {
    return (
        <Container active={active}>
            <ToggleBlock className="toggle">
                <ToggleButton onClick={onChangeTheme} active={active} isChange={isChange}/>
            </ToggleBlock>
            <p>{active}</p>
        </Container>
    )
}

export default ThemeToggle;