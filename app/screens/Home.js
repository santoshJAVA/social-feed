import React, { Component } from "react";
import { FBLogin } from '../components/FBLogin';

export default class Home extends Component {
  render() {
    
    return(
      <FBLogin navigation={this.props.navigation}/>
    );
  }
}