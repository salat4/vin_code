import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "./Home.module.css"
import Notiflix from 'notiflix';

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
        if (e.target.query.value !== "") {
            for (let i = 0; i < prevSearch.length; i++){
                if (prevSearch[i].SearchCriteria.slice(4) === e.target.query.value) {
                    return Notiflix.Notify.info(`${e.target.query.value} is already is VIN code`);
                }
            }
            const variables = await API.FetchDecode(e.target.query.value)
            setVariables(variables)    
            prevSearch.length  < 5 ? setPrevSearch(prevState =>[...prevState , variables]) : setPrevSearch(prevState =>[...prevState.slice(1) , variables])        
        e.target.reset()
        Notiflix.Notify.info(`${variables.Message}`);
        }
        else {
            Notiflix.Notify.warning('Enter a some VIN');
        }
    }
    const handleClick = async (e) => {
        const variables = await API.FetchDecode(e.target.id.slice(4))
        setVariables(variables)
        Notiflix.Notify.info(`${variables.Message}`);
    }
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(prevSearch))
    },[prevSearch])
    return (
        <main>
        <section className={styled.container}>
            <div className={styled.left__box}>
                <form onSubmit={handleSubmit} className = { styled.form}>
                    <input type="text" name="query"pattern="^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$" className={styled.form__input}>
                    </input>
                        <button type="submit" className={ styled.form__button}> Submit</button>
                </form>
                <ul className= {styled.left__list}>
                {variables.Results  &&
                    variables.Results.map((result) => (
                   ( result.Value !== "" && result.Value !== null && result.Value !== "Not Applicable" && result.Value !== '0' && result.ValueId !== "") &&
                    <li key = {result.VariableId} className = {styled.left__list__item}>
                        <p>
                            {result.Variable}: {result.Value}
                        </p>
                    </li>
                ))}
            </ul>    
            </div>
            <div className={styled.right__box}>
            <p className={styled.right__text}>Your past requests</p>
                <ul >
                    {prevSearch.map((prev) => (
                        <li key = {uuidv4()} className = {styled.right__list__item}  onClick={handleClick} id = {prev.SearchCriteria}>
                            {prev.SearchCriteria}
                        </li>
                    ))}
                </ul>
            </div>
            </section>
        </main>
    )
}
