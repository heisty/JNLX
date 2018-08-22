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

class Review extends Component {

  handleComplete = () =>{
    const {
      navigate
    } = this.props.navigation;

    navigate('Success');
  }
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');
    return (
      <Container>
      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <Card width={width} height={60} backgroundColor="darkblue" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Review Order</Text>
      	</Card>

      	<Card>
      		<Text style={{color: '#000000',fontWeight: 'bold'}}>Just tell us when, and you're good to go. </Text>
      	</Card>

      	<Card width={width} height={60} backgroundColor="royalblue" alignItems="center" justifyContent="center">

      		<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>So this is what you ordered. Right?</Text>

      	</Card>

      	<Card  alignItems="center" justifyContent="center">
      		<Image resizeMode="contain" style={{marginTop: 5,width:128,height:128}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      		<Text style={{marginTop: 10}}>Salon Service</Text>
      		<Text>Massage by James Bond</Text>
      		<Text>June 11, 2018 at 1:00 PM</Text>
      		<Text>PHP 200</Text>
      	</Card>

      	<Card alignItems="center" justifyContent="center" marginTop={10} width={width} height={30} backgroundColor="royalblue">
      		<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Confirm your address</Text>
      	</Card>
      <Card alignItems="center" justifyContent="center">
      	<Text>House No./Street</Text>
      	<Input borderRadius={6} textAlign="center" width={width-40} height={50} borderWidth={0.5} borderColor="darkblue"/>

      	<Text>Brgy</Text>
      	<Input borderRadius={6} textAlign="center" width={width-40} height={50} borderWidth={0.5} borderColor="darkblue"/>

      	<Text>Munc</Text>
      	<Input borderRadius={6} textAlign="center" width={width-40} height={50} borderWidth={0.5} borderColor="darkblue"/>

      	<Text>City</Text>
      	<Input borderRadius={6} textAlign="center" width={width-40} height={50} borderWidth={0.5} borderColor="darkblue"/>
      </Card>

      	

      	</ScrollView>
      	<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      	<Button onPress={()=>this.handleComplete()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="royalblue">
      	<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Complete Order</Text>
      	</Button>
      </Container>
    );
  }
}


module.exports = Review;