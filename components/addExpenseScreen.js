import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Input, Button } from 'react-native-elements';

class AddExpensesScreen extends React.Component {
    static navigationOptions = {
      title: 'Add Expenses',
    };

    constructor(props){
      super(props)
      this.state = {
        expense: '',
        category: '',
        expenses: [],
      }
    }

    saveExpense = (expense) => {
      console.log(expense)
      this.setState({expense: expense})
    }
    saveCategory = (category) => {
      this.setState({category: category})
    }

    addExpenseCatRow = () => {

      const exp = this.state.expense;
      const cat = this.state.category;
      const id = Math.random() + 1;
      let newRow = {"expense": exp, "category": cat, "id": id};
      
      this.setState((prevState) => ({
        expenses: [...prevState.expenses, Object.assign({}, newRow)]
      }))

      console.log('OKUR LOGGING STATE', this.state.expenses)
  
    }
    
    render() {
     
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Input
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
          
          />

            {/* { 
              this.state.displayExpenses ? 
              <Text style={{fontSize: 25, textAlign:'center'}}>
                {this.loopThroughExpenses()}
                IN APP €: {this.state.expense}, Category: {this.state.category}
              </Text> 
            : 
            null
            }   */}
          {/* <ul>
            {this.state.expenses.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul> */}

          {this.state.expenses.map((item) => (
            <TouchableOpacity
              style = {styles.container}
              key={item.id}>
              <Text style = {styles.text}>

                €: {item.expense}, Category: {item.category}
              </Text>
              </TouchableOpacity>
          ))}
         
         
          <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('AddExpenses')}
          style={{margin: '1%'}}
          />
          <Button
          title="Go to Home"
          onPress ={ () => this.props.navigation.navigate('Home')}
          style={{margin: '1%'}}
          />

        </View>
      );
    }
  }
  

  export default AddExpensesScreen;

  const styles = StyleSheet.create ({
    container: {
       padding: 10,
       backgroundColor: '#d9f9b1',
       marginTop: 3,
       alignItems: 'center',
    },
    text: {
       color: '#4f603c'
    }
 })