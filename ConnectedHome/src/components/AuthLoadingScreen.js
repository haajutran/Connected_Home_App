import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {Layout, Text, Spinner} from 'react-native-ui-kitten';
import LoadingGif from '../assets/img/loading.gif';
import * as AuthServices from '../services/AuthServices';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.checkAuth();
  }
  checkAuth = async () => {
    const isLoggedIn = await AuthServices.isUserAuthenticated();

    if (isLoggedIn) {
      const isExpired = await AuthServices.isExpired();

      if (isExpired) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Home');
      }
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  render() {
    return (
      <Layout>
        <Image style={{width: 50, height: 50}} source={LoadingGif} />
      </Layout>
    );
  }
}

export default AuthLoadingScreen;
