import React, { Component } from 'react';
import TradeChart from './TradeChart';
import TradeOperatios from './TradeOperations';
import styled from 'styled-components';

const TradePageContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  background-color: #ffffff;
  padding: 20px 10px 10px 20px;
`;

class Trade extends Component {
  state = {};

  render() {
    return (
      <TradePageContainer>
        <TradeOperatios />
        <TradeChart />
      </TradePageContainer>
    );
  }
}

export default Trade;
