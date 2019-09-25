import React from 'react';
import {connect} from 'react-redux';
import * as smartConfigStore from '../store/SmartConfigStore';
import {
  ImageBackground,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {Layout, Button, Input} from 'react-native-ui-kitten';
import CardView from 'react-native-cardview';
import BI from '../assets/img/background.jpg';

class SmartConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ssid: '',
      password: '',
    };
  }

  render() {
    const {ssid, password} = this.state;

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={BI}>
        <ScrollView
          behavior="height"
          keyboardVerticalOffset={64}
          style={{marginTop: '5%', flex: 1}}
          enabled>
          <View>
            <ImageBackground style={styles.authContent}>
              <Layout style={styles.tabContent}>
                <CardView
                  cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  style={styles.cardContent}>
                  <View>
                    <Text style={styles.h4}>DÒ THIẾT BỊ</Text>
                  </View>
                  <Input
                    value={ssid}
                    onChangeText={text => this.setState({ssid: text})}
                    style={styles.input}
                    placeholder="Tên Wifi"
                    onSubmitEditing={() => this.passwordRef.focus()}
                  />
                  <Input
                    value={password}
                    onChangeText={text => this.setState({password: text})}
                    style={styles.input}
                    placeholder="Mật khẩu"
                    ref={ref => (this.passwordRef = ref)}
                    secureTextEntry
                    onSubmitEditing={this.login}
                  />
                  <Button size="large">DÒ THIẾT BỊ</Button>
                </CardView>
              </Layout>
            </ImageBackground>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  h4: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 10,
    fontSize: 20,
  },
  authContent: {
    padding: 20,
  },
  card: {
    marginTop: 20,
    padding: 20,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    elevation: 3,
  },
  tabContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  tab: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  title: {
    color: '#fff',
  },
});

export default connect(
  smartConfigStore.mapStateToProps,
  smartConfigStore.mapDispatchToProps,
)(SmartConfig);
