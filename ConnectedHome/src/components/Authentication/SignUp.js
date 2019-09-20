import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
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

import Icon from 'react-native-vector-icons/dist/AntDesign';
import CardView from 'react-native-cardview';
import BI from '../../assets/img/background.jpg';
import * as validation from '../../services/Validate';
import Toast from 'react-native-simple-toast';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      confirmationCode: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      confirmPassword: '',
      selectedIndex: 0,
      emailIsValid: true,
      confirmationCodeIsValid: true,
      passwordIsValid: true,
      confirmEmailIsValid: true,
      confirmPasswordIsValid: true,
      fullNameIsValid: true,
      confirmPasswordMessage: '',
      emailMessage: '',
      passwordMessage: '',
      isSentConfirmEmail: false,
      isSendingConfirm: false,
    };
  }

  sendConfirmEmail = async () => {
    // Handle Button press
    const {email} = this.state;
    // console.log(validation.emailIsValid(email));
    const isValid = this.validateEmail(email);
    console.log(isValid);
    if (isValid) {
      const confirmEmailRes = await this.props.confirmEmail(email);
      console.log(confirmEmailRes);

      if (confirmEmailRes.status == 200) {
        this.setState({
          isSentConfirmEmail: true,
        });
      } else {
        Toast.show(confirmEmailRes.data);
      }
    }
  };

  validateEmail = email => {
    var emailIsValid = true;
    var emailMessage = '';
    if (!validation.required(email)) {
      emailIsValid = false;
      emailMessage = 'Không để trống Email!';
    } else if (!validation.emailIsValid(email)) {
      emailIsValid = false;
      emailMessage = 'Email chưa đúng định dạng!';
    }
    this.setState({
      emailIsValid,
      emailMessage,
    });
    if (emailIsValid) {
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

  handleChangeText = name => {
    return text => {
      this.setState({[name]: text});
    };
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
  handleSignUp = async () => {
    const {
      email,
      confirmationCode,
      fullName,
      phoneNumber,
      password,
      confirmPassword,
    } = this.state;
    const dataToValidate = {
      confirmationCode,
      fullName,
      password,
      confirmPassword,
    };
    const isDataValid = this.validateInput(dataToValidate);
    if (isDataValid === true) {
      const dataToSignUp = {
        email: email.trim(),
        confirmationCode: confirmationCode.trim(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };
      const signUpRes = await this.props.signUp(dataToSignUp);
      if (signUpRes.status === 200) {
        const dataToLogIn = {
          email: email.trim(),
          password: password.trim(),
        };
        const loginRes = await this.props.login(dataToLogIn);
        if (loginRes.status === 200) {
          this.props.navigation.navigate('Home');
          return;
        } else {
          Toast.show(loginRes.data);
        }
      } else {
        Toast.show(signUpRes.data);
      }
    }
  };

  validateInput = data => {
    var confirmationCodeIsValid = true;
    var fullNameIsValid = true;
    var passwordIsValid = true;
    var confirmPasswordIsValid = true;
    var confirmPasswordMessage = '';
    if (!validation.required(data.confirmationCode)) {
      confirmationCodeIsValid = false;
    }
    if (!validation.required(data.fullName)) {
      fullNameIsValid = false;
    }
    if (!validation.required(data.password)) {
      passwordIsValid = false;
    }
    if (!validation.required(data.confirmPassword)) {
      confirmPasswordIsValid = false;
    }
    if (passwordIsValid === true && confirmPasswordIsValid === true) {
      if (data.password !== data.confirmPassword) {
        confirmPasswordIsValid = false;
        confirmPasswordMessage = 'Mật khẩu không khớp!';
      }
    }
    this.setState({
      confirmationCodeIsValid,
      fullNameIsValid,
      passwordIsValid,
      confirmPasswordIsValid,
      confirmPasswordMessage,
    });
    if (
      confirmationCodeIsValid &&
      fullNameIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      return true;
    }
    return false;
  };

  render() {
    const {
      emailIsValid,
      confirmationCodeIsValid,
      passwordIsValid,
      isSentConfirmEmail,
      confirmPasswordIsValid,
      fullNameIsValid,
      confirmPasswordMessage,
      confirmationCode,
      email,
      fullName,
      phoneNumber,
      password,
      confirmPassword,
      isSendingConfirm,
    } = this.state;

    return (
      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardContent}>
        {(!emailIsValid ||
          !confirmationCodeIsValid ||
          !fullNameIsValid ||
          !passwordIsValid ||
          !confirmPasswordIsValid) && (
          <Text style={styles.warningLabel}>Không để trống dữ liệu!</Text>
        )}
        {confirmPasswordMessage.length > 0 && (
          <Text style={styles.warningLabel}>{confirmPasswordMessage}</Text>
        )}

        <Input
          value={email}
          // onChangeText={this.onEmailChange}
          onChangeText={this.handleChangeText('email')}
          style={styles.input}
          status={!emailIsValid && 'danger'}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          disabled={isSentConfirmEmail ? true : false}
          onSubmitEditing={this.sendConfirmEmail}
        />
        {!isSentConfirmEmail && (
          <Button size="large" onPress={this.sendConfirmEmail}>
            {!isSentConfirmEmail && !isSendingConfirm && 'Lấy mã xác nhận'}
            {isSendingConfirm ? 'Đang gửi' : isSentConfirmEmail && 'Đã gửi'}
          </Button>
        )}
        {isSentConfirmEmail && (
          <View>
            <Input
              value={confirmationCode}
              onChangeText={this.handleChangeText('confirmationCode')}
              style={styles.input}
              status={!confirmationCodeIsValid && 'danger'}
              placeholder="Mã xác nhận"
              returnKeyType="next"
              secureTextEntry
              autoFocus
              ref={ref => (this.confirmationCodeRef = ref)}
              // disabled={isSentConfirmEmail ? true : false}
              onSubmitEditing={() => this.fullNameRef.focus()}
            />
            <Input
              value={fullName}
              onChangeText={this.handleChangeText('fullName')}
              style={styles.input}
              status={!fullNameIsValid && 'danger'}
              placeholder="Họ và Tên"
              returnKeyType="next"
              ref={ref => (this.fullNameRef = ref)}
              // disabled={isSentConfirmEmail ? true : false}
              onSubmitEditing={() => this.phoneNumberRef.focus()}
            />
            <Input
              value={phoneNumber}
              onChangeText={this.handleChangeText('phoneNumber')}
              style={styles.input}
              placeholder="Điện thoại"
              returnKeyType="next"
              ref={ref => (this.phoneNumberRef = ref)}
              onSubmitEditing={() => this.passwordRef.focus()}
            />
            <Input
              value={password}
              onChangeText={this.handleChangeText('password')}
              style={styles.input}
              status={!passwordIsValid && 'danger'}
              placeholder="Mật khẩu"
              returnKeyType="next"
              ref={ref => (this.passwordRef = ref)}
              onSubmitEditing={() => this.confirmPasswordRef.focus()}
              secureTextEntry
            />
            <Input
              value={confirmPassword}
              onChangeText={this.handleChangeText('confirmPassword')}
              style={styles.input}
              status={!confirmPasswordIsValid && 'danger'}
              caption={!confirmPasswordIsValid && confirmPasswordMessage}
              placeholder="Nhập lại mật khẩu"
              returnKeyType="done"
              ref={ref => (this.confirmPasswordRef = ref)}
              secureTextEntry
              // disabled={isSentConfirmEmail ? true : false}
              onSubmitEditing={this.handleSignUp}
            />
            <Button size="large" onPress={this.handleSignUp}>
              ĐĂNG KÝ
            </Button>
          </View>
        )}

        {/* <Input
          value={this.state.password}
          onChangeText={this.onPasswordChange}
          style={styles.input}
          status={!passwordIsValid && 'danger'}
          caption={!passwordIsValid && passwordMessage}
          placeholder="Mật khẩu"
          autoCompleteType="email"
          ref={ref => (this.passwordRef = ref)}
          secureTextEntry
        /> */}
      </CardView>
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
  warningLabel: {
    color: 'red',
    marginBottom: 10,
  },
});

export default connect(
  authStore.mapStateToProps,
  authStore.mapDispatchToProps,
)(LoginScreen);
