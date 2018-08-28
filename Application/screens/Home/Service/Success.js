'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
  Image,
  TimePickerAndroid,
  FlatList,
  ToastAndroid,
  Alert

} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
//import DatePicker from 'react-native-ui-xg';
//import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  StackActions,NavigationActions
} from 'react-navigation';

class Success extends Component {

	navigateStack = (route) =>{
    const resetActions = StackActions.reset({
        index:0,
        key: null,
        actions: [
            NavigationActions.navigate({
            routeName: route,
          }),
        ]
      });
      this.props.navigation.dispatch(resetActions);
  }
  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
    return (
      <Container>
      <Card flex={1} alignItems="center" justifyContent="center">
      <Card height={120} borderRadius={6} width={width-60}  backgroundColor="#C2185B">
      	<Card alignItems="center" justifyContent="center">
      		<Text style={{color: '#FFFFFF',fontSize: 20,textAlign:"center"}}>ORDER BOOKED</Text>
      		<Text style={{color: '#FFFFFF',fontSize: 10,textAlign:"center"}}>ORDER 8882888</Text>
      		<Text style={{color: '#FFFFFF',fontSize: 18,textAlign:"center"}}>Massage by James Bond</Text>
      		<Text style={{color: '#FFFFFF',fontSize: 18,textAlign:"center"}}>June 11 2019 01:16</Text>
      	</Card>
      </Card>
      </Card>

      <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      	<Button onPress={()=>this.navigateStack('USERPANEL')} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#C2185B">
      	<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Close Window</Text>
      	</Button>

      </Container>
    );
  }
}


module.exports = Success;