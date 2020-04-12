import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PageTitle from '../components/PageTitle';
import FormWrap from '../components/FormWrap';
import Notification from '../components/Notification';
import { authOperations, authSelectors } from '../redux/auth'
import authActions from '../redux/auth/authActions';

class RegisterView extends Component {
  state = {
    name: '',
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

    this.props.onRegister({ ...this.state });
    return this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { name, email, password } = this.state;
    const { error, hideError } = this.props;

    return (
      <>
        {error && <Notification open={Boolean(error)} handleClose={hideError} type="error" message="Something went wrong" />}
        <PageTitle title="Register" />
        <FormWrap>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="name-field"
              label="Name"
              variant="outlined"
              fullWidth
              type="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
              margin="normal"
            />
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
  onRegister: authOperations.register,
  hideError: authActions.clearError
};


export default connect(mapStateToProps, mapDispatchToprops)(RegisterView);