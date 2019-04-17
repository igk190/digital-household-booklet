import React, { Component } from 'react';  
import { View, Text, StyleSheet, ScrollView} from 'react-native';  
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';


const swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: 'red',
    onPress: () => { test() } /// uhm
  }
]
test = () => {
  console.log('i are test')
}

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
            <Swipeout 
            right={swipeoutBtns}
            key={index}
            style={{backgroundColor: 'white'}}
            
            >
            <View style={styles.item}>
            
              <View style={styles.itemText}>
                <View style={styles.dateStyle}>
                    <Text style={styles.dateText}> date: {transaction.date} </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.left}>{transaction.name} </Text>
                  <Text style={transaction.transactionType === 'expense' ? styles.centerExpense : styles.centerIncome}>{transaction.amount}</Text>
                  <Text style={styles.right}>{transaction.category} </Text> 
                </View>

             
              </View> 

            

              </View>
            </Swipeout>
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
  },
  item: {
    margin: 2,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
     },
    shadowOpacity: 0.47,
    shadowRadius: 3.65,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemText: {
    // alignItems: 'center',
    fontSize: 17,
    margin: 6,
    width: '96%',
    textAlign: 'center',
    backgroundColor: 'lightgrey',
  },
  
  dateStyle: {
    alignSelf: 'flex-end',
  },
  dateText: {
    fontSize: 11,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 4
  },
  row: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
  left: {
    flex: 1/2,
    paddingLeft: 4,
    textAlign: 'left',
  },
  centerExpense: {
    flex: 1/4,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  centerIncome: {
    flex: 1/4,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green'
  },

  right: {
    flex: 1/4,
    textAlign: 'right',
    marginRight: 10,
  }

 
});