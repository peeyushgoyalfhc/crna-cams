import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import RootNavigation from './components/RootNavigation';
import styles from './styles';
import store from './store';

class App extends React.Component {
  state = {
    assetsAreLoaded: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      );
    }
  }

  async _loadAssetsAsync() {
    try {
      await Promise.all([
        // Asset.loadAsync([
        //   require('./assets/images/robot-dev.png'),
        //   require('./assets/images/robot-prod.png'),
        // ]),
        Font.loadAsync([Ionicons.font])
      ]);
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        'There was an error caching assets (see: App.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
