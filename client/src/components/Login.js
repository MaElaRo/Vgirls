import React, { Component } from "react";
import { login } from "../services/api";
import { Form, Button, Alert } from "react-bootstrap";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { username, password, email } = this.state;

    event.preventDefault();

    login(username, password, email)
      .then(data => {
        this.props.setUser(data);
        this.props.history.push("/vulva");
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  render() {
    return (
      <Form className="loginform" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>

        {this.state.error && (
          <Alert variant="warning">{this.state.error}</Alert>
        )}

        <Button className="loginbtn" type="submit">
          LOGIN
        </Button>
      </Form>
    );
  }
}
