import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginPage from './src/pages/LoginPage';

const AppNavigator = createStackNavigator({
  'Login' : {
    screen: LoginPage,
    navigationOptions : {
      title: 'Login - Series App'
    }
  }
},
{
  defaultNavigationOptions: {
    title: 'Series',
    headerTintColor : 'white',
    headerStyle : {
      backgroundColor : '#6ca2f7',
      borderBottomWidth : 1,
      borderBottomColor : '#C5C5C5'
    },
    headerTitleStyle : {
      color : 'white',
      fontSize : 30
    }
  }
});

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer;