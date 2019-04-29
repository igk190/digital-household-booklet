import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title:'Home',
    };
  
  
    render() {
      return (
        <View style={styles.main}>
  
          <Button
          title="Overview"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.btn}
          onPress={ () => this.props.navigation.navigate('Overview')}
          />
            <Button
          title="Add transaction"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.btn}
          onPress={ () => this.props.navigation.navigate('AddTransaction')}
          />
          <Button
          title="Transaction Lists"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.btn}
        
          onPress={ () => this.props.navigation.navigate('TransactionList')}
          />
          <Button
          title="TEST flatlist"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.btn}
        
          onPress={ () => this.props.navigation.navigate('Flatlist')}
          />
        </View>
      );
    }
  }

  export default HomeScreen;

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    btn: {
      backgroundColor: 'pink',
      margin:2,
      width: 300
    },
    buttonTitle: {
      fontSize: 35
    }
  })