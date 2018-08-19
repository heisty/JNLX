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
import Container from '../../components/Container';
import Card from '../../components/Card';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

// functions
import {
  customerInfo
} from '../../actions/CustomerActions';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userinf: [],
    };
  }
  componentWillMount(){
    this.props.dispatch(customerInfo(this.props.userid));

  }
  componentDidMount(){

    

    
   
  }
  componentWillUnmount(){

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
    
    } = this.props;


 



    return (
      <Container>
      	<Card flex={1}backgroundColor="#FFFFFF" >
      		<Card marginTop={5} marginLeft={5} alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 48,height: 48,borderRadius:360}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 5}]}>{firstname} {lastname}</Text>
      		</Card>

      	{/*menus*/}
      	<Button onPress={()=>navigate('USERPROFILE')} marginTop={10} borderBottomWidth={0.4} borderTopWidth={StyleSheet.hairlineWidth} alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>My Profile</Text>
      		</Button>

      	<Button onPress={()=>navigate('ORDER')} marginTop={10} borderBottomWidth={StyleSheet.hairlineWidth} borderTopWidth={0.4} alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>My Orders</Text>
      		</Button>

      	<Button onPress={()=>navigate('RECENT')} marginTop={10} borderBottomWidth={StyleSheet.hairlineWidth} borderTopWidth={0.4} alignItems="center"  flexDirection="row" width={width} height={50} >
      			<Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
      			<Text style={[styles.name,{marginLeft: 10}]}>Recent Appointments</Text>
      		</Button>

          <Button onPress={()=> null} marginTop={10} borderBottomWidth={StyleSheet.hairlineWidth} borderTopWidth={0.4} alignItems="center"  flexDirection="row" width={width} height={50} >
            <Image resizeMode="contain" style={{width: 24,height: 24,borderRadius:360,marginLeft:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
            <Text style={[styles.name,{marginLeft: 10}]}>Sign Out</Text>
          </Button>

      	</Card>
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
	}
}

module.exports = connect(mapStateToProps)(UserDashboard);