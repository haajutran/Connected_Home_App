import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as authStore from '../../store/Authentication';
import {
  Layout,
  Button,
  Input,
  TopNavigation,
  Text,
  TopNavigationAction,
  ButtonProps,
  TabView,
  Tab,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CardView from 'react-native-cardview';
import BI from '../../assets/img/background.jpg';
import * as validation from '../../services/Validate';
import Toast from 'react-native-simple-toast';
import SignUpScreen from './SignUp';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedIndex: 0,
      emailIsValid: true,
      passwordIsValid: true,
      emailMessage: '',
      passwordMessage: '',
      modalVisible: false,
    };
  }

  login = async () => {
    // Handle Button press
    const {email, password} = this.state;
    // console.log(validation.emailIsValid(email));
    const isValid = this.validateInput(email, password);
    if (isValid) {
      const data = {
        email,
        password,
      };
      const loginRes = await this.props.login(data);
      if (loginRes.status === 200) {
        this.props.navigation.navigate('Home');
        return;
      } else {
        Toast.show(loginRes.data);
      }
    }
  };

  validateInput = (email, password) => {
    var emailIsValid = true;
    var emailMessage = '';
    var passwordIsValid = true;
    var passwordMessage = '';
    if (!validation.required(email)) {
      emailIsValid = false;
      emailMessage = 'Không để trống Email!';
    } else if (!validation.emailIsValid(email)) {
      emailIsValid = false;
      emailMessage = 'Email chưa đúng định dạng!';
    }
    if (!validation.required(password)) {
      passwordIsValid = false;
      passwordMessage = 'Không để trống Mật khẩu!';
    }
    this.setState({
      emailIsValid,
      emailMessage,
      passwordIsValid,
      passwordMessage,
    });
    if (emailIsValid && passwordIsValid) {
      return true;
    }
    return false;
  };

  onEmailChange = inputValue => {
    this.setState({email: inputValue});
  };

  onPasswordChange = inputValue => {
    this.setState({password: inputValue});
  };

  renderControlIcon = () => {
    return <Icon name="angle-left" size={30} />;
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderControlIcon}
        // onPress={this.onLeftControlPress}
      />
    );
  };
  onSelect = selectedIndex => {
    this.setState({selectedIndex});
  };
  shouldLoadTabContent = index => {
    return index === this.state.selectedIndex;
  };

  render() {
    const {
      emailIsValid,
      passwordIsValid,
      emailMessage,
      passwordMessage,
      modalVisible,
    } = this.state;

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={BI}>
        <ScrollView
          behavior="height"
          keyboardVerticalOffset={64}
          style={{marginTop: '5%', flex: 1}}
          enabled>
          <View>
            <Text style={styles.h1} category="h1">
              CONNECTED HOME
            </Text>
            <ImageBackground style={styles.authContent}>
              <TabView
                selectedIndex={this.state.selectedIndex}
                shouldLoadComponent={this.shouldLoadTabContent}
                onSelect={this.onSelect}
                tabBarStyle={styles.tab}
                indicatorStyle={{backgroundColor: '#fff'}}>
                <Tab title="ĐĂNG NHẬP" titleStyle={styles.title}>
                  <Layout style={styles.tabContent}>
                    <CardView
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}
                      style={styles.cardContent}>
                      <Input
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                        style={styles.input}
                        status={!emailIsValid && 'danger'}
                        caption={!emailIsValid && emailMessage}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordRef.focus()}
                      />
                      <Input
                        value={this.state.password}
                        onChangeText={this.onPasswordChange}
                        style={styles.input}
                        status={!passwordIsValid && 'danger'}
                        caption={!passwordIsValid && passwordMessage}
                        placeholder="Mật khẩu"
                        autoCompleteType="email"
                        ref={ref => (this.passwordRef = ref)}
                        secureTextEntry
                        onSubmitEditing={this.login}
                      />
                      <Button size="large" onPress={this.login}>
                        ĐĂNG NHẬP
                      </Button>
                    </CardView>
                  </Layout>
                </Tab>
                <Tab title="ĐĂNG KÝ" titleStyle={styles.title}>
                  <Layout style={styles.tabContent}>
                    <SignUpScreen />
                  </Layout>
                </Tab>
              </TabView>
            </ImageBackground>
          </View>
        </ScrollView>
        {/* <Input
          value={this.state.inputValue}
          onChangeText={this.onInputValueChange}
        />
        <Input
          value={this.state.inputValue}
          onChangeText={this.onInputValueChange}
        />

        <Button onPress={this.onPress}>BUTTON</Button> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
    color: '#fff',
    fontWeight: 'bold',
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
  authStore.mapStateToProps,
  authStore.mapDispatchToProps,
)(LoginScreen);
