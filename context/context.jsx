"use client"
import { createContext } from "react";
import run from "@/lib/gemini"

export const Context = createContext();

const ContextProvider = (props) => {
    const onsend = async (prompt) =>{
       await run(prompt)
    }

    const contextValue ={

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider