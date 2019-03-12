import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './components/homeScreen';
import OverviewScreen from './components/overviewScreen';
import TransactionListScreen from './components/TransactionListScreen';
import AddTransactionScreen from './components/addTransactionScreen';


const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Overview: OverviewScreen,
      TransactionList: TransactionListScreen,
      AddTransaction: AddTransactionScreen
    },
    {
      initialRouteName: "Home"
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;