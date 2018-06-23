import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  selectBtc,
  selectEth,
  getCurrentBtcSell,
  getCurrentEthSell,
  getSelected,
} from '../../ducks/currency';

import imgLogo from '../../assets/Logo-white.svg';

import styled from 'styled-components';

class Header extends Component {
  componentDidMount() {
    this.setCurrency(this.props.location.pathname.replace('/trade/', ''));
  }

  render() {
    const { eth, btc, currencyName } = this.props;
    let title = '';

    switch (this.props.location.pathname) {
      case '/trade/btc':
        title = 'Торги';
        break;
      case '/trade/eth':
        title = 'Торги';
        break;
      default:
        title = '';
        break;
    }

    return (
      <HeaderWrap>
        <Container>
          <Link to="/">
            <Logo src={imgLogo} alt="logo-header" />
          </Link>
          <HeaderTitle> {title} </HeaderTitle>

          <CurrencyLink
            className={currencyName === 'btc' ? 'active' : null}
            onClick={() => {
              this.setCurrency('btc');
            }}
            to="/trade/btc"
          >
            <span>${btc.toFixed(2)}</span>
            <b>1 BTC </b>
          </CurrencyLink>

          <CurrencyLink
            className={currencyName === 'eth' ? 'active' : null}
            onClick={() => {
              this.setCurrency('eth');
            }}
            to="/trade/eth"
          >
            <span>${eth.toFixed(2)}</span>
            <b>1 ETH </b>
          </CurrencyLink>
          <UserBlock />
        </Container>
      </HeaderWrap>
    );
  }

  setCurrency = link => {
    const { selectBtc, selectEth } = this.props;
    if (link === 'btc') {
      selectBtc();
    } else if (link === 'eth') {
      selectEth();
    }
  };
}

const mapStateProps = state => ({
  btc: getCurrentBtcSell(state),
  eth: getCurrentEthSell(state),
  currencyName: getSelected(state),
});

const mapDispatchToProps = {
  selectBtc,
  selectEth,
};

export default withRouter(
  connect(
    mapStateProps,
    mapDispatchToProps,
  )(Header),
);

//#region styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1240px;
`;
const Logo = styled.img`
  width: 140px;
  height: 80px;
`;
const HeaderWrap = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  width: 100%;
  max-height: 80px;
  background-color: #2a2c2e;
`;
const HeaderTitle = styled.div`
  width: 250px;
  max-height: 28px;
  padding: 32px 20px;
  font-size: 28px;
  font-weight: bold;
  color: #61dafb;
`;

const HeaderStatisticsBlock = styled.div`
  width: 140px;
  height: 80px;
  margin: 20px 10px;
  color: #ffffff;
`;

const CurrencyLink = styled(Link)`
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

const UserBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 80px;
  padding: 20px 0;
`;

const UserBlockItem = styled.div`
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
const CountNewFeeds = styled.div`
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
