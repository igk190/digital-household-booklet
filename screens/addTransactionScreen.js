import React, { Component } from 'react';
import { 
  Text, 
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  TouchableWithoutFeedback
 
} from 'react-native';
import { Input, Button } from 'react-native-elements';


import { db } from '../src/config';


// NEW
let addTransaction = transaction => {
  db.ref('/transactions').push({   // items
    name: transaction.name,
    amount: transaction.amount

  });
  console.log(transaction, "dfsf") // what R u 
};
// END NEW

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
        // transaction: '',
        // category: '',
        // transactions: [],   // expense, expenses
          name: '',
          amount: '',
          transactionType: '', // income or expense
          recurring: false,
          category: ''

      }
    }

    // saveExpense = (expense) => {
    //   console.log(expense)
    //   this.setState({expense: expense})
    // }
    // saveCategory = (category) => {
    //   this.setState({category: category})
    // }
    // addExpenseCatRow = () => {
    //   const exp = this.state.expense;
    //   const cat = this.state.category;
    //   const id = Math.random() + 1;
    //   let newRow = {"expense": exp, "category": cat, "id": id};
      
    //   this.setState((prevState) => ({
    //     expenses: [...prevState.expenses, Object.assign({}, newRow)]
    //   }))
    //   console.log('OKUR LOGGING STATE', this.state.expenses)
    // }

    handleAmountChange = e => {
      this.setState({
        amount: e.nativeEvent.text   // make such a function for each textinput?
      });
    };
    handleDescriptionChange = e => {
      this.setState({
        name: e.nativeEvent.text   // make such a function for each textinput?
      });
      console.log(e)
    };
    

    handleSubmit = () => {
      addTransaction(this.state);
      // addTransaction(this.state.name);
      AlertIOS.alert('Transaction saved succesfully');
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
            <TextInput 
            style={styles.amountInput} 
            onChange={this.handleAmountChange} 
            keyboardType='numeric'
            maxLength={10}
            placeholder='€00.00'
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
          />
        

        <View style={styles.BTNcontainer}>
          <View style={styles.buttonBox}>
            <Button
              title="Income"
              onPress={() => this.setState({ transactionType: 'first' })}
              isActive={this.state.transactionType === 'first'}
            />
            </View>
            <View style={styles.buttonBox}>
            <Button
              title="Expense"
              onPress={() => this.setState({ transactionType: 'second' })}
              isActive={this.state.transactionType === 'second'}
            />
          </View>
          <Button
          title="Recurring"
          onPress={() => this.setState({ recurring: false })}
          // isActive={this.state.transactionType === 'second'}
        />
        </View>

        

     
          {/* <Input
            placeholder='How much did you spend?'
            keyboardType='numeric'
            onChangeText={this.saveExpense}
          /><Input
            placeholder='Category?'
            onChangeText={this.saveCategory}
          />
          <Button
            style={{margin: '5%'}}
            title="Save" 
            onPress={this.addExpenseCatRow} 
          
          /> */}

          {/* {this.state.expenses.map((item) => (
            <TouchableOpacity
              style = {styles.container}
              key={item.id}>
              <Text style = {styles.text}>

                €: {item.expense}, Category: {item.category}
              </Text>
              </TouchableOpacity>
          ))} */}
         
      
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

const styles = StyleSheet.create ({
  container: {
      padding: 10,
      backgroundColor: '#d9f9b1',
      marginTop: 3,
      width: "100%",
      alignItems: 'center',
  },
  text: {
      color: '#4f603c'
  },
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  amountInput: {

    height: 50,
    padding: 4,
    marginRight: 2,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
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
  BTNcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonBox: {
    flex: 1,
  }
});