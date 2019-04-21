import React, { Component } from 'react';
import { 
  Text, 
  View,
  Keyboard,
  TextInput,
  AlertIOS,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { TextInputMask } from 'react-native-masked-text';

import { db } from '../src/config';



let addTransaction = transaction => {
  db.ref('/transactions').push({   // items
    name: transaction.name,
    amount: transaction.amount,
    isRecurring: transaction.isRecurring,
    transactionType: transaction.transactionType,
    date: transaction.date,
    category: transaction.category
  });
  // console.log(transaction, "dfsf") // what R u 
};

const expenseCategories = [
  {key: 'Eating out'},
  {key: 'Education'},
  {key: 'Electronics'},
  {key: 'Clothes'},
  {key: 'Food'},
  {key: 'General'},
  {key: 'Leisure'},
  {key: 'Medical'},
  {key: 'Toiletries'},
  {key: 'Transport'},
  {key: 'Travel'},
  {key: 'Other'} 
];
const incomeCategories = [
  {key: 'Salary'},
  {key: 'Gifts'},
  {key: 'Interest'},
  {key: 'Investments'},
  {key: 'Sales'},
  {key: 'Social sec.'}, 
];
const numColumns = 4;

const formatCategories = (categories, numColumns) => {
  const numberOfFullRows = Math.floor(categories.length / numColumns); // math.floor rounds down

  let numberOfElementsLastRow = categories.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    categories.push({ key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow = numberOfElementsLastRow+  1;
  }
  return categories;
}


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
          currency: '',
          transactionType: 'expense', // income or expense, expense == default
          isRecurring: false, // default
          category: '',
          touched: {
            name: false,
            amount: false,
          },
          date: '',
          wasSaved: false,  
          selectedItem: null
      }
    }

    renderItem = ({ item, index }) => {
      if (item.empty === true) {
        return <View style={[styles.categoryItem, styles.categoryItemInvisible]} />;
      }
      // style={this.shouldShowError() ? styles.amountInputWrong : styles.amountInput}
      // this.state.category === item.key ? 
      return (
        <View style={this.state.category === item.key ?  styles.categoryItemActive : styles.categoryItem}>
          <TouchableOpacity 
          activeOpacity={0.1}
          onPress={() => { this.selectCategory(item.key)}}
          // title={item.key}
          >  
            <Text>{item.key}</Text>           
          </TouchableOpacity>
        </View>
      );
    };

    selectCategory = (item) => {
      // clear background color of all other categories
      // el with onpress: give this one new color / bold text whtvr
      console.log(item)
      this.setState({
        category: item
      },
      () => {
        console.log('FLDDSKFFJDSFSD', this.state.category)
      })
    }

    
    handleBlur = (field) => (evt) => {
      console.log('FIELD BEFORE', field, this.state.touched.name);
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      }, () => {
        console.log('FIELD AFTER', field, this.state.touched.name);
      }) 
    }

    handleDescriptionChange = text => {
      this.setState({
        name: text   
      });
    };

    handleAmountChange = text => {
      let currencySliced = text.slice(0, 1); // save currency in separate var
      let amountSliced = text.slice(1); // save rest of string amount in separate var
      console.log('BLA BLA', typeof amountSliced,  amountSliced) // . to '' AND , to .

      if (amountSliced.length <= 7) { 
        let removePeriod = amountSliced.replace(",", ".");
        let finalAmount = parseFloat(removePeriod);
        console.log('FLOAT float bla bla ', typeof finalAmount, finalAmount)
        this.setState({
          amount: finalAmount,
          currency: currencySliced
        });
        
      } else if ((amountSliced.length === 8) ) {
        let firstPart = amountSliced.slice(0, 1); // thousand
        let secondPart = amountSliced.slice(2, 9); 
        let bothParts = firstPart.concat(secondPart);
        let amountFinal = parseFloat(bothParts.replace(",", "."));
        
        console.log('FINAL', typeof amountFinal);
        
        this.setState({
          amount: amountFinal,
          currency: currencySliced
        });
      }
      // @todo some day add code to cover larger numbrs...
    }
    
      // console.log('AMOUNT WITHOUT ...', amountUpdated)
    
      // this.setState({
      //   amount: text,
      //   currency: currencySliced
      //   }, () => { console.log('update baby', this.state.amount, this.state.currency)});
      // };

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
        transactionType: 'expense',
        category: ''
      })
      console.log('bye monnie')
    }
    toggleIncomeBtn = () => {
      console.log('rich bish')
      this.setState({
        transactionType: 'income',
        category: ''
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
        wasSaved: true,
        category: ''
      })
    }

    ///////////////////////////////
    amountInfoComplete = () => {
      let isAmtCompleted = '';
      if (this.state.touched.amount === false) {
        isAmtCompleted = false; // obviously, without touching you cant type anything
      } else {
      isAmtCompleted = this.state.amount !== '€0,00' && this.state.amount !== '' ;
      }
      return isAmtCompleted;
     }
  
     showAmountError = () => {
       const isAmountCompleted = this.amountInfoComplete(); // false or true
       const isAmountTouched = this.state.touched.amount;  // starts at false
       let showError = false; 

       if (isAmountTouched === false ||(isAmountCompleted && isAmountTouched) || (!isAmountCompleted && !isAmountTouched))  {
          showError = false;
       } else {
          showError = true;
       }
       return showError;
     }

     descriptionInfoComplete = () => {
      let isDescriptionComplete = this.state.name !== ''; 
     return isDescriptionComplete; 
    }
    
    showDescriptionError = () => {
      const isDescriptionCompleted = this.descriptionInfoComplete(); 
      const isDescriptionTouched = this.state.touched.name; 
      let showError = '';
      
      if (isDescriptionTouched === false || (isDescriptionCompleted && isDescriptionTouched) || (!isDescriptionCompleted && !isDescriptionTouched))  {
        showError = false;
     } else {
        showError = true;
     }
     return showError;
   }
   // go into the app. touche===false, complete===false. return showerror: false <-
    // inside app: touched===true, complete===false. showerror: true
    // inside app: touched===true, complete===true. showerror; false <- 
    
 

    isEnabled = () => {
      const amtInfCompl = this.amountInfoComplete();
      const descInfCompl = this.descriptionInfoComplete(); 

      const shouldBeEnabled = amtInfCompl && descInfCompl; 
      return shouldBeEnabled ? false : true; 
    }

    checkTransactionType = () => {
      if (this.state.transactionType === 'expense') {
        console.log('am i getting here')
        return expenseCategories
      } else {
        return incomeCategories
      }
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
                  style={this.showAmountError() ? styles.amountInputWrong : styles.amountInput}
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
            style={this.showDescriptionError() ? styles.itemInputWrong : styles.itemInput }
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
        {/* <Text>Category</Text> */}
          <FlatList
            data={formatCategories(this.checkTransactionType(), numColumns)}
            style={styles.categoriesContainer}
            renderItem={this.renderItem}
            numColumns={numColumns}
            extraData={this.state}
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
      backgroundColor: '#FFCCE5',
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
      backgroundColor: '#FF66B2', // darkpink
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: 40,
      width: '100%',
      padding: 0,
      // height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    categoryItemInvisible: {
      backgroundColor: 'transparent',
    },
   
    categoryItemActive: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: 40,
      width: '100%',
      padding: 0,
      backgroundColor: 'darkgrey' , // darkpink
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    }
  
    

 
  
    
    
  });
