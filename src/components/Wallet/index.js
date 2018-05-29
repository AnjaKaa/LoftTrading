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
  componentDidMount() {
    this.props.fetchWalletRequest();
  }

  render() {
    const { walletUsd, walletBtc, walletEth } = this.props;

    return (
      <Fragment>
        <CoinInput coinValue={walletEth} coinName="ETH" />
        <CoinInput coinValue={walletBtc} coinName="BTC" />
        <CoinInput coinValue={walletUsd} coinName="$" />
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

const CoinInput = props => {
  return (
    <CoinInputContainer>
      <CoinInputInput>
        <CoinInputInteger>{Math.round(Math.floor(props.coinValue))}</CoinInputInteger>.
        <CoinInputFraction>
          {String(props.coinValue - Math.floor(props.coinValue))
            .replace('0.', '')
            .slice(0, 8)}
        </CoinInputFraction>
      </CoinInputInput>
      <CoinInputCurrency>{props.coinName}</CoinInputCurrency>
    </CoinInputContainer>
  );
};

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
