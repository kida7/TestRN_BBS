/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '$redux';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParam } from '$services/Types';
import { NavigationContainer } from '@react-navigation/native';
import KeepAwake from '@sayem314/react-native-keep-awake';
import HomeScreen from '$screens/Home/HomeScreen';
import DetailsScreen from '$screens/Home/DetailsScreen';

const Stack = createStackNavigator<RootStackParam>();
const stackScreenOptions = { header: () => null };
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            component={HomeScreen}
            name="HomeScreen"
            options={stackScreenOptions}
          />
          <Stack.Screen
            component={DetailsScreen}
            name="DetailsScreen"
            options={stackScreenOptions}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        {__DEV__ ? <KeepAwake /> : null}
        <View style={styles.container}>
          <Navigation />
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
