import React from 'react';
import Axios from 'axios';

export default class Login extends React.Component{
    
    constructor(){
        super();
        this.state = {
            user: "",
            pass: ""
        }
    }

    handleChange = (event)=>{
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event)=>{
        event.preventDefault();

        Axios.post('/auth/', {uid: this.state.user, upass: this.state.pass}).then((res)=>{
            document.location.reload();
        });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="user"
                    placeholder="Enter UserID"
                    value={this.state.user}
                    onChange={this.handleChange}></input>
                <input
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                    value={this.state.pass}
                    onChange={this.handleChange}></input>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}