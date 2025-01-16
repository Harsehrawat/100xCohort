import { atomFamily } from 'recoil'
import { Todo } from './Todo'

export const todoAtomFamily = atomFamily({
    key : "todoAtomFamily",
    default : (id)=>{
        return Todo.find(x => x.id == id);
    }
})

// Below is the example of how it looked incase we had to fetch the data from http req. 
// WE WOULD HAVE USED selectorFamily in default of atomFamily 

// export const todoAtomFamilyXYZ = atomFamily({
//     key : "todoAtomFmail",
//     default : selectorFamily({
//         key : " ",
//         get : (id)=> async ({get}) =>{
//             const resp = await axios.get("httpReq.ForTODO/id?="+id);
//             return resp.data;
//         }
//     })
// })