import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from "../utils/storage";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
    } = this.state;

    this.setState({
      isLoading: true,
    });

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);

    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);

    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);

    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("my_health_notebook"); //Name of react project
    if(obj && obj.token) {
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

  onTextboxChangeSignInEmail(e) {
    this.setState({
      signInEmail: e.target.value,
    });
  }

  onTextboxChangeSignInPassword(e) {
    this.setState({
      SignInPassword: e.target.value,
    });
  }

  onTextboxChangeSignUpEmail(e) {
    this.setState({
      SignUpEmail: e.target.value,
    });
  }

  onTextboxChangeSignUpPassword(e) {
    this.setState({
      SignUpPassword: e.target.value,
    });
  }2

  onTextboxChangeSignUpFirstName(e) {
    this.setState({
      SignUpFirstName: e.target.value,
    });
  }

  onTextboxChangeSignUpLastName(e) {
    this.setState({
      SignUpLastName: e.target.value,
    });
  }

  onSignUp() {
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    fetch("api/account/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fistName: signUpFirstName,
      lastName: signUpLastName,
      email: signUpEmail,
      password: signUpPassword,
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: "",
          signUpPassword: "",
          signUpFirstName: "",
          signUpLastName: "",
        });
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false,
        });
      }
    });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    fetch("api/account/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword,
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        setInStorage("my_health_notebook", {token : json.token});
        this.setState({
          signinError: json.message,
          isLoading: false,
          signInEmail: "",
          signInPassword: "",
          token: json.token,
        });
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if(isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if(!token) {
      return(
      <div>
        <div>
          <div>
            {
              {signInError} ? (
                <p>{signInError}</p>
              ) : (null)
            }
          </div>
          <p>Sign In</p>
          <input 
            type="email" 
            placeholder="Email" 
            value={signInEmail} 
            onChange={this.onTextboxChangeSignInEmail}
            />
          <input 
            type="password" 
            placeholder="Password" 
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword} 
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
        </div>
        <br />
        <br />
        <div>
          {
            (signUpError) ? (
            <p>{signInError}</p>
            ) : (null)
          }
          <p>Sign Up</p>
          <input 
          type="text" placeholder="First Name" 
          value={signUpFirstName}
          onChange={this.onTextboxChangeSignUpFirstName}
          />
          <input 
          type="text" placeholder="Last Name" 
          value={signUpLastName}
          onChange={this.onTextboxChangeSignUpLastName}
          />
          <input 
          type="email" placeholder="Email" 
          value={signUpEmail}
          onChange={this.onTextboxChangeSignUpEmail}
          />
          <input 
          type="password" placeholder="Password" 
          value={signUpPassword}
          onChange={this.onTextboxChangeSignUpPassword}
          />
          <br />
          <button onClick={this.onSignUp}>Sign Up</button>
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
