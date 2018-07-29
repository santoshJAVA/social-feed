import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';

import styles from './styles';

export default class List extends Component {
  render() {
    const { feed } = this.props;
    return(
      <View style={styles.container}>
        <Text>{feed.description}</Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: feed.full_picture}}
        />
      </View>
    );
  }
}