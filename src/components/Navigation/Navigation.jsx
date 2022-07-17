import { NavLink } from "react-router-dom";
import styled from "./Navigation.module.css"
export const Navigation = () => {
    let activeStyle  = {
        color: "#00FF00",
    };
    return (
        <header>
            <section className={styled.container}>
                <ul className={styled.navigation}>
                    <li className={styled.navigation__item}>
                        <NavLink to="/" style={({ isActive }) =>
                    isActive ? activeStyle : undefined 
                    }>Home</NavLink>
                    </li>
                    <li className={styled.navigation__item}>
                        <NavLink to = "/variables" style={({ isActive }) =>
                    isActive ? activeStyle : undefined 
                    }>Variables</NavLink>
                    </li>
                </ul>
            </section>
        </header>
    )
}