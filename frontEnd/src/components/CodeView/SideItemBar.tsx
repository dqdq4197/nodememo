import React from 'react';
import styled,{keyframes,css} from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Link} from 'react-router-dom';
import {Input} from '../Common/Input';
import {CodeMemoType} from '../../modules/codememo';

const SideSlideIn = keyframes`
    from {
        transform:translateX(-200px);
    }
    to {
        transform:translateX(0);
    }
`
const SideSlideOut = keyframes`
    from {
        transform:translateX(0);
    }
    to {
        transform:translateX(-200px);
    }
`
const SideBlock = styled.aside`
    position:fixed;
    width:250px;
    height:100vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background:${({theme}) => theme.codeView.sideItemBarbgcolor};
    box-shadow: 7px -1px 11px 0px rgba(0,0,0,0.2);
    animation-duration: 0.75s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-name: ${SideSlideIn};
    transition:background .2s;
`
const AddItemBlock = styled.div`
    padding-top:100px;
    max-width:100%;
    height:100%;
    padding-left:30px;

`

const AddItemBtn = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    margin:0 auto;
    width:80%;
    height:40px;
    background-color:transparent;
    border:1px dashed rgba(255,255,255,.8);
    border-radius:.3rem;
    &:hover {
        border:2px dotted rgba(255,255,255,.8);
        .icon {
            color:rgba(255,255,255,.8);
        }
    }
    .icon {
        font-size:2rem;
        color:rgba(255,255,255,.5);
    }
    transition:.5s;
`
const InputStyle = styled(Input) `
    padding-left:1rem;
    overflow:hidden;
    width:90%;
    &::after {
        content:"";
        width:3px;
        height:300px;
        background:${({theme}) => theme.palette.purple};
    }
`
const AddItem = styled.div`
    width:80%;
    margin:20px auto;
    height:40px;
    display: ${({isShow}:StyledProps) => isShow.isShow ? 'block': 'none'}; 
    border-radius:.3rem;
    animation-duration: 0.2s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    ${({isShow}) => isShow.isAni ? 
        css`
            animation-name: ${SideSlideIn}`:
        css`
            animation-name: ${SideSlideOut}
        `
    }
`
const Item = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    width:80%;
    height:50px;
    background:${({theme}) => theme.codeView.sideItembgcolor};
    color:white;
    border-radius:.5rem;
    margin:10px auto 5px;
    padding-left:20px;
    cursor:pointer;
    &:after {
        left: 0;
        position: absolute;
        content: '';
        border-radius:30px;
        width: 5px;
        height: 100%;
        background:${({theme}) => theme.codeView.sideItemAfter};
    }
    transition: .2s;
`
const ItemListBlock = styled.div`
    display:flex;
    flex-direction:column-reverse;
`
type StyledProps = {
    isShow:{
        isShow:boolean;
        isAni:boolean;
    };
}

type ItemProps = {
    addItem: () => void;
    isAddItem:{
        isShow:boolean;
        isAni:boolean;
    };
    addInput:React.MutableRefObject<any>;
    onEnterAddItem:React.KeyboardEventHandler<HTMLInputElement>;
    memoArray: CodeMemoType[],
}

const SideItemBar = ({addItem,isAddItem,addInput,onEnterAddItem,memoArray}:ItemProps) => {
    
    const itemList: React.ReactElement[] =memoArray.filter((item,index) => memoArray.findIndex(i => i.name === item.name) === index ).map(
        item => (
            <Link to={`/codeview/${item.name}`} key={item.name}>
              <Item >{item.name}</Item>
            </Link>
        )
    );

    
    return (
        <SideBlock>
            <AddItemBlock>
                <AddItemBtn onClick={addItem}>
                    <AddCircleOutlineIcon className="icon" />
                </AddItemBtn>
                <AddItem isShow={isAddItem}>
                    <InputStyle ref={addInput} onKeyDown={onEnterAddItem} width="100%" height="100%" bgcolor="black"/>
                </AddItem>
                <ItemListBlock>
                    {itemList}          
                </ItemListBlock>
            </AddItemBlock>
        </SideBlock>

    )
}

export default SideItemBar;