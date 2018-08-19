'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Image
} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from '.././styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

class Profile extends Component {
	
  render() {

  	const {
		width,height
	} = Dimensions.get('window');


	const {
		navigate
	} = this.props.navigation;

  const {
    firstname,
    lastname,
    email,
    contact,
    street,
    brgy,
    munc,
    city
  } = this.props;


    return (
      <Container >
      <Card width={width} flexDirection="row" backgroundColor="#FFFFFF" alignItems="flex-end" justifyContent="flex-end">
      	<Button onPress={()=> navigate('CHANGEPASS')} alignItems="center" justifyContent="center" width={100} height={40} backgroundColor="green">
      		<Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Change Password</Text>
      	</Button>
      	<Button onPress={()=> navigate('EDITPROFILE')} alignItems="center" justifyContent="center" width={100} height={40} backgroundColor="green">
      		<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Edit Profile</Text>
      	</Button>
      	</Card>
      	<Card flex={1} backgroundColor="#FFFFFF" alignItems="center" justifyContent="center">
      		<Image resizeMode="contain" style={{width: 128,height:128,margin: 10}} source={require('JNL/ICONS/USERPANEL/round.png')} />
      		<Text>{firstname} {lastname}</Text>
      		<Text>{contact}</Text>
      		<Text>{email}</Text>
      	</Card>

      	<Card flex={1} >
      		<Card backgroundColor="gray" >
      			<Text style={{color: '#FFFFFF'}}>ADDRESS</Text>
      		</Card>

      		<Card flex={1} backgroundColor="#FFFFFF">
      			<Text>House No./Street</Text>
      			<Text style={{textAlign:'center'}}>{street}</Text>
      		</Card>
      		<Card flex={1} backgroundColor="#FFFFFF">
      			<Text>Brgy.</Text>
      			<Text style={{textAlign:'center'}}>{brgy}</Text>
      		</Card>
      		<Card flex={1} backgroundColor="#FFFFFF">
      			<Text>Municipality</Text>
      			<Text style={{textAlign:'center'}}>{munc}</Text>
      		</Card>
      		<Card flex={1} backgroundColor="#FFFFFF">
      			<Text>City</Text>
      			<Text style={{textAlign:'center'}}>{city}</Text>
      		</Card>
      	</Card>

      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return{
    userid: state.customer.login.userid,
    username: state.customer.login.username,
    firstname: state.customer.login.firstname,
    lastname: state.customer.login.lastname,
    email: state.customer.login.email,
    contact: state.customer.login.contact,
    street: state.customer.login.street,
    brgy: state.customer.login.brgy,
    munc: state.customer.login.munc,
    city: state.customer.login.city
	}
}

module.exports = connect(mapStateToProps)(Profile);