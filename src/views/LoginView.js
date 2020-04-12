import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PageTitle from '../components/PageTitle';
import FormWrap from '../components/FormWrap';
import Notification from '../components/Notification';
import { authOperations, authSelectors } from '../redux/auth'
import authActions from '../redux/auth/authActions';

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
    const { error, hideError } = this.props;

    return (
      <>
        {error && <Notification open={Boolean(error)} handleClose={hideError} type="warning" message="Incorrect username or password" />}
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

const mapStateToProps = state => ({
  error: authSelectors.getError(state),
});

const mapDispatchToprops = {
  onLogin: authOperations.logIn,
  hideError: authActions.clearError
};


export default connect(mapStateToProps, mapDispatchToprops)(LoginView);