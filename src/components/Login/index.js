import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import { authRequest, getIsAuthorized, getAuthError } from '../../ducks/auth';
import { regRequest, getIsRegistered, getRegError } from '../../ducks/reg';

import styled from 'styled-components';

import imgLogo from '../../assets/Logo.svg';
import imgUser from '../../assets/login/user-shape.svg';
import imgPassword from '../../assets/login/padlock-unlock.svg';

class Login extends PureComponent {
  state = {
    mode: 'login',
    email: '',
    password: '',
  };

  render() {
    const { isAuthorize } = this.props;
    const { mode } = this.state;

    if (isAuthorize) {
      return <Redirect to="/" />;
    } else {
      return (
        <Fragment>
          <LoginLogo src={imgLogo} alt="project logo" />
          <CenterPanel>
            <LoginForm>
              <Form
                onSubmit={this.handleSubmit}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <InputWrap>
                      <Field name="email" component="input" placeholder="email" type="email" />
                      <InputLoginIcon url={imgUser} />
                    </InputWrap>
                    <InputWrap>
                      <Field
                        name="password"
                        component="input"
                        placeholder="password"
                        type="password"
                      />
                      <InputLoginIcon url={imgPassword} />
                    </InputWrap>
                    <InputWrap>
                      <Button type="submit">
                        {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                      </Button>
                    </InputWrap>
                  </form>
                )}
              />
            </LoginForm>
          </CenterPanel>
          <CenterPanel>
            {mode === 'login' ? (
              <p>
                Впервые на сайте?{' '}
                <a href="" name="login" onClick={this.toggleMode}>
                  Регистрация
                </a>
              </p>
            ) : (
              <p>
                Уже зарегистрированы?{' '}
                <a href="" name="registration" onClick={this.toggleMode}>
                  Войти
                </a>
              </p>
            )}
          </CenterPanel>
        </Fragment>
      );
    }
  }
  toggleMode = event => {
    event.preventDefault();
    this.setState({ mode: event.target.name === 'login' ? 'registration' : 'login' });
  };

  handleInputchange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = values => {
    const { mode } = this.state;
    if (mode === 'login') {
      this.props.authRequest(values);
    } else {
      this.props.regRequest(values);
    }
  };

  
}

export default connect(
  state => ({
    isAuthorize: getIsAuthorized(state),
    loginError: getAuthError(state),
    isRegister: getIsRegistered(state),
    regError: getRegError(state),
  }),
  { authRequest, regRequest },
)(Login);

const CenterPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 450px;
  margin: 11px 0;
  padding: 9px 0;
  background-color: #fff;
  border-radius: 7px;
  border: 1px solid #c3c3c3;

  &:before {
    border-radius: 7px;
    background: transparent;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0px 0px 68px 4px rgba(0, 0, 0, 0.23);
  }
`;

const LoginLogo = styled.img`
  width: 300px;
  height: 144px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
`;

const InputWrap = styled.div`
  position: relative;

  input {
    margin: 10px 0;
    padding: 16px 6px 16px 53px;
    border: 1px solid #dfdfdf;
    border-radius: 7px;
    width: calc(100% - 62px);
  }
`;

const InputLoginIcon = styled.span`
  background-image: url(${props => props.url});
  width: 19px;
  height: 19px;
  opacity: 0.4;
  background-size: cover;
  position: absolute;
  top: 25px;
  left: 21px;
`;

const Button = styled.button`
  width: 100%;
  margin: 10px 0;
  background-color: #4db6e2;
  color: #fff;
  border: none;
  font-size: 22px;
  padding: 12px 0;
  font-weight: 300;
  letter-spacing: 1.1px;
  cursor: pointer;
`;
