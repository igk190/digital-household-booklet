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
          onPress={ () => this.props.navigation.navigate('Overview')}
          />
          <Button
          title="Transaction list"
          onPress={ () => this.props.navigation.navigate('TransactionList')}
          />
          <Button
          title="Add transactions"
          onPress={ () => this.props.navigation.navigate('AddTransaction')}
          />
        </View>
      );
    }
  }

  export default HomeScreen;