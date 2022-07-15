import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "./Home.module.css"

import * as API from "../../services/FetchData";

export const Home = () => {
    const LS_KEY = "reader_prevSearch";
    const [variables, setVariables] = useState([]);
    const [prevSearch, setPrevSearch] = useState(()=>{
        const saved = localStorage.getItem(LS_KEY);
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });
    const handleSubmit = async (e) => {
         e.preventDefault();
        const variables = await API.FetchDecode(e.target.query.value)
        setVariables(variables)
        if (prevSearch.length  < 5) {
            setPrevSearch(prevState =>[...prevState , variables])
        }
        else {
         setPrevSearch(prevState =>[...prevState.slice(1) , variables])
        }
        e.target.reset()
    }
    const handleClick = async (e) => {
        const variables = await API.FetchDecode(e.target.id.slice(4))
        setVariables(variables)
    }
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(prevSearch))
    },[prevSearch])
    return (
        <main>
        <section className={styled.container}>
            <div className={styled.right__box}>
                <form onSubmit={handleSubmit} className = { styled.form}>
                    <input type="text" name="query" className={styled.form__input}>
                    </input>
                        <button type="submit" className={ styled.form__button}> Submit</button>
                </form>
                <ul>
                {variables.Results  &&
                    variables.Results.map((result) => (
                   ( result.Value !== "" && result.Value !== null && result.Value !== "Not Applicable" && result.Value !== '0' && result.ValueId !== "") &&
                    <li key = {result.VariableId} >
                        <p>
                            {result.Variable}:
                        </p>
                        <p>
                            {result.Value}
                        </p>
                    </li>
                ))}
            </ul>    
            </div>
            <div className={styled.left__box}>
            <p>Your past requests</p>
                <ul>
                    {prevSearch.map((prev) => (
                        <li key = {uuidv4()}  onClick={handleClick} id = {prev.SearchCriteria}>
                            {prev.SearchCriteria}
                        </li>
                    ))}
                </ul>
            </div>
            </section>
        </main>
    )
}
