import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <header>
            <ul>
                <li>
                    <NavLink to = "/">Home</NavLink>
                </li>
                  <li>
                    <NavLink to = "/variables">Variables</NavLink>
                </li>
            </ul>
        </header>
    )
}