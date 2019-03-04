import React from 'react';
import { Text, View, AppRegistry, StyleSheet } from 'react-native';
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
    
    displayExpensesField = () => {
      if (this.state.displayExpenses == false) {
        this.setState({displayExpenses: true})
      }
    }

    loopThroughExpenses = () => {
      let all = this.state.expenses;
      console.log(all)
      let newArray = all.map(function(o){
        console.log('€:', o.expense, 'Category: ', o.category)
      })
    }
      // let subarray = [];
      // all.map(function(o) {
      //   console.log('amireachherrr')
      //   subarray.map(function(b){
      //     console.log('herroooo')
      //     console.log(all[o], b )
      //   })
      // })
      

   
    
    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {/* <Text>Add Expenses Screen</Text> */}
          
          <Input
            placeholder='HOW MUCH U SPENT'
            keyboardType='numeric'
            onChangeText={(text) => this.setState({expense:text})}
          /><Input
            placeholder='WUT CATEGORY'
            onChangeText={(text) => this.setState({category:text})}
          />
          <Button
            style={{margin: '10%'}}
            title="Save" 
            onPress={() => {
              const exp = this.state.expense;
              const cat = this.state.category;
              let newitem = {
                "expense": exp,
                "category": cat
              }
              // console.log(newitem);

              // var joined = this.state.expenses.concat(newitem);
              let expenses = this.state.expenses;
              expenses.push(newitem);
              this.setState({expenses: expenses})

              this.displayExpensesField()
            }}
          />

        
            { this.state.displayExpenses ? <Text style={{fontSize: 25, textAlign:'center'}}>
              {this.loopThroughExpenses()}
              {console.log()}
            </Text> : null}
          
         
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