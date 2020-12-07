import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from "../../utils/storage";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: ""
    };
  }

  componentDidMount() {
    const token = getFromStorage("my_health_notebook"); //Name of react project
    if(token) {
      fetch("api/account/verify?token=" + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
    } = this.state;

    if(isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if(!token) {
      return(
      <div>
        <div>
          <p>Sign In</p>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <br />
        <br />
        <div>
          <p>Sign Up</p>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      );
    }
    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default Home;
