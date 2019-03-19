import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


class OverviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Overview', 
  }; 

  constructor(props) {
    super(props)

    this.state = {
      simple: '',
      advanced: ''
    }
  }
    render() {
      return (
        <View style={styles.main}>
           <Text> Here we will see all expenses</Text>
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
          />
          
        </View>
      );
    }
  }

  export default OverviewScreen;

  
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

      

      // alignItems: 'center'
      
    },
    text: {
      textAlign: 'center',
     
    }
  })