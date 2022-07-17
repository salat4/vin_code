import { useEffect,useState } from "react";
import * as API from "../../services/FetchData";
import {  useNavigate  } from "react-router-dom";
import styled from "./Variables.module.css"
 
export const Variables = () => {
    let navigate = useNavigate();
    const [variables, setVariables] = useState([])
    useEffect(() => {
        async function FetchList() {
            const variables = await API.FetchList()
            setVariables(variables)
        }
        FetchList()
    },[])
    return (
        <main className={styled.container}>
            <ul>
                {variables.Results &&(
                    variables.Results.map((variable) => (
                    
                        <li key={variable.ID} className = {styled.list__item} onClick = {()=>{navigate(`/Variables/${variable.ID}`)}}>
                                {variable.Name}
                        </li> 
                    )))
                }
                
            </ul>
        </main>
    )
}
