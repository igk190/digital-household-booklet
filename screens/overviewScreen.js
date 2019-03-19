import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'


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
           <Text>Money: Simple</Text>
          {/* <TextInputMask
            type={'money'}
            value={this.state.simple}
            onChangeText={text => {
              this.setState({
                simple: text
              })
            }}
            style={styles.textInputStype}
          /> */}
          <Text>Money: Advanced</Text>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: '€',
              suffixUnit: ''
            }}
            value={this.state.advanced}
            onChangeText={text => {
              this.setState({
                advanced: text
              })
            }}
            style={styles.textInputStype}
          />
        </View>
      );
    }
  }

  export default OverviewScreen;

  const styles = StyleSheet.create ({
    textInputStype: {
      height: 50,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
    },
    container: {
      width: '100%',
    }
  }); 