import React , { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../src/config';

let transactionsRef = db.ref('/transactions'); // not recommended according to doc

class TransactionListScreen extends Component {

  // constructor(props) {
  //   super(props);

  //   this._isMounted = false;
    
    state = {
      transactions: [],
      isMounted: false, // new,
      hasTransactions: false
      };
    // }
    
    stateIsEmpty = () => {
      this.state.transactions.length > 0 ? 
      this.setState({
        hasTransactions: true
      }) :
      console.log('da state array is empty')
    };

    componentDidMount = () => { // is supposed to run after component is mounted
      // this._isMounted = true;
    
      transactionsRef.on('value', snapshot => {
        let data = snapshot.val(); // receives null if empty when you call val on the snapshot
        console.log('reffffff', snapshot.val())
        let transactions = '';
        data === null ? 
        console.log('huhu im empty')
        :
        transactions = Object.values(data);
        
        this.setState({  
          transactions: transactions,
          // isMounted: true  // delete if not helping
        });

      });
    } 

    test = (x) => {
      let itemIndexToDelete = x;
      console.log('item to del', itemIndexToDelete)

      transactionsRef.on('value', snapshot => {
        let data = snapshot.val();
        let KeyWeNeed = Object.keys(data)[itemIndexToDelete]
        console.log('test', KeyWeNeed) // here we have what we want to delete - undefined
       
        // let transactions = Object.keys(data)
        // console.log('TRANSSSSS', transactions) 

        let momRef = db.ref('transactions/' + KeyWeNeed);
        console.log('momref', momRef) // undefined
        momRef.set(null);
      })
    } 
    
  //   componentWillUnmount() {
  //     this._isMounted = false;
  //  }

    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            
            {this.state.transactions.length > 0 ? 
          <ItemComponent transactions={this.state.transactions}
          test={this.test} />
         : 
          <Text>No transactions in da list </Text>
        }
        </View> 
      );
    }
  }

  export default TransactionListScreen;  