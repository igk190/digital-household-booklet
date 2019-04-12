import React, { Component } from 'react';  
import { View, Text, StyleSheet, ScrollView} from 'react-native';  
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {  

  static propTypes = {
    transactions: PropTypes.array.isRequired
  };

  render() {
    // compare the content's height to screen height. If content height larger: enable scrolling
    return (
      <ScrollView contentContainerStyle={styles.itemsList}
      
    
      >
        {this.props.transactions.map((transaction, index) => {
          return (

            <View key={index}
            style={styles.item}
            >
              <Text 
              style={styles.itemText}>{transaction.name} - {transaction.amount} {"\n"}
               {transaction.isRecurring ? 'recurring' : 'Non-recurring'}, type: {transaction.transactionType}
               ,{"\n"} Date: {transaction.date}, Category: {transaction.category}  </Text>
            </View>
          );
        })}
      </ScrollView>
    );  
  }
}

const styles = StyleSheet.create({  
  itemsList: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,

    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
     },
    shadowOpacity: 0.47,
    shadowRadius: 3.65,
  },

  itemText: {
    // flex: 1, 
    alignItems: 'center',
    fontSize: 17,

    margin: 6,
    width: '96%',
    fontWeight: 'bold', 
    textAlign: 'center',
    backgroundColor: 'lightgrey',
  }
 
});