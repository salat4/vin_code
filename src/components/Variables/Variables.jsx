import { useEffect,useState } from "react";
import * as API from "../../services/FetchData";
import {  useNavigate  } from "react-router-dom";

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
        <>
            <ul>
                {variables.Results &&(
                    variables.Results.map((variable) => (
                    
                        <li key={variable.ID} onClick = {()=>{navigate(`/Variables/${variable.ID}`)}}>
                                {variable.Name}
                        </li> 
                    )))
                }
                
            </ul>
        </>
    )
}
