import { Home } from './components/Home/Home';
import { Variables } from './components/Variables/Variables';
import { VariablesItem } from './components/VariablesItem/VariablesItem';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation"
function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path = "/" element ={<Home/>}></Route>
        <Route path = "/variables" element = {<Variables/>}></Route>
        <Route path = "/variables/:variables_id" element = {<VariablesItem/>}></Route>
      </Routes>
    
</>
  );
}

export default App;
