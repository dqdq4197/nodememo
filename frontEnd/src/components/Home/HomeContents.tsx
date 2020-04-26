import React from 'react';
import styled,{keyframes} from 'styled-components';
import Motion from './Motion';

const slideFadeIn = keyframes`
    from {
        transform:translateY(-100px);
        opacity:0;
    }
    to {
        transform:translateY(0);
        opacity:1;
    }
`
const TitleBlock = styled.div`
    width:1000px;
    height:700px;
    color:${({theme}) => theme.palette.basic};
    h1 {
        margin-top:200px;
        font-size:3rem;
        animation-duration:1s;
        animation-name:${slideFadeIn};
        transition:color .2s;
    }
    
    
`
const HomeCotents = () => {
    return (
        <>
            <TitleBlock>
                <h1>WELCOME TO CODE MEMO</h1>
                <Motion/>
            </TitleBlock>
        </>
    )
}

export default HomeCotents;