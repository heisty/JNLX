'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
  Image
} from 'react-native';

import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
// import MaskInput from '../../components/MaskInput';

class Profile extends Component {
  render() {
    return (
      <Container>
      	<Card width={300} backgroundColor="#E91E63" height={180} alignItems="center" justifyContent="center">

      		<Card alignItems="center" justifyContent="center">
      			<Image  style={{width:128,height:128,borderRadius:360}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={{marginTop:10,color:'#FFFFFF'}}>James Fraulierre Bond</Text>
      		</Card>

      	</Card>	

      	<Card flex={1} height='100%' backgroundColor="#FFFFF">
      		<Button width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/profile.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Profile</Text>
      			</Card>
      		</Button>

      		<Button width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/appoint.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Appointments</Text>
      			</Card>
      		</Button>

      		<Button width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/report.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Reports</Text>
      			</Card>
      		</Button>

      		<Button width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/setting.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>Settings</Text>
      			</Card>
      		</Button>


      		

      		
      		

      		

      	</Card>
      	
      </Container>
    );
  }
}



export default Profile;