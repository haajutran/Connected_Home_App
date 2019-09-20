import React from 'react';
import {View, Text} from 'react-native';
import {Button, ButtonProps} from 'react-native-ui-kitten';
import {AsyncStorage} from 'react-native';

class TestScreen extends React.Component {
  logout = async  () => {
    await AsyncStorage.clear();
  }

  render() {
    return (
      <View>
        <Text>hello ajinimoto</Text>
        <Button onPress={() => this.logout()}>Logout</Button>
      </View>
    );
  }
}

export default TestScreen;
