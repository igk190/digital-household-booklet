import React, { Component } from 'react';
import { 
  Text, 
  View,
  Keyboard,
  TextInput,
  AlertIOS,
  StyleSheet,
  FlatList,
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
    transactionType: transaction.transactionType,
    date: transaction.date
  });
  // console.log(transaction, "dfsf") // what R u 
};

const categories= [
  {key: 'A'},
  {key: 'B'},
  {key: 'C'},
  {key: 'D'},
  {key: 'E'},
  {key: 'F'},
  {key: 'G'},
  {key: 'H'},
  {key: 'I'},
  {key: 'J'},
  {key: 'K'},
  {key: 'L'},
  {key: 'M'},
  {key: 'N'},
  {key: 'O'},
  {key: 'P'},
  {key: 'Q'},
]
const numColumns = 4;


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
          category: '',
          amtTouched: false,
          descTouched: false,
          touched: {
            name: false,
            amount: false,
          },
          date: '',
          wasSaved: false,  
      }
    }

    renderItem = ({ item, index }) => {
      return (
        <View
        style={styles.categoryItem}
        >
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      );
    };

    
    handleBlur = (field) => (evt) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      }, () => {
        console.log('STATE AFTR', this.state.touched);
      });
    }

    handleDescriptionChange = text => {
      // console.log('HANDLE DESC CHANGE', text)
      this.setState({
        name: text   
      });
    };

    handleAmountChange = text => {
      // console.log('HANDLE DESC CHANGE', text)
      this.setState({
        amount: text   
      });
    };

    toggleRecurring = () => {
      console.log(this.state.isRecurring)
      this.setState((prevState) => ({
        isRecurring: !prevState.isRecurring
      }),
      () => {
        console.log(this.state.isRecurring)
      })
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

    componentDidMount() {
      let date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      this.setState({
        date: date + '/' + month + '/' + year
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
        transactionType: 'expense',
        touched: {
          amount: false,
          name: false,
        },
        date: '',
        wasSaved: true
      })
    }

    //////////////////////////////////////
    amountInfoComplete = () => {
       const isAmtCompleted = this.state.amount !== null ||this.state.amount.length > 0 || this.state.amount !== '€0,00' ; 
       console.log('isamountComplete', isAmtCompleted)
       return isAmtCompleted;  // returns false on 1st turn SHOULD RETURN FALSE
     }
     shouldShowError = () => { // if true, show errow
       const isAmountCompleted = this.amountInfoComplete();
       const isAmountTouched = this.state.touched.amount;
       console.log('AMT INF COMPL', isAmountCompleted)
       console.log('TOUCHED??', isAmountTouched)

       let showError = false;

       if ((isAmountCompleted && isAmountTouched) || (!isAmountCompleted && !isAmountTouched))  {
          showError = false;
       } 
        else {
          showError = true;
       }
       return showError;
     }

     // 1. we go into the app. AmtTouched = false
     // amountComplete = false. should show NO ERROR   ✓
     
     // 2. we go into amountInput, but don't type anything. Then we go
     //out of the field. AmtTouched = true, amountComplete = false.
     // Should SHOW ERROR
     // 3. we go into amountInput, we type sth. but delete everything again.
     // AmountTouched = true, amountComplete = False. Should SHOW ERROR

     // 4. we go into amtInput, we type sth. We focus out. 
     // amountTouched = true, amountComplete = true. Shoul show NO ERROR
    
    descriptionInfoComplete = () => {
      const desc = this.state.name.length === 0; // all good if TRUE
      return desc ? false : true; 
    }

    isEnabled = () => {
      const amtInfCompl = this.amountInfoComplete();
      const descInfCompl = this.descriptionInfoComplete();

      const shouldBeEnabled = amtInfCompl && descInfCompl;
      return shouldBeEnabled ?  false : true; 
    }

      
   
  

 
    render() {
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
                    unit: '€'
                  }}
                  value={this.state.amount}
                  onChangeText={this.handleAmountChange} // update state on every keypress
                  keyboardType='numeric'
                  style={this.shouldShowError() ? styles.amountInputWrong : styles.amountInput}
                  placeholder='€00.00'
                  onBlur={this.handleBlur('amount')}
                />
      
          
              <Button
                  buttonStyle={styles.saveBtn}
                  title="Save"
                  onPress={this.handleSubmit}
                  disabled={this.isEnabled()} // this.state.saveBtnEnabled = false
              />
  
            </View> 
 
            <TextInput 
            maxLength={50}
            placeholder='Description e.g. washing powder'
            value={this.state.name}
      
            onChangeText={this.handleDescriptionChange} 
            onBlur={this.handleBlur('name')}
            // style={errors.name ? styles.itemInputWrong : styles.itemInput} 
            style={this.descriptionInfoComplete() ? styles.itemInput : styles.itemInputWrong }
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

      
        <View style={styles.categoriesView}>
          <FlatList
            data={categories}
            style={styles.categoriesContainer}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
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
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    main: {
      flex: 1,
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
    },

    categoriesView: {
      backgroundColor: 'green',
      flex: 1.6,
      flexDirection: 'row',
      // padding: 25, 
      justifyContent: 'space-between'
    },
    categoriesContainer: {
      flex: 1,
      marginVertical: 20,
    },
    categoryItem: {
      backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: 40
      // height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemText: {
      color: '#fff',
    },


 
  
    
    
  });
