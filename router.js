import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/homeScreen';
import OverviewScreen from './screens/overviewScreen';
import TransactionListScreen from './screens/TransactionListScreen';
import AddTransactionScreen from './screens/addTransactionScreen';
import FlatlistScreen from './screens/FlatlistScreen';

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Overview: OverviewScreen,
      TransactionList: TransactionListScreen,
      AddTransaction: AddTransactionScreen,
      Flatlist: FlatlistScreen
    },
    {
      initialRouteName: "Home"
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;