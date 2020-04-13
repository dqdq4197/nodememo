import React,{useMemo,useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import {useLocation} from 'react-router-dom';
import hljs from 'highlight.js';


const fadeInView = keyframes`
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
`
const fadeOut = keyframes`
    from {
        opacity:1;
    }
    to {
        opacity:0;
    }
`

const ContentBlock = styled.div`
    color:${({theme}) => theme.palette.basic};
    grid-column-start: 1;
    transition:color .2s;
    animation-duration: .5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-name:${fadeInView};
`

const CodeBlock = styled.div`
    z-index:111;
    grid-column-start: 2;
    overflow:hidden;
    font-size:14px;
    .hljs {
        background:transparent;
    }
    pre {
        position:relative;
    }
    pre:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100%;
        background: linear-gradient(to left, #151515, rgba(21, 21, 21, 0));
        pointer-events: none;
    }
    
    code {
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        hyphens: none;
        tab-size:4;
        animation-duration: .5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        animation-name:${fadeInView};
    }
    pre code::-webkit-scrollbar {
        height: 5px;
        
    }
    pre{
        &:hover{
            code::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                &:hover {
                    background: rgba(255, 255, 255, .5);
                }
            }
        }        
    }
    pre code::-webkit-scrollbar, pre code::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(255, 255, 255, 0);
           
    }

`


const GridBlock = styled.div`
    display:grid;
    column-gap: 100px;
    padding-right: 80px;
    grid-template-columns: 1fr 1fr;
`
type MemoArrayState ={
    name:string,
    memo: [{
        number:number,
        about: {
            title:string,
            content?:string
        },
        code?: string
    }]
}
type ListProps = {
    memoArray:MemoArrayState[]
}
const CodeList = ({memoArray}:ListProps) => {
    
    const location = useLocation();

    useEffect(() => {
        pushCode();
    })
    const memoList = useMemo(() => {
        const path = location.pathname.replace(/\/codeview\//,'');
        const memoArr = memoArray.filter(item => item.name===path);
        console.log(memoArr[0])
        
        if(!memoArr[0]) return ;

        if(memoArr[0].hasOwnProperty('memo')) {
            return memoArr.map(item => item.memo.map(value => 
                <GridBlock key={value.number}>
                    <ContentBlock >
                        <h2>{value.about.title}</h2>
                        {value.about.content ? <p>{value.about.content}</p> : null}
                    </ContentBlock>
                    <CodeBlock>
                        <pre className="language-jsx"><code className="language-jsx">{value.code}</code></pre>
                    </CodeBlock>
                </GridBlock>
            ))
        }

        //     )   
        // }
        // return memoArr.map(value => 
        //     <GridBlock key={value.memo.number}>
        //         <ContentBlock >
        //             <h2>{value.memo.about.title}</h2>
        //             <p>{value.memo.about.content}</p>
        //         </ContentBlock>
        //         <CodeBlock>
        //             <pre className="language-jsx"><code className="language-jsx">{value.memo.code}</code></pre>
        //         </CodeBlock>
        //     </GridBlock>
        // )
        
    },[location.pathname])

    const pushCode = () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
    }
  
    return (
        <>
            {memoList}
        </>
    )
}

export default CodeList;