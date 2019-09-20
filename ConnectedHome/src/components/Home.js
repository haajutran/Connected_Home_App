import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Drawer,
} from 'react-native-ui-kitten';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from 'react-native-platform-touchable';

class HomeScreen extends React.Component {
  logout = async () => {
    await AsyncStorage.clear();
  };

  renderLeftControlIcon = () => {
    return <Icon name={'menu'} size={25} />;
  };

  renderRightControlIcon = () => {
    return <Icon name="wifi" size={25} style={{fontWeight: 'bold'}} />;
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderLeftControlIcon}
        // onPress={this.onLeftControlPress}
      />
    );
  };

  renderRightControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderRightControlIcon}
        // onPress={this.onLeftControlPress}
      />
    );
  };

  redirectTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const items = [
      {name: 'TURQUOISE', code: '#1abc9c'},
      {name: 'EMERALD', code: '#2ecc71'},
      {name: 'PETER RIVER', code: '#3498db'},
      {name: 'AMETHYST', code: '#9b59b6'},
      {name: 'WET ASPHALT', code: '#34495e'},
    ];
    return (
      <Layout>
        <TopNavigation
          title="Connected Home"
          titleStyle={styles.title}
          alignment="center"
          leftControl={this.renderLeftControl()}
          rightControls={this.renderRightControl()}
        />

        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({item, index}) => (
            // <TouchableOpacity></TouchableOpacity>
            <Touchable
              onPress={() => this.redirectTo('SwitchesList')}
              style={{
                backgroundColor: '#eee',
              }}
              background={Touchable.Ripple('blue')}>
              <LinearGradient
                colors={['#00d2ff', '#6fa5f1']}
                //   start={[0.0, 0.5]}
                //   end={[1.0, 0.5]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                locations={[0.0, 1.0]}
                style={[styles.itemContainer]}>
                <Icon style={styles.itemIcon} name={'toggle-left'} size={80} />
              </LinearGradient>
            </Touchable>
          )}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  gridView: {},
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    padding: 10,
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemIcon: {
    alignSelf: 'center',
    lineHeight: 130,
    color: '#fff',
  },
});

export default HomeScreen;
