import React from 'react';
import { Text, View, FlatList } from 'react-native';
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
        displayExpenses: false,
      }
    }
    
    updateDisplayExpenses = () => {
      this.setState({displayExpenses: true})
    }

    loopThroughExpenses = () => {
      let all = this.state.expenses;
      console.log('all',all)
      let newArray = all.map(function(o){
        console.log('CONSOLE €:', o.expense, 'Category: ', o.category)
      })
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
      let newRow = {"expense": exp, "category": cat};
      
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

            { 
              this.state.displayExpenses ? 
              <Text style={{fontSize: 25, textAlign:'center'}}>
                {this.loopThroughExpenses()}
                IN APP €: {this.state.expense}, Category: {this.state.category}
              </Text> 
            : 
            null
            }  
         
         
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