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

export default class setup extends Component {
  constructor(props) {
    super(props)
    this.state = initState
  }

  onRandomPress() {
    let min = Number(this.state.min)
    let max = Number(this.state.max)
    const count = Number(this.state.count)

    if (isNaN(min) || isNaN(max) || isNaN(count)) {
      return
    }

    if (min > max) {
      let tmp = max
      max = min
      min = tmp
    }

    const nums = []
    for (let i = min; i <= max; i++) {
      nums.push(i)
    }

    const result = []
    for (let i = 0; i < count && result.length < nums.length; i++) {
      const index = Math.floor(Math.random() * (nums.length - result.length))
      result.push(String(nums[index]))
      nums[index] = nums[nums.length - result.length]
    }

    this.setState({ results: [...this.state.results, result] })
  }

  onClearPress() {
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
          <Text>个</Text>
          <View style={styles.button}>
            <Button
              title="随机"
              onPress={this.onRandomPress.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="清空"
              onPress={this.onClearPress.bind(this)}
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
    padding: 10, flex: 1,
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
