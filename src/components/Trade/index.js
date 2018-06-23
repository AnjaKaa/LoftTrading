import React, { Component } from 'react';
import TradeChart from './TradeChart';
import TradeOperatios from './TradeOperations';
import Wallet from '../Wallet';
import TradeTable from './TradeTable';
import styled from 'styled-components';

class Trade extends Component {
  state = {};

  render() {
    return (
      <TradePageContainer>
        <div>
          <Wallet />
          <TradeOperatios />
        </div>
        <div>
          <TradeChart />
          <TradeTable />
        </div>
      </TradePageContainer>
    );
  }
}

export default Trade;

//#region styles
const TradePageContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  background-color: #ffffff;
  padding: 20px 10px 10px 20px;
`;
//#endregion
