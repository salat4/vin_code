import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import * as API from "../../services/FetchData";

export const Home = () => {
    const [variables, setVariables] = useState([]);
    const [prevSearch, setPrevSearch] = useState([]);
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
    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit"> Submit</button>
                <input type="text"
                name="query"
                >
                
                </input>
            </form>
            <p>Your past requests</p>
            <ul>
                {prevSearch.map((prev) => (
                    <li key = {uuidv4()} onClick={handleClick} id = {prev.SearchCriteria}>
                        {prev.SearchCriteria}
                    </li>
                ))}
            </ul>
            <ul>
                {variables.Results  &&
                    variables.Results.map((result) => (
                   ( result.Value !== "" && result.Value !== null && result.Value !== "Not Applicable" && result.Value !== '0' && result.ValueId !== "") &&
                    <li key = {result.VariableId}>
                        <p>
                            {result.Variable}
                        </p>
                        <p>
                            {result.Value}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}
