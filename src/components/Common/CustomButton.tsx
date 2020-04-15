import styled from 'styled-components';



type BtnProps = {
    width?:string;
    height?:string;
}

export const CustomBtn = styled.button<BtnProps>`
    width:${props => props.width || '80px'};
    height:${props => props.height || '30px'};
    border:none;
    background:white;
    border-radius:10px;
    font-weight:bold;
    cursor:pointer; 
`