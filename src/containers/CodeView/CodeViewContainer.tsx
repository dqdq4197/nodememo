import React,{useState ,useRef, useCallback} from 'react';
import SideItemBar from '../../components/CodeView/SideItemBar';
import CodeEditor from '../../components/CodeView/CodeEditor';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {additem} from '../../modules/codememo';
import html from 'highlight.js/lib/languages/xml';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/tomorrow-night-bright.css';
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
    const addItem = useCallback(() => {
        setIsAddItem(true);
        if (!addInput.current) {
            return;
        };
        addInput.current.focus();
    },[]);

    const onEnterAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13 && addInput.current) {
            const value = addInput.current.value;
            dispatch(additem(value));
            // if(Items){
            //     const key = Items.find(item=> item.name===value)
            //     if(key) {
            //     } else {
            //         window.alert('nope');
            //         dispatch(additem(value));
            //     }
            // } else{
            //     dispatch(additem(value));
            // }       
        }
    }

    return (
        <CodeViewBlock>
            <SideItemBar
                memoArray={Items} 
                addItem={addItem} 
                isAddItem={isAddItem} 
                addInput={addInput}
                onEnterAddItem ={onEnterAddItem}
            />
            <CodeEditor
                code={code} 
                onCodeChange={onCodeChange}
                memoArray={Items}
            />
            <SideViewBlock/>
        </CodeViewBlock>
    )
}

export default CodeViewContainer;
