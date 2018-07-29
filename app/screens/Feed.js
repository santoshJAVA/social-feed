import React, { Component } from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import FBSDK from 'react-native-fbsdk';

import realm from '../config/realm';
import { List, Separator } from '../components/List'

const { GraphRequest, GraphRequestManager } = FBSDK;

class Feed extends Component {

  constructor() {
    super();
    this.state = {
      isFetching: false,
    }
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentWillMount() {
    this.fetchFeeds();
  }

  fetchFeeds() {
    const { userID } = this.props.navigation.state.params;
    const infoRequest = new GraphRequest(
      `/${userID}/feed`,
      null,
      this._responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('response', result)
      this.savePosts(result);
    }
  }

  _responseInfoCallbackForPost = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('POST', result)
      this.savePost(result);
    }
  }

  savePosts(result) {
    try {
      let posts = realm.objects('Posts');
      let feeds = realm.objects('Post');
      realm.write(() => {
        realm.delete(posts);
        realm.delete(feeds);
        result.data.map((post) => {
          realm.create('Posts', {id: post.id, creationDate: post.created_time});
        })
      });
      this.setState({
        isFetching: false
      })
      this.fetchPosts();
    } catch (error) {
      console.log("Error on create post",error);
    }
  }

  savePost(result) {
    try {
      realm.write(() => {
        realm.create('Post', {id: result.id, description: result.description, full_picture: result.full_picture});
      });
    } catch (error) {
      console.log("Error on create post details",error);
    }
  }

  fetchPosts() {
    let posts = realm.objects('Posts');

    posts.map((post, index) => {
      const infoRequest = new GraphRequest(
        `/${post.id}?fields=description,full_picture`,
        null,
        this._responseInfoCallbackForPost
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    })
  }

  handleRefresh() {
    this.setState({
      isFetching: true
    })
    this.fetchFeeds();
  }

  render() {
    let feeds = realm.objects('Post');
    return (
      <View>
        <FlatList 
          data={feeds}
          renderItem={({ item }) => (
            <List 
              feed={item}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          refreshing={this.state.isFetching}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}
export default Feed;