import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-easy-chart';
import moment from 'moment';
import { PropagateLoader } from 'react-spinners';

import {
  getIsBtcLoading,
  getIsEthLoading,
  getSelected,
  sellBtc,
  purchaseBtc,
  sellEth,
  purchaseEth,
  getOffset,
  selectOffset,
} from '../../ducks/currency';
import styled from 'styled-components';

class TradeChart extends Component {
  state = {
    inputFiat: 0,
    inputSell: 0,
    inputPurchase: 0,
    currentOffset: '4h',
  };
  render() {
    const {
      currencyName,
      isBtcLoading,
      isEthLoading,
      sellBtc,
      sellEth,
      purchaseBtc,
      purchaseEth,
      offset,
    } = this.props;
    const sellArr = currencyName === 'btc' ? (sellBtc ? sellBtc : []) : sellEth ? sellEth : [];
    const purchaseArr =
      currencyName === 'btc' ? (purchaseBtc ? purchaseBtc : []) : purchaseEth ? purchaseEth : [];
    const isLoading = currencyName === 'btc' ? isBtcLoading : isEthLoading;
    return (
      <div>
        <h4>Окно графика</h4>
        <TradeChartTableSection>
          <TradeChartButtons>
            {Object.keys(offsets).map(item => (
              <TradeChartButton
                onClick={this.handleOffsetBtn}
                key={item}
                name={item}
                active={offset === item}
              >
                {offsets[item]}
              </TradeChartButton>
            ))}
          </TradeChartButtons>
          {isLoading ? (
            <WrapSpinner>
              <PropagateLoader size={40} color={'#4db6e2'} loading={true} />
              <p>Загрузка гафика</p>
            </WrapSpinner>
          ) : (
            <LineChart
              lineColors={['blue', 'red']}
              axes
              grid
              verticalGrid
              interpolate={'cardinal'}
              xType={'time'}
              datePattern={'%d-%m %H:%M'}
              width={750}
              height={400}
              style={{
                '.axis path': {
                  stroke: '#EDF0F1',
                },
              }}
              data={[
                sellArr.map(([date, value]) => ({
                  x: moment(date).format('DD-MM HH:mm'),
                  y: value,
                })),
                purchaseArr.map(([date, value]) => ({
                  x: moment(date).format('DD-MM HH:mm'),
                  y: value,
                })),
              ]}
            />
          )}
        </TradeChartTableSection>
      </div>
    );
  }

  handleOffsetBtn = event => {
    const { selectOffset } = this.props;
    selectOffset(event.target.name);
  };
}

const mapStateToProps = state => ({
  isBtcLoading: getIsBtcLoading(state),
  isEthLoading: getIsEthLoading(state),
  sellBtc: sellBtc(state),
  sellEth: sellEth(state),
  purchaseBtc: purchaseBtc(state),
  purchaseEth: purchaseEth(state),
  currencyName: getSelected(state),
  offset: getOffset(state),
});

const mapDispatchToProps = {
  selectOffset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeChart);

//#region styles
const TradeChartButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #edf0f1;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TradeChartButton = styled.button`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#4db6e2' : 'transparent')};
  color: ${props => (props.active ? '#ffffff' : '#9998a1')};
  padding: 2px 16px;
`;

const TradeChartTableSection = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 750px;
  min-height: 450px;
  margin-top: 15px;
  border: 1px solid #edf0f1;
`;

const WrapSpinner = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 750px;
  min-height: 400px;
  justify-content: center;
  align-items: center;

  p {
    margin: 40px 0 0 50px;
    color: #4db6e2;
  }
`;

const offsets = {
  '1h': '1час',
  '4h': '4часа',
  '8h': '8часов',
  '1d': 'день',
  '7d': 'неделя',
};

//#endregion
