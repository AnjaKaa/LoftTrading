import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  buyCurrencyRequest,
  sellCurrencyRequest,
  getCurrentBtcPurchase,
  getCurrentBtcSell,
  getCurrentEthPurchase,
  getCurrentEthSell,
  getSelected,
  getIsBtcLoading,
  getIsEthLoading,
} from '../../ducks/currency';
import styled from 'styled-components';

import TradeOperation from './TradeOperation';

class TradeOperations extends Component {
  state = {
    inputFiat: 0,
    inputSell: 0,
    inputPurchase: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { currencyName, sellBtc, sellEth, purchaseBtc, purchaseEth } = nextProps;
    const sell = currencyName === 'btc' ? sellBtc : sellEth;
    const purchase = currencyName === 'btc' ? purchaseBtc : purchaseEth;
    this.changeInputs('inputFiat', sell, purchase);
    this.changeInputs('inputSell', sell, purchase);
    this.changeInputs('inputPurchase', sell, purchase);
  }

  render() {
    const { inputFiat, inputSell, inputPurchase } = this.state;
    const { currencyName, isBtcLoading, isEthLoading } = this.props;
    const isLoading = currencyName === 'btc' ? isBtcLoading : isEthLoading;
    return (
      <TradeOperationsContainer>
        <h4>Покупка/продажа</h4>
        <div>
          <TradeOperation
            name="inputFiat"
            currency={currencyName}
            value={inputFiat}
            handleChange={this.handleChange}
          />
        </div>
        <div>
          <TradeOperation
            name="inputPurchase"
            currency={'$'}
            value={inputPurchase}
            handleChange={this.handleChange}
          />
          <TradeOperationsButtonSell onClick={this.handleSell} disabled={isLoading}>
            Продать
          </TradeOperationsButtonSell>
        </div>
        <div>
          <TradeOperation
            name="inputSell"
            currency={'$'}
            value={inputSell}
            handleChange={this.handleChange}
          />
          <TradeOperationsButtonPurchase onClick={this.handleBuy} disabled={isLoading}>
            Купить
          </TradeOperationsButtonPurchase>
        </div>
      </TradeOperationsContainer>
    );
  }

  handleBuy = () => {
    const { currencyName } = this.props;
    const { inputFiat } = this.state;
    this.props.buyCurrencyRequest({ currencyName, value: inputFiat });
  };

  handleSell = () => {
    const { currencyName } = this.props;
    const { inputFiat } = this.state;
    this.props.sellCurrencyRequest({ currencyName, value: inputFiat });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { currencyName, sellBtc, purchaseBtc, sellEth, purchaseEth } = this.props;

    this.setState({ [name]: value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '') });
    if (isNaN(event.target.value) || event.target.value === '')
      this.changeInputs(event.target.name, 0, 0);
    else if (currencyName === 'btc') this.changeInputs(event.target.name, sellBtc, purchaseBtc);
    else if (currencyName === 'eth') this.changeInputs(event.target.name, sellEth, purchaseEth);
  };

  changeInputs(name, sell, purchase) {
    switch (name) {
      case 'inputFiat': {
        this.setState(({ inputFiat }) => {
          const parsed = isNaN(inputFiat) ? 0 : parseFloat(inputFiat);
          return {
            inputSell: parsed * sell,
            inputPurchase: parsed * purchase,
          };
        });
        break;
      }
      case 'inputSell':
        this.setState(({ inputSell }) => {
          const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
          const nextItem = parsedSell / sell;
          return {
            inputFiat: nextItem,
            inputPurchase: nextItem * purchase,
          };
        });
        break;
      case 'inputPurchase':
        this.setState(({ inputPurchase }) => {
          const parsedPurchase = isNaN(inputPurchase) ? 0 : parseFloat(inputPurchase);
          const nextFiat = parsedPurchase / purchase;
          return {
            inputFiat: nextFiat,
            inputSell: nextFiat * sell,
          };
        });
        break;
      default:
        break;
    }
  }
}
const mapStateToProps = state => ({
  sellBtc: getCurrentBtcSell(state),
  sellEth: getCurrentEthSell(state),
  purchaseBtc: getCurrentBtcPurchase(state),
  purchaseEth: getCurrentEthPurchase(state),
  isBtcLoading: getIsBtcLoading(state),
  isEthLoading: getIsEthLoading(state),
  currencyName: getSelected(state),
});

const mapDispatchToProps = {
  buyCurrencyRequest,
  sellCurrencyRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeOperations);

//#region styles
const TradeOperationsContainer = styled.article`
  padding-top: 40px;
`;

const TradeOperationsButton = styled.button`
  width: 100px;
  margin: 0 20px;
  border: 0;
  color: #fff;
  padding: 5px 0 3px;
  border-radius: 3px;

  &:disabled {
    opacity: 0.2;
  }
`;

const TradeOperationsButtonSell = TradeOperationsButton.extend`
  background-color: #cb5f58;
  &:hover {
    background-color: #ba564f;
  }
`;
const TradeOperationsButtonPurchase = TradeOperationsButton.extend`
  background-color: #69b3dc;
  &:hover {
    background-color: #63acd5;
  }
`;
//#endregion
