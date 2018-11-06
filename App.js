import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import WeatherLanding from './Screen/WeatherLanding';
import CityWeather from './Screen/CityWeather';
import reducers from './reducers';

export default class App extends React.Component {
  
  
  render() {
    const createStoreWithMiddleware = applyMiddleware()(createStore);

    const MainNavigator = createStackNavigator(
      {
        WeatherLanding: {
          screen: WeatherLanding,
          navigationOptions: {
            header: null,
            gesturesEnabled: false
          }
        },
        CityWeather: {
          screen: CityWeather,
          navigationOptions: {
            header: null,
            gesturesEnabled: false
          }
        }
      });

      return (
        <Provider store={createStoreWithMiddleware(reducers)}>
          <MainNavigator />
        </Provider>
      );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
