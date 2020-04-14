import React from 'react';
import styled from 'styled-components';
import CodeList from './CodeList';
import {Input, TextArea} from '../Common/Input';
import {CodeMemoType} from '../../modules/codememo';



const EditorBlock = styled.div`
    width:100%;
    height:auto;
    padding-left:300px;
    padding-top:80px;
`

const CodeBlock = styled.div`
    display: grid;
    column-gap: 100px;
    padding-right: 80px;
    grid-template-columns: 1fr 1fr;
`

const CodeEditBlock = styled.div`
    position:relative;
    z-index:1;
    grid-column-start: 2;
    overflow:hidden;
`

const CodeEdit = styled.textarea`
    width:100%;
    min-height:300px;
    background:transparent;
    border:none;
    font-size:14px;
    color:white;
    z-index:111;
    &:focus {
        outline:none;
    }
    background:${({theme}) => theme.Common.inputFocusBgColor};
    display:${({isShow}:StyledProps) => isShow? 'none' : 'block'};
    
`

const CodeNote = styled.div`
    min-height:300px;
    z-index:111;
    display:${({isShow}:StyledProps) => isShow? 'block' : 'none'};
    font-size:14px;
    .hljs{
        background:transparent;
    }
    pre {
        margin:0;
        code {
            padding:0;  
            line-height: 1.5;
        }
    }
`
const CodeContent = styled.div`
    position:relative;
    grid-column-start: 1;
    height:300px;
    border-radius:50px;
    .after {
        position:absolute;
        display:inline-block;
        width:8px;
        height:100%;
        background:#60f;
        border-radius:200px;
    }
`

type StyledProps = {
    isShow:boolean;
}
type CodeEditorProps = {
    // code:string;
    // onCodeChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onPreView: () => void;
    memoArray:CodeMemoType[];
    codeRef:React.MutableRefObject<any>;
    isShow:boolean;
}

const CodeEditor = ({onPreView,memoArray,codeRef,isShow}:CodeEditorProps) => {
    return (
        <EditorBlock>
            <CodeBlock>
                <CodeContent>
                    <div className='after'/>
                    <Input autocomplete="off" name="TITLE" size="1rem" padding=".7rem" fontSize="24px" width="90%" margin="1rem"/>
                    <TextArea placeholder="CONTENT" width="90%" fontSize="16px" marginLeft="1rem"/>
                </CodeContent>
                <CodeEditBlock>
                    <CodeEdit ref={codeRef} isShow={isShow} />
                    <CodeNote id='code' isShow={isShow} style={{color:'white'}}/>
                    <button onClick={onPreView}>미리보기</button>
                </CodeEditBlock>
            </CodeBlock>
                <CodeList memoArray={memoArray}/>
        </EditorBlock>
    )
}

export default CodeEditor;