const ADDITEM = 'codememo/ADDITEM' as const;
const ADDMEMO = 'codememo/ADDMEMO' as const;
const REMOVEMEMO = 'codememo/REMOVEMEMO' as const;

export const additem = (name:string) => ({
    type:ADDITEM,
    payload:name,
})

export const addmemo = (name:string, title:string,content:string,code:string) => ({
    type:ADDMEMO,
    payload:{
        name,
        title,
        content,
        code
    }
})

export const removememo = (name:string,number:number) => ({
    type:REMOVEMEMO,
    payload:{
        name,
        number
    }
})

type MemoAction = 
    | ReturnType<typeof additem>
    | ReturnType<typeof addmemo>
    | ReturnType<typeof removememo>

export type MemoType = {
    number:number,
    about:{
        title:string,
        content:string
    },
    code:string
}

export type CodeMemoType = {
    name: string;
    memo: MemoType[];
};

export type CodeMemoState= CodeMemoType[];
// export type CodeMemoState = [{
//     name:string,
//     memo?: [{
//         number:number,
//         about?: {
//             title?:string,
//             content?:string
//         },
//         code?: string
//     },{
//         number:number,
//         about?: {
//             title?:string,
//             content?:string
//         },
//         code?: string
//     }]
// }]

const initalState:CodeMemoState = [{
        name:'React HOC',
        memo: [{
            number:1,
            about: {
                title: 'React Hoc',
                content:'input을 조금더 편하게 사용할 수 있는 훅입니다.'
            },
            code: `const MemoList = useCallback(() => {
    const path = location.pathname.replace(/\/codeview\//,'');
    const memoArr = memoArray.filter(item => item.name===path);
    console.log(memoArr)
    return memoArr.map(value => 
        <>
            <ContentBlock >
                <h2>{value.memo.about.title}</h2>
                <p>{value.memo.about.content}</p>
            </ContentBlock>
            <CodeBlock >{value.memo.code}</CodeBlock>
        </>
    )
},[location.pathname])`
        },{
            number:2,
            about: {
                title: 'React Input Hoc',
                content:'input을 조금더 편하게 사용할 수 있는 훅입니다. 재사용성을 높여줍니다.'
            },
            code: `const CodeList = ({memoArray}:ListProps) => {
    const location = useLocation();

    useEffect(() => {
        pushCode();
    })
    const memoList = useMemo(() => {
        const path = location.pathname.replace(/\/codeview\//,'');
        const memoArr = memoArray.filter(item => item.name===path);
        return memoArr.map(value => 
            <GridBlock key={value.memo.number}>
                <ContentBlock >
                    <h2>{value.memo.about.title}</h2>
                    <p>{value.memo.about.content}</p>
                </ContentBlock>
                <CodeBlock >
                    <pre><code className="language-jsx">{value.memo.code}</code></pre>
                </CodeBlock>
            </GridBlock>
        )
        
    },[location.pathname])

    const pushCode = () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
    }
  
    return (
        <>
            {memoList}\
        </>
    )
}

export default CodeList;`  
        }]
}]


export default function codememo (state: CodeMemoState = initalState, action: MemoAction ){
    switch (action.type) {
        case ADDITEM :
            return state.concat({
                name:action.payload,
                memo:[]
            })
        case ADDMEMO :
            return state.map(value =>
                value.name === action.payload.name ? 
                    {
                        ...value,
                     memo: value.memo.concat({
                         number:value.memo.length>0 ? value.memo[value.memo.length-1].number+1 : 1,
                         about:{
                             title:action.payload.title,
                             content:action.payload.content
                         },
                         code:action.payload.code
                     }),
                     } : value
            )
            case REMOVEMEMO : 
                return (
                    state.map(value =>
                        value.name===action.payload.name ? {
                            ...value,
                            memo: value.memo.filter(number => number.number !== action.payload.number)
                        } : value 
                    )   
                )
        default : 
            return state       
    }
}