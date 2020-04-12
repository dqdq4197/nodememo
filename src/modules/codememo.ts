const ADDITEM = 'codememo/ADDITEM' as const;
const ADDMEMO = 'codememo/ADDMEMO' as const;

export const additem = (name:string) => ({
    type:ADDITEM,
    payload:name,
})

export const addmemo = () => ({
    type:ADDMEMO
})

type MemoAction = 
    | ReturnType<typeof additem>
    | ReturnType<typeof addmemo>


type CodeMemoState = {
    Items: [{
        name:string,
        memo?: {
            number:number,
            about?: {
                title?:string,
                content?:string
            },
            code?: string
        }
    },
    ]
}

const initalState:CodeMemoState ={
    Items: [{
        name:'React HOC',
        memo: {
            number:1,
            about: {
                title: 'Input Hoc',
                content:'input을 조금더 편하게 사용할 수 있는 훅입니다.'
            },
            code: `const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {  e.preventDefault();  onSubmit(form);  setForm({    name: '',    description: ''  });  if (!inputRef.current) {    return;  }  inputRef.current.focus();};`    
        }
    }]
}


export default function codememo (state: CodeMemoState = initalState, action: MemoAction ){
    switch (action.type) {
        case ADDITEM :
            return {
                ...state,
                Items: state.Items.concat({name: action.payload}),
            }
        case ADDMEMO :
            return {
                ...state
            }
        default : 
            return state       
    }
}