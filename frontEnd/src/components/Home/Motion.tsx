import React from 'react';
import styled,{keyframes} from 'styled-components';
import {Link} from 'react-router-dom';

const StartAni = keyframes`
    from {
        transform: translate(calc(var(--i) * 60px), calc(var(--i) * -60px)); 
    }
    to {
        transform: translate(calc(var(--i) * 25px), calc(var(--i) * -25px)); 
    }
`

const MotionBlock = styled.div`
    position:relative;
    display:flex;
    transfrom-style:preserve-3d;
    transform:rotate(-25deg) skew(25deg);   
    top: 100px;
    left: 800px;
    width: 100px;
    height: 100px;
    box-shadow: -15px 15px 20px 8px rgba(0,0,0,.6);
    span {
        position:absolute;
        width:100px;
        height:100px;
        top:0;
        left:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:${({theme}) => theme.home.motionBgcolor};
        color:${({theme}) => theme.home.motionColor};
        font-size:20px;
        animation-duration:1s;
        animation-name:${StartAni};
        font-weight:bold;
        &:hover {
            margin-top:70px;
        }
        &:nth-child(5) {
            transform:translate(100px, -100px);
            
        }
        &:nth-child(4) {
            transform:translate(75px, -75px);
        }
        &:nth-child(3) {
            transform:translate(50px, -50px);
        }
        &:nth-child(2) {
            transform:translate(25px, -25px);
        }
        &:nth-child(1) {
            transform:translate(0, 0);
            &:hover {
                margin-top:0;
            }
        }
        &:before {
            content:'';
            position:absolute;
            bottom:-10px;
            left:0;
            width:100px;
            background:#2a2a2a;
            height:10px;
            transform-origin:top;
            transform:skewX(-41deg);
        }
        &:after {
            content:'';
            position:absolute;
            top:4px;
            bottom:0;
            width:9px;
            height:102px;
            background:#2a2a2a;
            left:-9px;
            transform-origin:top;
            transform:skewY(-41deg);
        }
        transition:margin .5s, color 1s, background .4s;
    }
    
    
    
    
    
`
const Motion = () => {
    return (
        <>
            <MotionBlock>
                <Link to='/codeview'><span style={{'--i':0} as React.CSSProperties } >&lt; /&gt;</span></Link>
                <span style={{'--i':1} as React.CSSProperties }>Node</span>
                <span style={{'--i':2} as React.CSSProperties }>React</span>
                <span style={{'--i':3} as React.CSSProperties }>Typescript</span>
                <span style={{'--i':4} as React.CSSProperties }>javasript</span>
            </MotionBlock>
        </>
    )
}

export default Motion;