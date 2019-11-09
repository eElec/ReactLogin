import React from 'react';
import {
  BrowserRouter as Router,
  Link,

} from 'react-router-dom';
import Axios from 'axios';

import Login from './components/Login';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  componentWillMount(){
    Axios.get('/auth/checkToken').then((res)=>{
      if(res.status === 200){
        this.setState({isLoggedIn: true, user: {...res.data}});
      }
    })
  }

  render(){
    const {isLoggedIn} = this.state;

    if(isLoggedIn){
      return(
        <div>Hi {this.state.user.first_name}</div>
      )
    }
    else{
      return(
        <Login />
      )
    }
  }
}
