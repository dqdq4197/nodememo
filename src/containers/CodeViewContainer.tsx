import React,{useState ,useRef} from 'react';
import SideItemBar from '../components/CodeView/SideItemBar';
import CodeEditor from '../components/CodeView/CodeEditor';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../modules';
import {additem} from '../modules/codememo';
import html from 'highlight.js/lib/languages/xml';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atelier-cave-dark.css';
hljs.registerLanguage('html', html);
hljs.registerLanguage('javascript', javascript);


const CodeViewBlock = styled.div`
    display:flex;
    width:100%;
    min-height:100vh;   
    background:${({theme}) => theme.codeView.bgcolor};
    z-index:-2;
    transition:background .2s;
`

const SideViewBlock = styled.aside`
    position:fixed;
    height:100%;
    width: calc(50% - 125px);
    background:${({theme}) => theme.codeView.sideCodeViewBgcolor};
    top:0;
    right:0px;
`

const CodeViewContainer = () => {
    const {Items} = useSelector((state:RootState)=> state.codememo);
    const [code,setCode] = useState('');
    const [isAddItem, setIsAddItem] = useState(false);
    const [addItemName, setAddItemName] = useState("");
    const addInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    
    // Code 변경함수
    const onCodeChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        const code1 = hljs.highlightAuto(e.target.value).value;
        const codeBlock = document.getElementById('code') as HTMLDivElement
        codeBlock.innerHTML = `<pre><code className"hljs>${code1}</code></pre>`;
      }

    //  Item 추가/ 변경 /삭제 함수
    const addItem = () => {
        setIsAddItem(true);
        if (!addInput.current) {
            return;
        };
        addInput.current.focus();
    }
    const onChangeAddItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddItemName(e.target.value);
        
    }
    const onEnterAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13) {
            dispatch(additem(addItemName));
        }
    }
    return (
        <CodeViewBlock id="ddd">
            <SideItemBar
                memoArray={Items} 
                addItem={addItem} 
                isAddItem={isAddItem} 
                addInput={addInput} 
                addItemName={addItemName} 
                onChangeAddItemName={onChangeAddItemName}
                onEnterAddItem ={onEnterAddItem}
            />
            <CodeEditor code={code} onCodeChange={onCodeChange} ></CodeEditor>
            <SideViewBlock/>
        </CodeViewBlock>
    )
}

export default CodeViewContainer;
