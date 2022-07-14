import {  useParams } from 'react-router-dom';
import { useEffect,useState } from "react";
import * as API from "../../services/FetchData";
import {  useNavigate  } from "react-router-dom";


export const VariablesItem = () => {
    const [item, setItem] = useState({})
    let { variables_id } = useParams();
    let navigate = useNavigate();


    useEffect(()=>{
        async function FetchList(){
            const id = await API.FetchList()
            const found = id.Results.find((el) => el.ID.toString() === variables_id)
            setItem(found)
        }
        FetchList()
    }, [variables_id])    
    return (
        <div>
            <button onClick = {()=>{navigate('/Variables')}}>Back</button>

            <ul>
                <li>
                    {item.GroupName}
                </li>
                <li
                dangerouslySetInnerHTML={{__html:item.Description}}></li>
            </ul>
          
        </div>
    )
}
