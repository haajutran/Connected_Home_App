import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
      {
        name: 'Switch',
        icon: 'toggle-left',
        backgroundColors: ['#00d2ff', '#6fa5f1'],
      },
    ];
    return (
      <View style={{flex: 1}}>
        <View>
          <TopNavigation
            title="Connected Home"
            titleStyle={styles.title}
            alignment="center"
            leftControl={this.renderLeftControl()}
            rightControls={this.renderRightControl()}
          />
        </View>
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
              background={Touchable.Ripple('blue')}
              style={{flex: 1}}>
              <LinearGradient
                colors={item.backgroundColors}
                //   start={[0.0, 0.5]}
                //   end={[1.0, 0.5]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                locations={[0.0, 1.0]}
                style={[styles.itemContainer]}>
                <Icon style={styles.itemIcon} name={item.icon} size={80} />
                <Text style={[styles.name]}>{item.name}</Text>
              </LinearGradient>
            </Touchable>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  gridView: {
    // flex: 1,
  },
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
    lineHeight: 100,
    color: '#fff',
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
