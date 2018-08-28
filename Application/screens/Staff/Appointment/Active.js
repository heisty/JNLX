'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
  Image
} from 'react-native';
import Modal from 'react-native-modalbox';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

class Active extends Component {
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');
    return (
      <Container backgroundColor="#FFFFFF">
      	<Button onPress={()=>this.refs.confirm.open()}  width={width} height={100} backgroundColor="#FFFFFF" borderBottomWidth={StyleSheet.hairlineWidth} borderBottomColor="#CCCCCC">
      		<Card  flex={1} alignItems="center" justifyContent="center">
      		<Text style={{fontSize: 18,fontWeight:'bold'}}>Massage Service</Text>
      		<Text style={{fontSize: 13,fontWeight:'bold'}}>9:00 AM</Text>
      		</Card>
      		<Card flex={1} alignItems="center" flexDirection="row" justifyContent="space-around">
      		<Button>
      			<Text>Completed</Text>
      		</Button>
      		<Button>
      			<Text>Abandoned</Text>
      		</Button>
      		</Card>
      	</Button>

      	<Modal style={{height:'70%'}} position={"bottom"} ref={"confirm"}>
         		<Card alignItems="center" justifyContent="center">
         		<Text>Active Appointment</Text>
         			<Card marginTop={10} width={width-60} alignItems="center" justifyContent="center" padding={10}>
         					
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Active Service</Text>
         						<Text>Nail Art</Text>
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Customer Name</Text>
         					<Text>Lukt Shen</Text>
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Time Started</Text>
         					<Text>1:00 PM</Text>
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Time Passed</Text>
         					<Text>1 hour and 50 minutes</Text>

         			</Card>

         			

         		</Card>

         		<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

         		<Button onPress={()=>this.handleRejectAppointment()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#009688">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Map to Customer</Text>
      			</Button>

      			<Button onPress={()=>this.handleAcceptAppointment()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#4CAF50">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Service Complete</Text>
      			</Button>

      			<Button onPress={()=>this.handleRejectAppointment()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#EC407A">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Service Abandoned</Text>
      			</Button>

        </Modal>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
	return {

	}
}

module.exports = connect(mapStateToProps)(Active);