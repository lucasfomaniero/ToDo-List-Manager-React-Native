/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
// import Login from './screens/Login';
import Register from './screens/Register';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<Props> {
  render() {

    return (
      <Register/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', //Disposição dos elementos filhos em relação à posição flex determinada no pai
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  // bigBlue: {
  //   color: 'blue',
  //   fontSize: 50
  // },
  // smallRed: {
  //   color: 'red',
  //   fontSize: 20,
  // },
  subView: {
    height: 50,
    width: 50,
    // margin: 16,
    backgroundColor: 'skyblue'
  },
  first: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  second: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    margin: 40,
    borderColor: 'red',
    borderWidth: 1
  }
});
