import { createContext, useState } from 'react'

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [search , setSearch] = useState('');
    const [data , setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    console.log(data);
    async function handleSubmit(){
        try{
            setLoading("true");
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`);
            const data = await response.json();
            if(data.data.recipes){
                setData(data.data.recipes);
                setLoading(true);
                setSearch("");
            }
            setLoading(false);
        }catch(e){
            console.log(e);
            setError(e);
            setLoading(false);
            setSearch("");
        }
    }

    return (
        <GlobalContext.Provider value={{search , setSearch , handleSubmit , loading , error , data}}>
            {children}
        </GlobalContext.Provider>
    )
}