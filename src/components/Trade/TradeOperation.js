import React, { Component } from 'react';
import styled from 'styled-components';

class TradeOperation extends Component {
  render() {
    const { name, currency, value, handleChange } = this.props;
    return (
      <TradeOperationsInputWrapper>
        <TradeOperationsInput onChange={handleChange} name={name} value={value || 0} />
        <TradeOperationsCurrency>{currency.toUpperCase()}</TradeOperationsCurrency>
      </TradeOperationsInputWrapper>
    );
  }
}

export default TradeOperation;

//#region styles
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
//#endregion
