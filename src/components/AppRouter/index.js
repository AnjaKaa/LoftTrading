import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
//import PrivateRoute from '../PrivateRoute';
import Background from '../Background';
import Trade from '../Trade';

import styled from 'styled-components';

export const Main = styled.main`
  font-family: 'Roboto', 'Arial', sans-serif;
  background-color: #f5f5f6;
  width: 100%;
  height: 100%
  align-text: center;
  position: relative;
`;

export const WrapCenter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  width: 1200px;
  z-index: 1;
  background-color: #ffffff;
`;

class AppRouter extends Component {
  render() {
    return (
      <Main>
        <Background />
        <WrapCenter>
          <Switch>
            <Route path="/trade/btc" exact component={Trade} />
            <Redirect to="/trade/btc" />
          </Switch>
        </WrapCenter>
      </Main>
    );
  }
}

export default AppRouter;
