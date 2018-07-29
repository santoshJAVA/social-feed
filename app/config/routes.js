import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Feed from '../screens/Feed';


export default createStackNavigator({
  Home: {
    screen: Home,
     navigationOptions: {
      headerTitle: 'Home'
    }
  },
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerTitle: 'Feed'
    }
  }
})