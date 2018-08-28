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
      <Container backgroundColor="#FFFFFF">
      
      <Card alignItems="center" justifyContent="center">
        <Card width={width} height={400} backgroundColor="#E91E63" alignItems="center" justifyContent="center">

          <Image resizeMode="contain" style={{width:128,height:128}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{color:'#FFFFFF',fontSize:15}}>{firstname} {lastname}</Text>
          <Text style={{color:'#FFFFFF',fontSize:15}}>CP# {contact}</Text>
          <Text style={{color:'#FFFFFF',fontSize:15}}>Email at {email}</Text>
          <Text style={{color:'#FFFFFF',fontSize:15}}>Address</Text>
          <Text style={{color:'#FFFFFF',fontSize:15}}>{street}, {brgy}, {munc}, {city}</Text>

        </Card>


   

      
        
      </Card>

      <Card marginTop={3} flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button onPress={()=>navigate("EDITPROFILE")} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#E91E63">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Edit Profile</Text>
            </Button>

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