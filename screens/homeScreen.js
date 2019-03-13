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
          <Text>Home</Text>
          <Button
          title="Overview"
          style={{padding:1}}
          onPress={ () => this.props.navigation.navigate('Overview')}
          />
            <Button
          title="Add transactions"
          style={{padding:1}}
          onPress={ () => this.props.navigation.navigate('AddTransaction')}
          />
          <Button
          title="List of transactions"
          style={{padding:1}}
          onPress={ () => this.props.navigation.navigate('TransactionList')}
          />
        </View>
      );
    }
  }

  export default HomeScreen;