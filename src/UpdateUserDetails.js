import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
const PASSWORD_LENGTH= 9;



class UpdateUserDetails extends React.Component {
    state = {
        newName: "",
        newEmail: "",
        newPassword: "",
        error:""
    }

    inputChange=(event,key)=> {
        let value=event.target.value;
        this.setState({
            [key]:value
        })
    }
    passwordValidation=(password)=>{
        let ans=false;
        if ((password.length>=PASSWORD_LENGTH)){
            ans=true;
        }
        return ans;
    }
    updateName = () =>{
        axios.post("http://localhost:9124/update_username", null, {
            params: {
                name: this.state.newName
            }
        }).then((response) => {
            if (response.data.success) {
                this.setState({
                    error:"Name was change successfuly!"
                })
            } else {
                this.setState({
                    error:"somthing wrong, Error Code: "+response.data.errorCode
                })
            }
        });
        this.setState({
            newName:""
        })
    }
  updatePassword = () =>{
        if (this.passwordValidation(this.state.newPassword)) {
            axios.post("http://localhost:9124/update_password", null, {
                params: {
                    password: this.state.newPassword
                }
            }).then((response) => {
                if (response.data.success) {
                    this.setState({
                        error: "Password was change successfuly!"
                    })
                } else {
                    this.setState({
                        error: "somthing wrong, Error Code: " + response.data.errorCode
                    })
                }
            });
            this.setState({
                newPassword:""
            })
        } else {
            this.setState({
                error: "password must be biggest then 8 digits!"
            })
        }
  }

    updateEmail = () =>{
        axios.post("http://localhost:9124/update_email", null, {
            params: {
                email: this.state.newEmail
            }
        }).then((response) => {
            if (response.data.success) {
                this.setState({
                    error:"Email was change successfuly!"
                })
            } else {
                this.setState({
                    error:"somthing wrong, Error Code: "+response.data.errorCode
                })
            }
        });
        this.setState({
            newEmail:""
        })
    }



    render() {
        return (
            <div>
                <div>
                   new user name:
                    <input value={this.state.newName} onChange={(event) => {
                        this.inputChange(event, "newName")
                    }}/>
                    <div>
                        <button onClick={this.updateName}>
                            update user-name
                        </button>
                    </div>
                </div>
                <div>
                    new Email:
                    <input value={this.state.newEmail} onChange={(event) => {
                        this.inputChange(event, "newEmail")
                    }}/>
                    <div>
                        <button onClick={this.updateEmail}>
                            update Email
                        </button>
                    </div>
                </div>
                <div>
                    new password:
                    <input type={"password"} value={this.state.newPassword} onChange={(event) => {
                        this.inputChange(event, "newPassword")
                    }}/>
                    <div>
                        <button onClick={this.updatePassword}>
                            update password
                        </button>
                    </div>
                </div>
                <button onClick={this.sendUserDetails} disabled={!this.passwordValidation(this.state.newPassword)}> send
                </button>
                <div style={{color: "red"}}>
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default UpdateUserDetails;