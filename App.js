/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimit: 100,
      currentPage: 1,
      data: []

    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    console.log("CurrentPage :" + this.state.currentPage);
    let res = await fetch(`https://api.github.com/users?since=${this.state.currentPage}&per_page=${this.state.pageLimit}`);

    let resJson = await res.json();
    // console.log("Res :" + JSON.stringify(resJson));
    this.setState({ data: [...this.state.data, ...resJson]});
  }

  loadMoreData = () => {
    this.setState({ currentPage: this.state.currentPage + 1 }, this.getData);
  }

  renderRow = ({ item, index }) => {
    return (
      <View style={{height:40,justifyContent:'center', paddingLeft:16}}>
        <Text style={{ color: 'black' }}>
          {`ID: ${item.id}\nLogin: ${item.login} `}
        </Text>
      </View >
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <FlatList
          style={{flex:1 }}
          keyExtractor={(item, index) => index}
          data={this.state.data}
          renderItem={this.renderRow}
          onEndReached={this.loadMoreData}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{ backgroundColor: 'black', height: 1, }} />}
        />

      </View>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

