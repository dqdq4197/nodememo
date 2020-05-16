import {http} from './Common';



interface SignInProps {
    email:string,
    password: string
}

interface SignUp extends SignInProps {
    nickname:string
}
export const signIn = ({email,password}:SignInProps) => {
    http.post('/users/login', {
        email,
        password
    })
}

export const signUp = ({email,password,nickname}:SignUp) => {
    http.post('/users/register', {
        email,
        password,
        nickname
    })
}