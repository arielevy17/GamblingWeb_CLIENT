import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import LogIn from "./LogIn";
import SingUp from "./SingUp";
import GamesAndBettes from "./GamesAndBettes";
import Table from "./Table";




class App extends React.Component {
    state = {
        success:false
    }

    render() {
        return (
            <div>
                <div>
                    G.N Gambling
                </div>
                <div>
                    <BrowserRouter>
                        <Routes>
                            <Route path={"/login_page"} element={<LogIn/>}/>
                            <Route path={"/sing_up_page"} element={<SingUp/>}/>
                            <Route path={"/league_table"} element={<Table/>}/>
                            <Route path={"/games_and_bettes"} element={<GamesAndBettes/>}/>
                        </Routes>
                    </BrowserRouter>
                    <button onClick={() => {
                        window.location.href = "http://localhost:3000/login_page"
                    }} disabled={this.state.success}>
                        LogIn
                    </button>

                </div>

                    <div>
                    <a style={{color:"deepskyblue"}}  onClick={() => {
                        window.location.href = "http://localhost:3000/sing_up_page";
                    }}
                       aria-disabled={this.state.success}>
                        Have not a count, please SingUp now!
                    </a>
                    </div>


            </div>
        );
    }


}

export default App;
