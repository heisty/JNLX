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
import Modal from 'react-native-modalbox';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
// import MaskInput from '../../components/MaskInput';

class Profile extends Component {
  render() {
    const {
      width,height
    } = Dimensions.get('window');
    return (
      <Container>
      	<Card width={300} backgroundColor="#AD1457" height={180} alignItems="center" justifyContent="center">

      		<Card alignItems="center" justifyContent="center">
      			<Image  style={{width:128,height:128,borderRadius:360}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={{marginTop:10,color:'#FFFFFF'}}>James Fraulierre Bond</Text>
      		</Card>

      	</Card>	

      	<Card flex={1} height='100%' backgroundColor="#FFFFF">
      		<Button onPress={()=>this.props.navigation.navigate('StaffProfile')} width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/profile.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Profile</Text>
      			</Card>
      		</Button>

      		<Button onPress={()=>this.props.navigation.navigate('Appointment')} width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/appoint.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Appointments</Text>
      			</Card>
      		</Button>

      		<Button onPress={()=>this.props.navigation.navigate('StaffReport')} width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/report.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>My Reports</Text>
      			</Card>
      		</Button>

      		<Button onPress={()=>this.refs.settings.open()} width={300} height={60} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" flexDirection="row">
      			<Card marginLeft={10} alignItems="center" justifyContent="center" flexDirection="row">
      			<Image  style={{width:32,height:32}} source={require('JNL/ICONS/app/setting.png')}/>
      			
      			<Text style={{color: '#E91E63',fontWeight:'bold',fontSize:16,margin:20}}>Settings</Text>
      			</Card>
      		</Button>


      		<Modal style={{width:300,height:100}} position="bottom" ref="settings">
            <Card alignItems="center" justifyContent="center">
              <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button onPress={()=>this.refs.c_password.open()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Change Password</Text>
            </Button>

            <Button onPress={()=>null} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Change PIN</Text>
            </Button>
            </Card>
          </Modal>


          <Modal style={{width:300,height:300,borderRadius:6,alignItems:'center'}} position="center" ref="c_password">
             <Card alignItems="center" justifyContent="center">

                <Text>Change Password</Text>
                <Input secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="Old Password/PIN"/>
                <Input secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="New Password/PIN"/>
                <Input secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="Confirm New Password/PIN"/>
               
             </Card>
              <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button marginTop={10} onPress={()=>this.refs.c_password.open()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Update Password</Text>
            </Button>
            <Button marginTop={10} onPress={()=>this.refs.c_password.open()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Update PIN</Text>
            </Button>
          </Modal>

      		
      		

      		

      	</Card>
      	
      </Container>
    );
  }
}



export default Profile;