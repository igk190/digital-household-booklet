import React, { Component } from 'react';
import { 
  Text, 
  View,
  Keyboard,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { Button } from 'react-native-elements';

import { TextInputMask } from 'react-native-masked-text';
// import styles from '../styles/styles';

import { db } from '../src/config';

let addTransaction = transaction => {
  db.ref('/transactions').push({   // items
    name: transaction.name,
    amount: transaction.amount,
    isRecurring: transaction.isRecurring,
    transactionType: transaction.transactionType
  });
  // console.log(transaction, "dfsf") // what R u 
};


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    { children}
  </TouchableWithoutFeedback>
);

class AddTransactionsScreen extends Component {
    static navigationOptions = {
      title: 'Add Transaction', 
    };
 
    constructor(props){
      super(props)

      this.state = {
          name: '',
          amount: '',
          transactionType: 'expense', // income or expense, expense == default
          isRecurring: false, // default
          category: ''

      }
    }



    handleAmountChange = e => {
      this.setState({
        amount: e.nativeEvent.text   
      });
    };
    handleDescriptionChange = e => {
      this.setState({
        name: e.nativeEvent.text   
      });
    };

    toggleRecurring = () => {
      console.log(this.state.isRecurring)
      this.setState((prevState) => ({
        isRecurring: !prevState.isRecurring
      }),
      () => {
        console.log(this.state.isRecurring)
      }
      )
      // console.log(this.state.isRecurring)
    }

   
    toggleExpenseBtn = () => {
      this.setState({
        transactionType: 'expense'
      })
      console.log('bye monnie')

    }
    toggleIncomeBtn = () => {
      console.log('rich bish')
      this.setState({
        transactionType: 'income'
      })
    }
    
    handleSubmit = () => {
      addTransaction(this.state); // this first THEN submitclear needed?
      this.submitAndClear();
      AlertIOS.alert('Transaction saved succesfully');
    }
    submitAndClear = () => {
      this.setState({
        name: '',
        amount: '',
        isRecurring: false,
        transactionType: 'expense'
      })
    }
   

    
    render() {
     
      return (
        <DismissKeyboard>
          <View style={styles.main}>
  
            <View style={styles.BTNcontainer}>
   
              <Button
                  buttonStyle={styles.cancelBtn}
                  title="Cancel"
                  onPress={() => this.props.navigation.navigate('Home')} // what about stuff typed in fields already?
              />

              <TextInputMask
                type={'money'}
                options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: '€',
                suffixUnit: ''
                }}
                value={this.state.advanced}
                onChangeText={amt => {
                  this.setState({
                    amount: amt
                  })
                }}
                onChange={amt => {
                  this.handleAmountChange(amt)
                }}
                keyboardType='numeric'
                maxLength={10}
                style={styles.amountInput} 
                placeholder='€00.00'
                value={this.state.amount}
              />
      
              <TouchableHighlight
                style={styles.saveBtn}
                onPress={this.handleSubmit}> 
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
  
            </View> 
 
            <TextInput 
            style={styles.itemInput} 
            onChange={this.handleDescriptionChange} 
            maxLength={50}
            placeholder='Description e.g. Washing powder'
            value={this.state.name}
            />
        

        <View style={styles.BTNcontainer}>
          <View style={styles.buttonBox}>
            <Button
              title="Expense"
              onPress={() => this.toggleExpenseBtn()}
              style={this.state.transactionType === 'expense' ? styles.btnFat : styles.btnFaded}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Income"
              onPress={() => this.toggleIncomeBtn()}
              style={this.state.transactionType === 'income' ? styles.btnFat : styles.btnFaded}
            />
          </View>
            <Button
            title= {this.state.isRecurring ? 'YES' : 'NO'}
            onPress={() => this.toggleRecurring()} 
            />
        </View> 
        <View
        style={styles.viewTrans}>
          <Button
            title="View Transaction List"
            onPress ={ () => this.props.navigation.navigate('TransactionList')}
            style={{margin: '1%'}}
            /> 

        </View>
         
        </View>
        </DismissKeyboard>
      );
    }
  }
  

export default AddTransactionsScreen;




const styles = StyleSheet.create ({

    main: {
      flex: 1/3,
      padding: 25, 
      flexDirection: 'column',
      justifyContent: 'center',
      // alignItems: 'center', 
    },

    BTNcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    cancelBtn: {
      height: 40,
      // width: '100%',
      backgroundColor: 'red',
    },
    amountInput: {
      height: 40,
      padding: 7,
      fontSize: 22,
    },
    saveBtn: {
      height: 40,
      padding: 7,
      backgroundColor: 'green',
    },
    
    itemInput: {
      height: 50,
      padding: 7,
      fontSize: 18,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
  






    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'green',
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      width: "75%",
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    btnINOUT: {
      width: "45%"
    },
   
    buttonBox: {
      flex: 1,
    },
  
    btnFat: {
        backgroundColor: '#00aeef',
        borderColor: 'red',
        borderWidth: 5,
        borderRadius: 15  
    },
    btnDown: {
      // some styles here
    },
    viewTrans: {
      // flex: 1/3
    }
  });
