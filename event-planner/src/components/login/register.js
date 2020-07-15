import React from "react";
import $ from "jquery";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      username: "",
      password1: "",
      password2: "",
      passError: "",
      usernameError: "",
      passErrorStyle: noError,
      userErrorStyle: noError,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  checkUsername(event) {
    this.setState({ username: event.target.value });
    $.get(
      "http://localhost:8080/search.php?username=" + event.target.value,
      (response) => {
        if (response.localeCompare("match") === 0) {
          this.setState({
            usernameError: "This username is already taken. Try another one.",
            userErrorStyle: error,
          });
        } else {
          this.setState({ usernameError: "", userErrorStyle: noError });
        }
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password1, password2, usernameError } = this.state;
    if (password1.localeCompare(password2) !== 0) {
      this.setState({
        passError: "The passwords you entered do not match.",
        passErrorStyle: error,
      });
    } else if (usernameError.localeCompare("") !== 0) {
      this.setState({ passErrorStyle: noError });
      alert("Your username must be unique. Try again");
    } else {
      $.post(
        "http://localhost:8080/register.php",
        {
          fname: this.state.fname,
          lname: this.state.lname,
          username: this.state.username,
          password: this.state.password1,
          email: this.state.email,
        },
        function (response) {
          if (response.localeCompare("success")) {
            console.log(response);
          } else {
            console.log(response);
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <form className="accForm">
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              required
              value={this.state.first}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              required
              value={this.state.last}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={this.state.username}
              onChange={this.checkUsername}
            />
            <div className="error" style={this.state.userErrorStyle}>
              {this.state.usernameError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password1"
              placeholder="Password"
              required
              value={this.state.password1}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Re-Enter Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Re-Enter Password"
              required
              value={this.state.password2}
              onChange={this.handleChange}
            />
            <div className="error" style={this.state.passErrorStyle}>
              {this.state.passError}
            </div>
          </div>
        </form>
        <button type="button" className="btn" onClick={this.handleSubmit}>
          Register
        </button>
      </div>
    );
  }
}

const error = {
  textAlign: "center",
  width: "100%",
  padding: "8px 0",
  color: "#ff2a23",
  backgroundColor: "#ffcccc",
  fontSize: "14px",
  border: "2px solid #ff2a23",
};

const noError = {
  display: "none",
};
