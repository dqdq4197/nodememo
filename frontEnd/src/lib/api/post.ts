import {http} from './Common';




type AxiosProps = {
    title:string,
    id:number,
}
export const savePost = async({title,id}:AxiosProps) => {
    await http.post('/posts', {
        title,
        userId:id
    }).then(()=> console.log('a'))
}  
