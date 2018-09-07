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

    const {
      staffname,
      servicename,
      time,

    } = this.props.navigation.state.params;


    return (
      <Container>
      <Card flex={1} alignItems="center" justifyContent="center">
      <Card height={120} borderRadius={6} width={width-60}  backgroundColor="#C2185B">
      	<Card alignItems="center" justifyContent="center">
      		<Text style={{color: '#FFFFFF',fontSize: 20,textAlign:"center"}}>ORDER BOOKED</Text>
      		<Text style={{color: '#FFFFFF',fontSize: 18,textAlign:"center"}}>{servicename} by {staffname}</Text>
      		<Text style={{color: '#FFFFFF',fontSize: 18,textAlign:"center"}}>{new Date().getDate()} {`${Math.floor(time/60)}:${(time%60<10)?`0${time%60}`:time%60}`}</Text>
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