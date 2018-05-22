import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  buyCurrencyRequest,
  sellCurrencyRequest,
  getCurrentBtcPurchase,
  getCurrentBtcSell,
} from '../../ducks/currency';
import styled from 'styled-components';

//#region styles
const TradeOperationsContainer = styled.article`
  padding-top: 40px;
`;
const TradeOperationsInputWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin: 5px 0;
  width: 218px;
`;
const TradeOperationsInput = styled.input`
  background-color: transparent;
  border: none;
  text-align: right;
  width: 100%;
  padding: 5px 0 3px;
  padding-right: 50px;
  box-sizing: border-box;
`;
const TradeOperationsCurrency = styled.span`
  position: absolute;
  right: 8px;
  width: 38px;
  text-align: left;
  color: #adadad;
  top: 5px;
`;

const TradeOperationsButton = styled.button`
  width: 100px;
  margin-left: 20px;
  border: 0;
  color: #fff;
  padding: 5px 0 3px;
  border-radius: 3px;
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

class TradeOperation extends Component {
  render() {
    const { name, currency, value, handleChange } = this.props;
    return (
      <TradeOperationsInputWrapper>
        <TradeOperationsInput onChange={handleChange} name={name} value={value} />
        <TradeOperationsCurrency>{currency.toUpperCase()}</TradeOperationsCurrency>
      </TradeOperationsInputWrapper>
    );
  }
}

class TradeOperations extends Component {
  state = {
    inputFiat: 0,
    inputSell: 0,
    inputPurchase: 0,
  };
  render() {
    const { inputFiat, inputSell, inputPurchase } = this.state;
    const currency = 'btc';
    return (
      <TradeOperationsContainer>
        <h4>Покупка/продажа</h4>
        <div>
          <TradeOperation
            name="inputFiat"
            currency={currency}
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
          <TradeOperationsButtonSell className="redBtn" onClick={this.handleSell}>
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
          <TradeOperationsButtonPurchase onClick={this.handleBuy}>
            Купить
          </TradeOperationsButtonPurchase>
        </div>
      </TradeOperationsContainer>
    );
  }

  handleSell = event => {
    console.log('handleSell');
  };
  handleBuy = event => {
    console.log('handleBuy');
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { sell, purchase } = this.props;

    this.setState(state => ({ [name]: value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '') }));
    if (isNaN(event.target.value) || event.target.value === '') return;
    else this.changeInputs(event.target.name, sell, purchase);
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
  sell: getCurrentBtcSell(state),
  purchase: getCurrentBtcPurchase(state),
});

const mapDispatchToProps = {
  buyCurrencyRequest,
  sellCurrencyRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeOperations);
