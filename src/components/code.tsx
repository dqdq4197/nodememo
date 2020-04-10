import React,{useState} from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import './App.css';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import html from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('html', html);
hljs.registerLanguage('javascript', javascript);


const CodeBlock = styled.div`
  display:flex;
  width:100%;
  height:100%;
`
const CodeNote = styled.textarea`
  flex:1;
  height:300px;
`
const Codeprint = styled.div`
  flex:1;
  height:300px;

`

function App() {

  const [code, setCode] = useState('');


  const onCodeChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    const code1 = hljs.highlightAuto(e.target.value).value;
    const codeBlock = document.getElementById('code') as HTMLDivElement
    codeBlock.innerHTML = `<pre><code className"hljs>${code1}</code></pre>`;


  }

  return (
    <CodeBlock>
      <CodeNote onChange={onCodeChange} value={code} />
      <Codeprint id='code'></Codeprint>
    </CodeBlock>
  );
}

export default App;
