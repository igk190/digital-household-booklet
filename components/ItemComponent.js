import React, { Component } from 'react';  
import { View, Text, StyleSheet, ScrollView} from 'react-native';  
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {  
  static propTypes = {
    transactions: PropTypes.array.isRequired
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.itemsList}>
        {this.props.transactions.map((transaction, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemText}>{transaction.name}, {transaction.amount} {"\n"}
               {transaction.isRecurring ? 'recurring' : 'Non-recurring'}, type:{transaction.transactionType}
               ,{"\n"} Date: {transaction.date}, category: {transaction.category}  </Text>

            </View>
          );
        })}
      </ScrollView>
    );  
  }
}

const styles = StyleSheet.create({  
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',

  },
  
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightgrey'
  }
});