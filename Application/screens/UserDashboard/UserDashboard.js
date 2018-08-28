'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Image,
  Alert
  
} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Modal from 'react-native-modalbox';
import Container from '../../components/Container';
import Card from '../../components/Card';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

// functions
import {
  customerInfo,
  changePassword,
  setAlert
} from '../../actions/CustomerActions';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userinf: [],
      oldpass:null,
      newpass:null,
    };
  }
  componentWillMount(){
   

  }
  componentDidMount(){


  this.timerCI = setInterval(()=>{
    this.props.dispatch(customerInfo(this.props.userid));
  },1000);
    

    
   
  }
  componentWillUnmount(){

    clearInterval(this.timerCI);
    this.timerCI=null;

  }

  updatePassword = () =>{
    let {
      oldpass,
      newpass
    } = this.state;

    this.props.dispatch(changePassword(this.props.userid,oldpass,newpass));
  }




  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
    const {
      navigate
    } = this.props.navigation;

    let {
      firstname,
      lastname,
      username,
      userid,
      header,
      message
    
    } = this.props;


    if(header&&message){
      Alert.alert(
        header,
        message,
        [
          {
            text:"OK"
          }
        ],
        {
          cancelable:true
        }

        );

      this.props.dispatch(setAlert(null,null));
    }
 



    return (
      <Container>
      	<Card flex={1}backgroundColor="#FFFFFF" >
      		<Card backgroundColor="#D81B60" alignItems="center" justifyContent="center"  width={300} height={150} >
      			<Image resizeMode="contain" style={{width: 128,height: 128,borderRadius:360}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 5}]}>{firstname} {lastname}</Text>
      		</Card>

      	{/*menus*/}
      	<Button onPress={()=>navigate('USERPROFILE')} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" marginTop={10} alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>My Profile</Text>
      		</Button>

      	<Button onPress={()=>navigate('ORDER')} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" marginTop={10}   alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>My Booked Appointments</Text>
      		</Button>

      	<Button onPress={()=>navigate('RECENT')} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" marginTop={10}   alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>Recent Appointments</Text>
      		</Button>

          <Button onPress={()=> this.refs.settings.open()} marginTop={10} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" alignItems="center"  flexDirection="row" width={width} height={50} >
            <Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
            <Text style={[styles.name,{marginLeft: 10}]}>Settings</Text>
          </Button>

          <Button onPress={()=> null} marginTop={10} borderBottomWidth={0.5} borderBottomColor="#CCCCCC" alignItems="center"  flexDirection="row" width={width} height={50} >
            <Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
            <Text style={[styles.name,{marginLeft: 10}]}>Sign Out</Text>
          </Button>

      	</Card>

        <Modal style={{width:300,height:100}} position="bottom" ref="settings">
          
          <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />
            <Card alignItems="center" justifyContent="center">
            <Button onPress={()=>this.refs.c_password.open()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Change Password/PIN</Text>
             </Button>
             </Card>
             
           
        </Modal>

        <Modal style={{width:300,height:300,borderRadius:6,alignItems:'center'}} position="center" ref="c_password">
             <Card alignItems="center" justifyContent="center">

                <Text>Change Password/PIN</Text>
                <Input onChangeText={(text)=>this.setState({oldpass:text})} secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="Old Password/PIN"/>
                <Input onChangeText={(text)=>this.setState({newpass:text})} secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="New Password/PIN"/>
                <Input onChangeText={(text)=>this.setState({})} secureTextEntry={true} marginTop={10}  placeholderTextColor="#000000" fontSize={16} textAlign="center"   width={250} height={35} borderRadius={5} borderWidth={0.6} borderColor="#00000" placeholder="Confirm New Password/PIN"/>
               
             </Card>
              <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button marginTop={10} onPress={()=>this.updatePassword()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Update Password</Text>
            </Button>
            <Button onPress={()=>this.refs.c_password.open()} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#4CAF50">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Update PIN</Text>
            </Button>
          </Modal>


      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return {
    userid: state.customer.login.userid,
    username: state.customer.login.username,
    firstname: state.customer.login.firstname,
    lastname: state.customer.login.lastname,
    header: state.alert.header,
    message: state.alert.message,
	}
}

module.exports = connect(mapStateToProps)(UserDashboard);