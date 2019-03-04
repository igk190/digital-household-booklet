import { createStackNavigator, createAppContainer } from 'react-navigation';

import AddExpensesScreen from './components/addExpenseScreen';
import HomeScreen from './components/homeScreen';
import OverviewScreen from './components/overviewScreen';


const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      AddExpenses: AddExpensesScreen,
      Overview: OverviewScreen
    },
    {
      initialRouteName: "Home"
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;