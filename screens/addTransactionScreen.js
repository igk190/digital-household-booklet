import React, { Component } from 'react';
import { 
  Text, 
  View,
  Keyboard,
  TextInput,
  AlertIOS,
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


// TRY OUT


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


      validate = (amount, name) => {
       return {
         amount: amount.length === 0,
         name: name.length === 0,
       };
     }

     const errors = validate(this.state.amount, this.state.name);
     const isEnabled = Object.keys(errors).some(x => errors[x]);
     
      return (
        <DismissKeyboard>
        <View style={styles.upperMain}>
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
                value={this.state.amount}
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
                style={errors.amount ? styles.amountInputWrong : styles.amountInput} 
                placeholder='€00.00'
                value={this.state.amount}
              />
      
          
              <Button
                  buttonStyle={styles.saveBtn}
                  title="Save"
                  onPress={this.handleSubmit}
                  disabled={isEnabled}
              />
  
            </View> 
 
            <TextInput 
            style={errors.name ? styles.itemInputWrong : styles.itemInput} 
            onChange={this.handleDescriptionChange} 
            maxLength={50}
            placeholder='Description e.g. washing powder'
            value={this.state.name}
            />
        
        <View style={styles.textRow}>
          <Text>Expense/Income:</Text>
          <Text>Recurring:</Text>
        </View>

        <View style={styles.btnsRow}>
          <View style={styles.nestedRow}>
              <Button
                title="Expense"
                onPress={() => this.toggleExpenseBtn()}
                buttonStyle={this.state.transactionType === 'expense' ? styles.btnFat : styles.btnFaded}
              />
              <Button
                title="Income"
                onPress={() => this.toggleIncomeBtn()}
                buttonStyle={this.state.transactionType === 'income' ? styles.btnFat : styles.btnFaded}
              />
            </View>

            <Button
            title= {this.state.isRecurring ? 'Yes' : 'No'}
            onPress={() => this.toggleRecurring()} 
            buttonStyle={styles.recurringBtn}
            />
        </View> 

        
         
         
        </View>

        <View style={styles.listView}>
          <Button
              title="View Transaction List"
              onPress ={ () => this.props.navigation.navigate('TransactionList')}
              buttonStyle={styles.listBtn}
              /> 
        </View>

      </View>
      </DismissKeyboard>
      );
    }
  }
  

export default AddTransactionsScreen;




const styles = StyleSheet.create ({

    upperMain: {
      flex: 1,
    },
    main: {
      flex: 1/3,
      padding: 25, 
      flexDirection: 'column',
      justifyContent: 'center',
      // alignItems: 'center', 
    },

    BTNcontainer: {
      flex: 1/3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    },

    cancelBtn: {
      height: 40,
      padding: 7,
      borderRadius: 5,
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
      borderRadius: 5,

      backgroundColor: 'green',
    },
    
    itemInput: {
      height: 50,
      padding: 7,
      fontSize: 18,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    },

    textRow: {
      flex: 1/4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },

     btnsRow: {
      flex: 1/4,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  nestedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
  },
    btnFat: {
      height: 40,
      backgroundColor: '#00aeef', 
    },
    btnFaded: {
      height: 40,
      backgroundColor: '#DCDCDC'
    },

    listView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    listBtn: {
      // flex: 1/4,
      // margin: 1,
      backgroundColor: '#00aeef',
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'center',
      

    },

    recurringBtn: {
         height: 40,
      backgroundColor: '#00aeef'
    },

    amountInputWrong: {
      height: 40,
      padding: 7,
      fontSize: 22,
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 3,
    },
    itemInputWrong: {
      height: 50,
      padding: 7,
      fontSize: 18,
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    }

    






    // buttonText: {
    //   fontSize: 18,
    //   color: 'white',
    //   alignSelf: 'center'
    // },
   
    
  
    
    
  });
