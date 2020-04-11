import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PageTitle from '../components/PageTitle';
import { authOperations } from '../redux/auth'
import FormWrap from '../components/FormWrap';

class LoginView extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    })

  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onLogin({ ...this.state });
    return this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        <PageTitle title="Login" />
        <FormWrap>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="email-field"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
              margin="normal"
            />
            <TextField
              id="password-field"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </FormWrap>
      </>
    )
  }
};


export default connect(null, { onLogin: authOperations.logIn })(LoginView);