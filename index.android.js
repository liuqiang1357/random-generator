/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native'

const initState = {
  min: '1',
  max: '10',
  count: '1',
  results: [[]],
}

export default class random extends Component {
  constructor(props) {
    super(props)
    this.state = initState
  }

  onRandomPress() {
    const result = []
    for (let i = 0; i < this.state.count; i++) {
      const min = Number(this.state.min)
      const max = Number(this.state.max)
      const num = Math.floor(Math.random() * (max - min + 1)) + min
      result.push(String(num))
    }
    this.setState({ results: [...this.state.results, result] })
  }

  onResetPress() {
    this.setState({ results: [[]] })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>从</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.min}
            onChangeText={(text) => this.setState({ min: text})}
          />
          <Text>到</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.max}
            onChangeText={(text) => this.setState({ max: text})}
          />
          <Text>取</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.count}
            onChangeText={(text) => this.setState({ count: text})}
          />
          <Text>次</Text>
          <View style={styles.button}>
            <Button
              title="随机"
              onPress={this.onRandomPress.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="重置"
              onPress={this.onResetPress.bind(this)}
            />
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          {
            this.state.results.map((result, index) => {
              return <Text key={index}>{result.join()}</Text>
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10, flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    margin: 5,
  },
  title: {
    flexDirection: 'row', alignItems: 'center',
  },
  textInput: {
    padding: 0, marginHorizontal: 5, flex: 1,
  },
  button: {
    margin: 5,
  },
  scroll: {
    flex: 1, 
  },
})

AppRegistry.registerComponent('random', () => random)
