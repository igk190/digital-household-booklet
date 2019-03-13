import React, { Component } from 'react';
import { 
  Text, 
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AlertIOS,
  TouchableHighlight
} from 'react-native';
import { Input, Button } from 'react-native-elements';

import { db } from '../src/config';


// NEW
let addTransaction = transaction => {
  db.ref('/transactions').push({   // items, SET DB coll to transactions in Firebase
    name: transaction
  });
};
// END NEW

class AddTransactionsScreen extends Component {
    static navigationOptions = {
      title: 'Add Transactions',
    };

    constructor(props){
      super(props)
      this.state = {
        // transaction: '',
        // category: '',
        // transactions: [],   // expense, expenses
        name: ''
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

    handleChange = e => {
      this.setState({
        name: e.nativeEvent.text
      });
    };
    handleSubmit = () => {
      addTransaction(this.state.name); // add amount later
      AlertIOS.alert('Transaction saved succesfully');
    }
    
    render() {
     
      return (
        <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
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
         
          {/* <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('Transactions')}
          style={{margin: '1%'}}
          /> */}
          <Button
          title="Go to Home"
          onPress ={ () => this.props.navigation.navigate('Home')}
          style={{margin: '1%'}}
          />

        </View>
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
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});