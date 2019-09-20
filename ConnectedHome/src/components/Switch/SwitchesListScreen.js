import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
import {AccordionList} from 'accordion-collapse-react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  _head(item) {
    return (
      <LinearGradient
        colors={['#00d2ff', '#6fa5f1']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        locations={[0.0, 1.0]}
        style={[styles.itemContainer]}>
        <Text style={[styles.title]}>{item.title}</Text>
      </LinearGradient>
    );
  }

  _body(item) {
    return (
      <Card style={[styles.card]}>
        <CardTitle title="asd" style={[styles.cardTitle]} />
        <CardContent text="Clifton, Western Cape" />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Share" color="#FEB557" />
          <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
        </CardAction>
      </Card>
    );
  }

  render() {
    const list = [
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
      {
        title: 'Getting Started',
        body:
          'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
      },
    ];

    return (
      <Layout>
        <ScrollView>
          <AccordionList list={list} header={this._head} body={this._body} />
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
  title: {
    fontSize: 20,
    lineHeight: 50,
    textAlign: 'center',
  },
  itemContainer: {
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
    margin: 10,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cardTitle: {
    alignSelf: 'center',
  },
});

export default AuthLoadingScreen;
