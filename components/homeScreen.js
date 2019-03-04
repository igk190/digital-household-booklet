import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title:'Home',
    };
  
  
    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button
          title="Go to Add Expenses"
          onPress={ () => {
            this.props.navigation.navigate('AddExpenses', 
            );
          }
        }
          />
          <Button
          title="Go to Overview"
          onPress={ () => this.props.navigation.navigate('Overview')}
          />
        </View>
      );
    }
  }

  export default HomeScreen;