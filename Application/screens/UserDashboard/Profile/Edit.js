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
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from '.././styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

// functions
import {
  customerUpdate,
  customerInfo,
  setAlert
} from '../../../actions/CustomerActions';

class Edit extends Component {
  componentDidMount(){
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
  this.setState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    contact: contact,
    street: street,
    brgy: brgy,
    munc: munc,
    city: city
  })
  }
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

    handleUpdate = () =>{
      const {
       
        firstname,
        lastname,
        email,
        contact,
        street,
        brgy,
        munc,
        city
      } = this.state;

      let {
         userid,
       } = this.props;



      this.props.dispatch(customerUpdate(userid,firstname,lastname,email,contact,street,brgy,munc,city));
      this.props.dispatch(customerInfo(this.props.userid));


    }




  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');

    const {
      header,message
    } = this.props;

    if(header && message){
      Alert.alert(
        header,
        message,
        [
          {
            text: 'OK'
          }
        ],
        {
          cancelable: true
        }
        );

      this.props.dispatch(setAlert(null,null));
    }

    return (
      <Container>
      <ScrollView>
      		<Card backgroundColor="#FFFFFF" alignItems="center" justifyContent="center">
              <Text>First Name</Text>
              <Input onChangeText={this.handleFirstname} value={this.state.firstname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>
      		

      		<Text>Last Name</Text>
              <Input onChangeText={this.handleLastname} value={this.state.lastname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Email Address</Text>
              <Input onChangeText={this.handleEmail} value={this.state.email} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Contact No.</Text>
              <TextInputMask onChangeText={this.handleContact} value={this.state.contact}  width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"  mask={"+63 9[00] [0000] [000]"} />
              <Text>Address</Text>
              <Text>Street</Text>
              <Input onChangeText={this.handleStreet} value={this.state.street} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Barangay</Text>
              <Input onChangeText={this.handleBrgy} value={this.state.brgy} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>Municipality</Text>
              <Input onChangeText={this.handleMunc} value={this.state.munc} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>

              <Text>City</Text>
              <Input onChangeText={this.handleCity} value={this.state.city} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="green"/>
              <Button onPress={()=>this.handleUpdate()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={30} backgroundColor="royalblue">
                <Text style={{color: '#FFFFFF'}}>UPDATE</Text>
              </Button>

              </Card>
              </ScrollView>

      	
      </Container>
    );
  }
}

let mapStateToProps = (state)=> {
	return {
    userid: state.customer.login.userid,
    username: state.customer.login.username,
    firstname: state.customer.login.firstname,
    lastname: state.customer.login.lastname,
    email: state.customer.login.email,
    contact: state.customer.login.contact,
    street: state.customer.login.street,
    brgy: state.customer.login.brgy,
    munc: state.customer.login.munc,
    city: state.customer.login.city,
    header: state.alert.header,
    message: state.alert.message,
	}
}

module.exports = connect(mapStateToProps)(Edit);