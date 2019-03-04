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


    loopThroughExpenses = () => {
      let all = this.state.expenses;
      console.log(all)
      let newArray = all.map(function(o){
        console.log('€:', o.expense, 'Category: ', o.category)
      })
    }
    
    updateDisplayExpenses = () => {
      this.setState({displayExpenses: true})
    }
    
    render() {

     
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Input
            placeholder='How much did you spend?'
            keyboardType='numeric'
            onChangeText={(text) => this.setState({expense:text})}
          /><Input
            placeholder='Category?'
            onChangeText={(text) => this.setState({category:text})}
          />
          <Button
            style={{margin: '5%'}}
            title="Save" 
            onPress={() => {
              const exp = this.state.expense;
              const cat = this.state.category;
              let newitem = {
                "expense": exp,
                "category": cat
              }
              let expenses = this.state.expenses;
              expenses.push(newitem);
              // this.setState({expenses: expenses})
              this.updateDisplayExpenses()


              this.setState((prevState) => ({
                // console.log('test')
                expenses: [...prevState.expenses, {expenses: expenses}]
              }))


            }}
          />

        
            { 
              this.state.displayExpenses ? 
              <Text style={{fontSize: 25, textAlign:'center'}}>
                {this.loopThroughExpenses()}
                €: {this.state.expense}, Category: {this.state.category}
              </Text> 
            : 
            null
            }  
         
          <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('AddExpenses')}
          />
          <Button
          title="Go to Home"
          onPress ={ () => this.props.navigation.navigate('Home')}
          />

        </View>
      );
    }
  }
  

  export default AddExpensesScreen;