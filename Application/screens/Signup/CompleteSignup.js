'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Alert
} from 'react-native';
import firebase from 'react-native-firebase';
// imported components
import Container from '../../components/Container';
import Card from '../../components/Card';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

// functions
import {
	customerSignup,
	setAlert
} from '../../actions/CustomerActions';

class CompleteSignup extends Component {
	componentWillMount(){
		// var config = {
  //   			apiKey: "AIzaSyBW4K5Tt5itKO3SQ5zmbbFf1dPF1CnBI3Y",
  //   			authDomain: "jnlsalon-3daa4.firebaseapp.com",
  //   			databaseURL: "https://jnlsalon-3daa4.firebaseio.com",
  //   			projectId: "jnlsalon-3daa4",
  //   			storageBucket: "jnlsalon-3daa4.appspot.com",
  //   			messagingSenderId: "862908272237"
  // 				};
  // 		firebase.initializeApp(config);

  // 		firebase.auth().signInWithPhoneNumber('+63 917 361 0545')
  //     .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
  //     .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  
	}
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	username: null,
	  	password: null,
	  	confirmpassword:null,
	  	verification: null,
	  	message: null,
	  	confirmResult: null

	  };
	}
	handleUsername = (text) =>{
		this.setState({
			username: text
		})
	};
	handlePassword = (text) =>{
		this.setState({
			password: text
		})
	};
	handleConfirmPassword = (text) =>{
		this.setState({
			confirmpassword: text
		})
	};

	handleComplete = (text) =>{
	const {
		username,
		password
	} = this.state;
	const {
		firstname,
		lastname,
		contact,
		email,
		street,
		brgy,
		munc,
		city
	} = this.props.navigation.state.params;

	this.props.dispatch(customerSignup(username,password,firstname,lastname,email,contact,street,brgy,munc,city));

	}
  render() {
  	console.warn(this.state.confirmResult);
  	const {width,height} = Dimensions.get('window');
  	const {header,message} = this.props;
  	const {password,confirmpassword} = this.state;

  	

  	if(header && message){
  		Alert.alert(

  			header,
  			message,
  			[
  				{
  					text: "OK",
  				}
  			],
  			{
  				cancelable: true,
  			}

  			);
  		this.props.dispatch(setAlert(null,null));
  	}






    return (
     	<Container>
     		<Card marginTop={10} backgroundColor='#FFFFFF' alignItems="center" justifyContent="center">
     		<Card height='100%'>
     		  <Text>Username {this.state.message}</Text>
              <Input onChangeText={this.handleUsername} value={this.state.username} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Password</Text>
              <Input secureTextEntry={true} onChangeText={this.handlePassword} value={this.state.password} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Confirm Password</Text>
              <Input secureTextEntry={true} onChangeText={this.handleConfirmPassword} value={this.state.confirmpassword} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

             {(password===confirmpassword) && <Button onPress={()=>this.handleComplete()} alignItems="center" justifyContent="center" marginTop={10} width={width-50} height={30} backgroundColor="royalblue">
                             <Text style={styles.btnText}>COMPLETE SIGNUP</Text>
                           </Button>}
              </Card>
              
     		</Card>
     	</Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return{
		header: state.alert.header,
		message: state.alert.message,
	}
}


module.exports = connect(mapStateToProps)(CompleteSignup);