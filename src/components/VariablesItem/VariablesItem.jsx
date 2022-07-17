import {  useParams } from 'react-router-dom';
import { useEffect,useState } from "react";
import * as API from "../../services/FetchData";
import styled from "./VariablesItem.module.css"

export const VariablesItem = () => {
    const [item, setItem] = useState({})
    let { variables_id } = useParams();
    useEffect(()=>{
        async function FetchList(){
            const id = await API.FetchList()
            const found = id.Results.find((el) => el.ID.toString() === variables_id)
            setItem(found)
        }
        FetchList()
    }, [variables_id])    
    return (
        <main >
            <section className={ styled.container}>
                <ul>
                    <li className={styled.list__item}>
                        {item.GroupName}
                    </li>
                    <li className={styled.list__item}
                    dangerouslySetInnerHTML={{__html:item.Description}}></li>
                </ul>

            </section>
        </main>
    )
}
