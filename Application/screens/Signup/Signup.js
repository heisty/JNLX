'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView
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
// import MaskInput from '../../components/MaskInput';
import FBLoginView from './FBLoginView';

// import funcs

class Signup extends Component {

  constructor(props) {
      super(props);
    
      this.state = {
        firstname: null,
        lastname: null,
        email: null,
        contact: null,
        street: null,
        brgy: null,
        munc: null,
        city: null,
        isContinue: false,
        isBack: null,
      };
    }

    handleFirstname = (text) =>{
      this.setState({
        firstname: text,
      })
    };

    handleLastname = (text) =>{
      this.setState({
        lastname: text,
      })
    };

    handleEmail = (text) =>{
      this.setState({
        email: text,
      })
    };

    handleContact = (text) =>{
      this.setState({
        contact: text,
      })
    };

    handleStreet = (text) =>{
      this.setState({
        street: text,
      })
    };

    handleBrgy = (text) =>{
      this.setState({
        brgy: text,
      })
    };

    handleMunc = (text) =>{
      this.setState({
        munc: text,
      })
    };

    handleCity = (text) =>{
      this.setState({
        city: text,
      })
    };

    handleIsContinue = () =>{
      const {
        firstname,lastname,email,contact,street,brgy,munc,city
      } = this.state;
      const {navigate} = this.props.navigation;
      navigate('Csignup',{firstname,lastname,email,contact,street,brgy,munc,city});

    }



  render() {

  	const {
  		height,
  		width
  	} = Dimensions.get('window');




    return (
      <Container>
      <ScrollView>
      	<Card alignItems="center" justifyContent="center">

      		<Card marginTop='5%' borderRadius={6} width={width-20} borderColor="gray" height='100%' backgroundColor='#FFFFFF'>
            <Text style={styles.header}>Sign Up</Text>
            <Card marginTop={10} alignItems="center" justifyContent="center">
              <Text>First Name</Text>
              <Input onChangeText={this.handleFirstname} value={this.state.firstname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Last Name</Text>
              <Input onChangeText={this.handleLastname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Email Address</Text>
              <Input onChangeText={this.handleEmail} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Contact No.</Text>
              <TextInputMask onChangeText={this.handleContact}  width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"  mask={"+63 9[00] [0000] [000]"} />
              <Text>Address</Text>
              <Text>Street</Text>
              <Input onChangeText={this.handleStreet} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Barangay</Text>
              <Input onChangeText={this.handleBrgy} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Municipality</Text>
              <Input onChangeText={this.handleMunc} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>City</Text>
              <Input onChangeText={this.handleCity} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>
              <Button onPress={()=>this.handleIsContinue()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={30} backgroundColor="royalblue">
                <Text style={styles.btnText}>CONTINUE</Text>
              </Button>
            </Card>
      		</Card>
          

      	</Card>
        </ScrollView>
      </Container>
    );
  }
}
let mapStateToProps = (state) =>{
  return {
    ltype: state.ltype.ltype,
  }
}
module.exports = Signup;