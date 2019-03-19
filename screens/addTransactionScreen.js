import React, { Component } from 'react';
import { 
  Text, 
  View,
  Keyboard,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../styles/styles';

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
            <View style={styles.buttonBox}>
              <Button
                  style={styles.button}
                  title="Cancel"
                  onPress={() => this.props.navigation.navigate('Home')} // what about stuff typed in fields already?
              />
          </View>

          <View style={styles.buttonBox}>
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
           </View>
           

          <View style={styles.buttonBox}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmit}> 
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
            </View>
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
            <Button
            title="View Transaction List"
            onPress ={ () => this.props.navigation.navigate('TransactionList')}
            style={{margin: '1%'}}
            /> 
        </View>
        </DismissKeyboard>
      );
    }
  }
  

export default AddTransactionsScreen;