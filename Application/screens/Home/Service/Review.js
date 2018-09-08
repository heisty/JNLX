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
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  setAppointment
} from '../../../actions/Schedule';

class Review extends Component {

  handleComplete = () =>{
       const {
      
      service,
      staff,
      userid,
      username,
      date,
      day,
      status,
      accepted,
      duration,
      time,
      suffix
    } = this.props.navigation.state.params;
    let mode = "Salon";
    this.props.dispatch(setAppointment(userid,username,service._id,service.servicename,`${mode} Service`,staff._id,`${staff.firstname} ${staff.lastname}`,date,status,accepted,time,duration,suffix));

    this.props.navigation.navigate('Success',{staffname:`${staff.firstname} ${staff.lastname}`,servicename:service.servicename,time});
  }
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');

    const {
      service,
      staff,
      userid,
      username,
      day,
      status,
      accepted,
      duration,
      time,
      suffix,
      mode
    } = this.props.navigation.state.params;

    return (
      <Container>
      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <Card width={width} height={60} backgroundColor="#E91E63" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Review Order</Text>
      	</Card>

      	

      	<Card width={width} height={40} backgroundColor="#C2185B" alignItems="center" justifyContent="center">

      		<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>So this is what you ordered. Right?</Text>

      	</Card>

      	<Card  alignItems="center" justifyContent="center">
      		<Text style={{fontSize:18,fontWeight:'bold',borderBottomWidth: 1}}>Service Mode</Text>
      		<Text style={{marginTop: 10,bottomBorderWidth:1}}>{mode}</Text>
          <Text style={{fontSize:18,fontWeight:'bold',borderBottomWidth: 1}}>Service</Text>
      		<Text style={{marginTop: 10,bottomBorderWidth:1}}>{service.servicename}</Text>
          <Text style={{fontSize:18,fontWeight:'bold',borderBottomWidth: 1}}>Staff</Text>
          <Text>{staff.firstname} {staff.lastname}</Text>
          <Text style={{fontSize:18,fontWeight:'bold',borderBottomWidth: 1}}>Scheduled Time</Text>
      		<Text style={{marginTop: 10,bottomBorderWidth:1}}>{`${Math.floor(time/60)}:${(time%60 < 10) ? `0${time%60}`:time%60}`}</Text>
          <Text style={{fontSize:18,fontWeight:'bold',borderBottomWidth: 1}}>Price</Text>
      		<Text style={{marginTop: 10,bottomBorderWidth:1}}>PHP{service.price}</Text>
      	</Card>
 {mode==="Home" &&
      <Card>
      	<Card alignItems="center" justifyContent="center" marginTop={10} width={width} height={30} backgroundColor="#C2185B">
      		<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Confirm your address</Text>
      	</Card>
     
        <Card alignItems="center" justifyContent="center">
              <Input   fontSize={16} marginTop={10} textAlign="center"  width={width-50} height={35}  borderWidth={0.6} borderColor="#C2185B" placeholder="Street/House No."/>
              <Input   fontSize={16} marginTop={10} textAlign="center"  width={width-50} height={35}  borderWidth={0.6} borderColor="#C2185B" placeholder="Brgy"/>
              <Input   fontSize={16} marginTop={10} textAlign="center"  width={width-50} height={35}  borderWidth={0.6} borderColor="#C2185B" placeholder="Municipality"/>
              <Input   fontSize={16} marginTop={10} textAlign="center"  width={width-50} height={35}  borderWidth={0.6} borderColor="#C2185B" placeholder="City"/>
                              
            </Card>
          </Card>
      }
      	

      	</ScrollView>
      	<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      	<Button onPress={()=>this.handleComplete()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#C2185B">
      	<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Complete Order</Text>
      	</Button>
      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
    return {

    }
}

module.exports = connect(mapStateToProps)(Review);