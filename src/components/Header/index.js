import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import imgLogo from '../../assets/Logo-white.svg';

import styled from 'styled-components';

//#region styles
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1240px;
`;
export const Logo = styled.img`
  width: 140px;
  height: 80px;
`;
export const HeaderWrap = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  width: 100%;
  max-height: 80px;
  background-color: #2a2c2e;
`;
export const HeaderTitle = styled.div`
  width: 250px;
  max-height: 28px;
  padding: 32px 20px;
  font-size: 28px;
  font-weight: bold;
  color: #61dafb;
`;

export const HeaderStatisticsBlock = styled.div`
  width: 140px;
  height: 80px;
  margin: 20px 10px;
  color: #ffffff;
`;

export const CurrencyLink = styled.a`
  width: 140px;
  height: 80px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  margin-right: 20px;
  background-color: #404243;
  color: ${props => (props.className === 'active' ? '#fff' : '#c3c3c3')};
  transition: color 0.6s;
  &:hover {
    color: #fff;
  }
`;

export const UserBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 80px;
  padding: 20px 0;
`;

export const UserBlockItem = styled.div`
  position: relative;
  color: #ffffff;
  padding: 0 20px;
  min-width: 65px;
  height: 32px;
  text-align: center;

  span {
    position: relative;
    line-height: 32px;
    z-index: 100;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 32px;
    background-color: ${props => (props.active ? '#468597' : '#ffffff')};
    border-radius: 15px;
    opacity: ${props => (props.active ? 1 : 0.2)};
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;
export const CountNewFeeds = styled.div`
  position: absolute;
  top:-10px;
  right: -10px;
  min-width: 15px;
  height: 15px;
  padding: 5px
  background-color: #9f3232;
  border-radius: 50%;
`;

//#endregion

class Header extends Component {
  state = {
    btc: 0,
    eth: 0,
  };

  render() {
    return (
      <HeaderWrap>
        <Container>
          <Link to="/">
            <Logo src={imgLogo} alt="logo-header" />
          </Link>
          <HeaderTitle> Название </HeaderTitle>

          <CurrencyLink>
            <span>{this.state.btc}</span>
            <b>1 BTC </b>
          </CurrencyLink>

          <CurrencyLink>
            <span>{this.state.eth}</span>
            <b>1 ETH </b>
          </CurrencyLink>
          <UserBlock />
        </Container>
      </HeaderWrap>
    );
  }
}

export default Header;