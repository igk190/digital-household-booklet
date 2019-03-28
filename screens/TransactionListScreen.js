import React , { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../src/config';

let transactionsRef = db.ref('/transactions');

class TransactionListScreen extends Component {

    state = {
      transactions: [],
      isMounted: false, // new,
      hasTransactions: false
    };

    stateIsEmpty = () => {
      this.state.transactions.length > 0 ? 
      this.setState({
        hasTransactions: true
      }) :
      console.log('da state array is empty')
    };

    componentDidMount() { // is supposed to run after component is mounted
      transactionsRef.on('value', snapshot => {
        let data = snapshot.val();
        let transactions = '';

        data === null ? 
        console.log('huhu im empty') 
        :
        transactions = Object.values(data);
        this.setState({ 
          transactions: transactions,
          isMounted: true  // delete if not helping
        });

        
      });
    }
    
    componentWillUnmount(){  //new
      this.state.isMounted = false  // equals char??
    }

    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            
            {this.state.transactions.length > 0 ? 
          <ItemComponent transactions={this.state.transactions} />
         : 
          <Text>No transactions in da list </Text>
        }
        </View> 
      );
    }
  }

  export default TransactionListScreen;