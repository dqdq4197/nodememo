import React from 'react';
import styled from 'styled-components';


const TemplateBlock = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    max-width: 100%;
    min-height:100vh;
    background:${({theme}) => theme.bgcolor};
    transition:background .2s;
`
const ContentsBlock = styled.div`
    
`

type TemplateProps = {
    children?:React.ReactNode;
}
const HomeTemplate = ({children}:TemplateProps) => {
    return (
        <TemplateBlock>
            <ContentsBlock>
                {children}
            </ContentsBlock>
        </TemplateBlock>

    )
}

export default HomeTemplate;