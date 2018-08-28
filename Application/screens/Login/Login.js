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
import {
  StackActions,NavigationActions
} from 'react-navigation';

// functions
import {
  customerSignIn,
  setAlert
} from '../../actions/CustomerActions';



// Program body...

class Login extends Component {

  constructor(props) {
      super(props);
    
      this.state = {

        username: null,
        password: null,

      };
    }
    handleUsername = (text) =>{
      this.setState({
        username: text
      })
    }
    handlePassword = (text) =>{
      this.setState({
        password: text
      })
    }

    handleComplete=()=>{
      let {
        username,password
      } = this.state;

      this.props.dispatch(customerSignIn(username,password));
    }

  navigateStack = (route) =>{
    const resetActions = StackActions.reset({
        index:0,
        key: null,
        actions: [
            NavigationActions.navigate({
            routeName: route,
          }),
        ]
      });
      this.props.navigation.dispatch(resetActions);
  }

  render() {
    const {
      width,height
    } = Dimensions.get('window');


    let {
      header,message,ltype
    } = this.props;

    if(header && message) {
      Alert.alert(
        header,
        message,
        [
          {
            text: "OK",
          }
        ],
        {
          cancelable: true
        }
        );
      this.props.dispatch(setAlert(null,null));
    }

    if(ltype!==null){
      if(ltype==="customer"){
          this.navigateStack("USERPANEL");
      }
      if(ltype==="staff"){
          this.navigateStack("STAFFWITHHOME");
      }
    }

    return (
    	<Container backgroundColor='#E91E63'>
        <Card alignItems="center"  justifyContent="center">
        <Card marginTop={20} borderRadius={6} width={width-20} backgroundColor='#E91E63' alignItems="center" justifyContent="center">
        <Card height='80%' >
          <Text style={styles.header}>Sign In</Text>
          
             <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleUsername} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="Username"/>
            
              <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handlePassword} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="Password"/>
           <Button backgroundColor="#880E4F" onPress={()=>this.handleComplete()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={50} borderRadius={5}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}>CONTINUE</Text>
              </Button>
              </Card>
              
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
    ltype: state.ltype.ltype,

	}
}

module.exports = connect(mapStateToProps)(Login);