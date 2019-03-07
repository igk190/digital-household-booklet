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
      // console.log('kjjbkjkkjhj',exp)
      const cat = this.state.category;
      // let oldExpensesStateArray = this.state.expenses; // empty because you didnt setstae yet DUH
      // let newItem = {
      //   expenses: exp, 
      //   category: cat
      // } // dit werkt niet; je krijgt item ook erbij; nested
      // console.log(newItem)
      let test = {"expense": exp, "category": cat};
      // console.log('TEST',test)
      
      this.setState((prevState) => ({
        expenses: [...prevState.expenses, Object.assign({}, test)]
      }))

      console.log(this.state)

      // this.setState({
      //   expenses: [
      //     {
      //       expense: exp,
      //       category: cat
      //     }
      //   ]
      //   })
      // }
      // expensesNEW.push(newitem);
      // this.updateDisplayExpenses();

      // this.setState((prevState) => ({
      //   expenses: [...prevState.expenses, {expensesNEW}]
        
      // }))
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