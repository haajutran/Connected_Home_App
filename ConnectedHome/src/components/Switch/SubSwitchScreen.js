import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as switchStore from '../../store/Switch';
import {Toggle} from 'react-native-ui-kitten';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {AwesomeCard} from 'react-native-awesome-card';

class SwitchesListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCollapsed: '',
    };
  }
  componentDidMount() {
    // this.fetchData();
  }

  fetchData = () => {
    // this.props.requestSwitches();
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

  setCollapse = (itemCollapsed, i) => {
    if (itemCollapsed) {
      this.setState({itemCollapsed: i});
    } else {
      this.setState({itemCollapsed: ''});
    }
  };

  render() {
    const {subSwitches} = this.props;
    console.log(subSwitches);
    return (
      <FlatGrid
        itemDimension={130}
        items={subSwitches}
        style={[styles.cardContent]}
        renderItem={({item}) => (
          <AwesomeCard padding={0}>
            <LinearGradient
              colors={['#ff416c', '#ff4b2b']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.0, 1.0]}
              style={[styles.cardHeader]}>
              <Text style={[styles.subSwitchTitle]}>{item.name}</Text>
            </LinearGradient>
            <View style={[styles.subSwitchContent]}>
              <ScrollView style={{height: 60}}>
                <Text style={[styles.description]}>{item.description}</Text>
              </ScrollView>
              <Toggle
                size="large"
                status="info"
                checked={
                  item.latestStatus === null ? false : item.latestStatus.isOn
                }
                onChange={() =>
                  this.turnSubSwitch(
                    item.latestStatus == null || item.latestStatus.isOn == false
                      ? true
                      : false,
                    item,
                  )
                }
                style={{marginVertical: 10}}
              />
            </View>
          </AwesomeCard>
        )}
      />
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
  switchStore.mapStateToProps,
  switchStore.mapDispatchToProps,
)(SwitchesListScreen);
