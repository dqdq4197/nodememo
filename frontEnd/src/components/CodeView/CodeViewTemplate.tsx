import React from 'react';
import styled from 'styled-components';

const CodeViewBlock = styled.div`
    max-width:100%;
    padding-left:30px;
    position:relative;
`

type CodeViewProps = {
    children?:React.ReactNode;
}
const CodeViewTemplate = ({children} : CodeViewProps) => {
    return (
        <CodeViewBlock>
            {children}
        </CodeViewBlock>
    )
}

export default CodeViewTemplate;