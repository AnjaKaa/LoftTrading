import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Background from '../Background';
import Login from '../Login';
import Header from '../Header';
import Footer from '../Footer';
import Trade from '../Trade';

import styled from 'styled-components';

class AppRouter extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Main>
          <Background />
          <WrapCenter>
            <Switch>
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/trade/:currency" exact component={Trade} />
              <Redirect to="/trade/btc" />
            </Switch>
          </WrapCenter>
        </Main>
        <Footer />
      </Wrapper>
    );
  }
}

export default AppRouter;

//#region styles
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1 0 auto;
  font-family: 'Roboto', 'Arial', sans-serif;
  background-color: #f5f5f6;

  align-text: center;
  position: relative;
`;

const WrapCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  max-width: 1200px;
  z-index: 1;
`;

//#endregion
