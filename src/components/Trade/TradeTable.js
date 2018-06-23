import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSelected } from '../../ducks/currency';
import { fetchTransactionsRequest, getRecords } from '../../ducks/transactions';
import { getWalletUsd } from '../../ducks/wallet';
import styled from 'styled-components';

class TradeTable extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchTransactionsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.walletUsd !== nextProps.walletUsd) {
      nextProps.fetchTransactionsRequest();
    }
  }

  render() {
    const { transactions, currencyName } = this.props;
    const tranactionList = transactions ? transactions.data.result : [];
    return (
      <div>
        <h4>История операций</h4>
        <TransactionsTableWrap>
          <TransactionsTable>
            <thead>
              <TransactionsTableHead>
                <TransactionsTh>Операция</TransactionsTh>
                <TransactionsTh>Дата</TransactionsTh>
                <TransactionsTh>{currencyName.toUpperCase()}</TransactionsTh>
                <TransactionsTh>USD</TransactionsTh>
              </TransactionsTableHead>
            </thead>
            <tbody>
              {tranactionList.map(transaction => {
                let key_delta = currencyName + '_delta';
                return transaction && transaction.hasOwnProperty(key_delta) ? (
                  <TransactionsTr key={'transaction_' + transaction.id}>
                    <TransactionsTd>
                      {transaction.usd_delta > 0 ? 'Продажа' : 'Покупка'}
                    </TransactionsTd>
                    <TransactionsTd>
                      {moment(transaction.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(
                        'DD.MM.YY HH:mm',
                      )}
                    </TransactionsTd>
                    <TransactionsTd>{transaction[key_delta]}</TransactionsTd>
                    <TransactionsTd>{transaction['usd_delta']}</TransactionsTd>
                  </TransactionsTr>
                ) : null;
              })}
            </tbody>
          </TransactionsTable>
        </TransactionsTableWrap>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getRecords(state),
  currencyName: getSelected(state),
  walletUsd: getWalletUsd(state),
});

const mapDispatchToProps = { fetchTransactionsRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeTable);

//#region styles
const TransactionsTableWrap = styled.div`
  max-height: 160px;
  overflow: auto;
`;

const TransactionsTable = styled.table`
  margin: 0;
  width: 100%;
  text-align: right;
  border: 1px solid #edf0f1;
  border-collapse: collapse;
  border-radius: 3px;
`;

const TransactionsTableHead = styled.tr`
  background-color: #edf0f1;
  border: 1px solid #edf0f1;
`;

const TransactionsTh = styled.th`
  background-color: #edf0f1;
  border: 1px solid #edf0f1;
`;

const TransactionsTr = styled.tr`
  border: 1px solid #edf0f1;
`;

const TransactionsTd = styled.td`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
`;

//#endregion
