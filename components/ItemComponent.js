import React, { Component } from 'react';  
import { View, Text, StyleSheet, ScrollView} from 'react-native';  
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';



export default class ItemComponent extends Component {  

  // constructor(props) {
  //   super(props);

  //   this._isMounted = false;

    state = {
      touchedRow: ''
    };
  // }
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    test: PropTypes.func
  };

  // infoBtn = [
  //   {
  //     text: 'Details',
  //     backgroundColor: 'green',
  //     onPress: () => { console.log('bla s') }
  //   }
  // ]
  deleteBtn = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteEntry() } /// uhm
    }
  //    { text: 'test',
  //   backgroundColor: 'pink',
  //   onPress: () => { this.deleteEntry() }
  //  }
  ]
  deleteEntry = () => {
    console.log('i are test', this.state.touchedRow)
    this.props.test(this.state.touchedRow)
  };

  // componentDidMount() { 
  //   this._isMounted = true;
  // }
  
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
 
  render() {
    return (
      <ScrollView contentContainerStyle={styles.itemsList}
      >
        {this.props.transactions.map((transaction, index) => {
          return (
            <Swipeout 
            right={this.deleteBtn}
            onPress={console.log('badasdadd')}
            // left={this.infoBtn}
            key={index}
            style={{backgroundColor: 'white'}}
            close={this.state.touchedRow !== index ? true : false} // todo
            onOpen={() => {
              this.setState({
                touchedRow: index
              }, () => {console.log(this.state.touchedRow, 'blablabl')} )
            }}
            >
            <View style={styles.item}>
            
              <View style={styles.itemText}>
                <View style={styles.dateStyle}>
                    <Text style={styles.dateText}> date: {transaction.dateDay}/{transaction.dateMonth}/{transaction.dateYear} </Text>
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
    marginLeft: 2,
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