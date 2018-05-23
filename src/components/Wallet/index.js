import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  fetchWalletRequest,
  getWalletBtc,
  getWalletEth,
  getWalletUsd,
  getWalletError,
} from '../../ducks/wallet';
import { sellCurrencyRequest } from '../../ducks/currency';

import styled from 'styled-components';

class Wallet extends Component {
  state = {
    btc: 0,
    eth: 0,
    usd: 0,
  };
  componentDidMount() {
    this.props.fetchWalletRequest();
    const { walletUsd, walletBtc, walletEth } = this.props;
    this.setState({
      btc: walletBtc,
      eth: walletEth,
      usd: walletUsd,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { walletUsd, walletBtc, walletEth } = nextProps;

    this.setState({
      btc: walletBtc,
      eth: walletEth,
      usd: walletUsd,
    });
  }

  render() {
    const { btc, eth, usd } = this.state;
    //console.log('wallet', this.props);
    return (
      <Fragment>
        <span>{this.props.btc}</span>
        <CoinInputContainer>
          <CoinInputInput>
            <CoinInputInteger textAlign="right">{Math.round(Math.floor(eth))}</CoinInputInteger>.
            <CoinInputFraction>
              {String(eth - Math.floor(eth))
                .replace('0.', '')
                .slice(0, 8)}
            </CoinInputFraction>
          </CoinInputInput>
          <CoinInputCurrency>ETH</CoinInputCurrency>
        </CoinInputContainer>
        <CoinInputContainer>
          <CoinInputInput>
            <CoinInputInteger textAlign="right">{Math.round(Math.floor(btc))}</CoinInputInteger>.
            <CoinInputFraction>
              {String(btc - Math.floor(btc))
                .replace('0.', '')
                .slice(0, 8)}
            </CoinInputFraction>
          </CoinInputInput>
          <CoinInputCurrency>BTC</CoinInputCurrency>
        </CoinInputContainer>
        <CoinInputContainer>
          <CoinInputInput>
            <CoinInputInteger textAlign="right">{Math.round(Math.floor(usd))}.</CoinInputInteger>
            <CoinInputFraction>
              {String(usd - Math.floor(usd))
                .replace('0.', '')
                .slice(0, 8)}
            </CoinInputFraction>
          </CoinInputInput>
          <CoinInputCurrency>$</CoinInputCurrency>
        </CoinInputContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  walletBtc: getWalletBtc(state),
  walletEth: getWalletEth(state),
  walletUsd: getWalletUsd(state),
  walletError: getWalletError(state),
});

const mapDispatchToProps = {
  fetchWalletRequest,
  sellCurrencyRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

//#region styles
const CoinInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 298px;
`;

const CoinInputInput = styled.div`
  background-color: #414244;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  flex: 1 1 150px;
  margin: 5px 0;
`;

const CoinInputInteger = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;

const CoinInputFraction = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CoinInputCurrency = styled.p`
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;
//endregion
