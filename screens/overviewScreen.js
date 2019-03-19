import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


class OverviewScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      simple: '',
      advanced: ''
    }
  }
    render() {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Overview {"\n"}
            Here we will see all expenses</Text>
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
          />
          
        </View>
      );
    }
  }

  export default OverviewScreen;

  