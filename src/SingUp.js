
import React from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";




class SingUp extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        error:"",
        success:false
    }

    inputChange=(event,key)=> {
        let value=event.target.value;
        this.setState({
            [key]:value
        })
    }
    passwordValidation=(password)=>{
        let ans=false;
        if ((password.length>=9)){ // הוספת תנאי מכיל מספר ואות
            ans=true;
        }
        return ans;
    }
    singUp=()=>{
        if (this.passwordValidation(this.state.password)) {
            debugger;
            axios.post("http://localhost:9124/sing_up", null, {
                params: {
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email
                }
            }).then((response) => {
                debugger;
                if (response.data.success === true) {
                    this.setState({
                        success: true
                    })
                    window.location.href = "http://localhost:3000/league_table";
                } else {
                    this.setState({
                        error:"somthing wrong, Error Code: "+response.data.errorCode
                    })
                }
            });
        }
    }



    render() {
        return (
            <div>
                <div>
                    user name:
                    <input value={this.state.name} onChange={(event) => {
                        this.inputChange(event, "name")
                    }}/>
                </div>
                <div>
                    E-mail:
                    <input value={this.state.email} onChange={(event) => {
                        this.inputChange(event, "email")
                    }}/>
                </div>
                <div>
                    password:
                    <input value={this.state.password} onChange={(event) => {
                        this.inputChange(event, "password")
                    }}/>
                </div>
                <button onClick={this.singUp} disabled={!this.passwordValidation(this.state.password)}> sing up </button>
                <div style={{color:"red"}}>
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default SingUp;
