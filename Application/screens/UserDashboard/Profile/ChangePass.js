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

class ChangePass extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	password: null,
      newpassword: null,
      confirmnewpassword: null
	  };
	}

  handleOldPassword = (text) =>{
    this.setState({
      password: text
    })
  };

  handleNewPassword = (text) =>{
    this.setState({
      newpassword: text
    })
  };

  handleConfirmNewPassword = (text) =>{
    this.setState({
      password: text
    })
  }




  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');
    return (
      <Container>
      <ScrollView>
      		<Card height="100%" backgroundColor="#FFFFFF" alignItems="center" justifyContent="center">
              <Text>Old Password</Text>
              <Input onChangeText={this.handleFirstname} value={this.state.firstname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>
      		

      		<Text>New Password</Text>
              <Input onChangeText={this.handleLastname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Confirm New Password</Text>
              <Input onChangeText={this.handleEmail} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Button onPress={()=>this.handleChangePassword()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={30} backgroundColor="royalblue">
              <Text style={{color: '#FFFFFF'}}>Change Password</Text>
              </Button>

              </Card>
              </ScrollView>

      	
      </Container>
    );
  }
}

let mapStateToProps = (state)=> {
	return {

	}
}

module.exports = connect(mapStateToProps)(ChangePass);