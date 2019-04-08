import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


  class FlatlistScreen extends React.PureComponent {
    
    _onPress = () => {
        this.props.onPressItem(this.props.id);
      };
    
      render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View>
              <Text style={{color: textColor}}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    


  export default FlatlistScreen;

  
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