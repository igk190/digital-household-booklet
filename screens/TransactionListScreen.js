import React , { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../src/config';

let transactionsRef = db.ref('/transactions'); // not recommended according to doc

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
        let data = snapshot.val(); // receives null if empty when you call val on the snapshot
        // console.log('reffffff', snapshot.val())

        let transactions = '';
        // let bla = Object.values(data);

        data === null ? 
        console.log('huhu im empty')
        :
        transactions = Object.values(data);
        
        this.setState({  
          transactions: transactions,
          isMounted: true  // delete if not helping
        });
        // console.log('herro', Object.keys(data)[0]) //< this!
        // console.log('BLA',bla)
      });
    }

    test = (x) => {
      console.log('are i working', x);
      let itemIndexToDelete = x;
      console.log(itemIndexToDelete);
      // console.log('TEST',transactionsRef.child[itemIndexToDelete]) // no wurk 
     
      transactionsRef.on('value', snapshot => {
        let data = snapshot.val();
        let KeyWeNeed = Object.keys(data)[itemIndexToDelete]
        console.log('test', Object.keys(data)[itemIndexToDelete]) // here we have what we want to delete
        // console.log('more test', transactionsRef.child(Object.keys(data)[itemIndexToDelete])) // nope.
        // let bla = Object.values(data); // gives all firebase generated keys in array only
        // Object.keys(data)[itemIndexToDelete].remove(); doesnt work
        // let newRef = db.ref('/transactions' + '/' + Object.keys(data)[itemIndexToDelete]); // nope
        let transactions = Object.keys(data)
        // transactionsRef.child(KeyWeNeed).remove(); // nope
        // transactionsRef.child(Object.keys(data)[itemIndexToDelete]).remove();

        console.log('your mom', db.ref('transactions/' + KeyWeNeed).once('value'))
        let momRef = db.ref('transactions/' + KeyWeNeed);
        momRef.remove();
          // db.ref('/transactions/' + KeyWeNeed).once('value').remove()
      })
    }

    
    componentWillUnmount(){  //new
      this.state.isMounted = false  // ????? this makes no sense
    }

    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            
            {this.state.transactions.length > 0 ? 
          <ItemComponent transactions={this.state.transactions}
          bla={this.test} />
         : 
          <Text>No transactions in da list </Text>
        }
        </View> 
      );
    }
  }

  export default TransactionListScreen;  