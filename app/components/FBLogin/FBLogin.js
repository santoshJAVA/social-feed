import React, { Component } from 'react';
import FBSDK from 'react-native-fbsdk';
import { View, Text } from 'react-native';

import styles from './styles'


const { LoginButton, AccessToken } = FBSDK;

export default class FBLogin extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Social Feeds</Text>
        <LoginButton
          readPermissions={['public_profile', 'email', 'user_posts']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => this.props.navigation.navigate('Feed', {userID: data.userID})
                )
              }
            }
          }
        />
      </View>
    );
  }
}


