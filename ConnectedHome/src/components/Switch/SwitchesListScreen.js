import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as switchDetailStore from '../../store/SwitchDetail';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Drawer,
  Toggle,
} from 'react-native-ui-kitten';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from 'react-native-platform-touchable';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {AwesomeCard} from 'react-native-awesome-card';
import SubSwitchScreen from './SubSwitchScreen';

class SwitchesListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCollapsed: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.requestSwitches();
  };

  turnSubSwitch(status, subSwitch) {
    var switchStatus = {
      subCode: subSwitch.code,
      isOn: status,
      description: (status == true ? 'Mở' : 'Tắt') + ' ' + subSwitch.name,
    };
    // console.log(status);
    // console.log(switchStatus);
    this.props.turnSubSwitch(switchStatus);
  }

  _body(listItem) {
    const items = listItem.body;
    console.log(listItem);
    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={[styles.cardContent]}
        renderItem={({item, index}) => (
          <AwesomeCard>
            <View>
              <Text>{item.name}</Text>
            </View>
          </AwesomeCard>
        )}
      />
    );
  }

  setCollapse = (itemCollapsed, i) => {
    if (itemCollapsed) {
      this.setState({itemCollapsed: i});
    } else {
      this.setState({itemCollapsed: ''});
    }
  };

  renderLeftControlIcon = () => {
    return <Icon name={'arrow-left'} size={25} />;
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderLeftControlIcon}
        onPress={() => this.props.navigation.goBack()}
      />
    );
  };

  turnSubSwitch = switchStatus => {
    switchStatus.mainCode = this.props.switchDetail
      ? this.props.switchDetail.code
      : '';
    // console.log(switchStatus);
    this.props.addSwitchStatus(switchStatus);
  };

  render() {
    const {itemCollapsed} = this.state;
    const {isLoading, switches} = this.props;
    console.log(switches);
    return (
      <Layout>
        <View>
          <TopNavigation
            title="Danh sách Switch"
            titleStyle={styles.headerTitle}
            alignment="center"
            leftControl={this.renderLeftControl()}
            // rightControls={this.renderRightControl()}
          />
        </View>
        <ScrollView>
          {switches.items.map((switchItem, i) => (
            <Collapse
              isCollapsed={itemCollapsed === i ? true : false}
              onToggle={isCollapsed => this.setCollapse(isCollapsed, i)}>
              <CollapseHeader>
                <LinearGradient
                  colors={
                    itemCollapsed === i
                      ? ['#ff416c', '#ff4b2b']
                      : ['#00d2ff', '#6fa5f1']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  locations={[0.0, 1.0]}
                  style={[styles.switch]}>
                  <Text style={[styles.title]}>{switchItem.categoryName}</Text>
                  {console.log(switchItem.subSwitches)}
                </LinearGradient>
              </CollapseHeader>
              <CollapseBody>
                <SubSwitchScreen
                  turnSubSwitch={this.turnSubSwitch}
                  subSwitches={switchItem.subSwitches}
                />
              </CollapseBody>
            </Collapse>
          ))}
        </ScrollView>
        {/* <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        /> */}
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  headerTitle: {},
  title: {
    fontSize: 20,
    lineHeight: 45,
    textAlign: 'center',
    color: '#fff',
  },
  switch: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    marginHorizontal: 10,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cardContent: {
    // backgroundColor: 'red',
  },
  cardHeader: {
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  subSwitchTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  subSwitchContent: {},
  description: {
    fontSize: 16,
    textAlign: 'justify',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default connect(
  switchDetailStore.mapStateToProps,
  switchDetailStore.mapDispatchToProps,
)(SwitchesListScreen);
