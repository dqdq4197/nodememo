import React from 'react';
import styled from 'styled-components';
import CodeList from './CodeList';
import {Input, TextArea} from '../Common/Input';



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
`

const CodeEdit = styled.textarea`
    position:absolute;
    width:100%;
    height:300px;
    background:transparent;
    border:none;
    color:transparent;
    z-index:111;
    &:focus {
        outline:none;
    }
`

const CodeNote = styled.div`
    position:absolute;
    height:300px;
    z-index:111;
`
const CodeContent = styled.div`
    position:relative;
    grid-column-start: 1;
    width:500px;
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


type CodeEditorProps = {
    code:string;
    onCodeChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    memoArray:[];
}

const CodeEditor = ({code,onCodeChange,memoArray}:CodeEditorProps) => {
    return (
        <EditorBlock>
            <CodeBlock>
                <CodeContent>
                    <div className='after'/>
                    <Input autocomplete="off" name="TITLE" size="1rem" padding=".7rem" fontSize="24px" width="90%" margin="1rem"/>
                    <TextArea placeholder="CONTENT" width="90%" fontSize="16px" marginLeft="1rem"/>
                </CodeContent>
                <CodeEditBlock>
                    <CodeEdit value={code} onChange={onCodeChange}/>
                    <CodeNote id='code' style={{color:'white'}}/>
                </CodeEditBlock>
            </CodeBlock>
                <CodeList memoArray={memoArray}/>
        </EditorBlock>
    )
}

export default CodeEditor;