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
        is1stform: false,
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
      if(this.state.is1stform){

         const {
        firstname,lastname,email,contact,street,brgy,munc,city
      } = this.state;
      const {navigate} = this.props.navigation;
      navigate('Csignup',{firstname,lastname,email,contact,street,brgy,munc,city});

      
      }
      this.setState({
        is1stform: true,
      })
     

    }

    handleGoBack=()=>{
      this.setState({
        is1stform: false,
      })
    }

    handleDoneSubmit=()=>{

    }



  render() {

  	const {
  		height,
  		width
  	} = Dimensions.get('window');

    const {
      is1stform
    } = this.state;




    return (
      <Container  backgroundColor='#E91E63'>
      <ScrollView>
        
      	<Card flex={1}  backgroundColor='#E91E63' alignItems="center" justifyContent="center">

      		<Card borderRadius={6} width={width} height='100%'  alignItems="center" justifyContent="center">
            <Text style={styles.header}>Sign Up</Text>
            <Card marginTop={10} alignItems="center" justifyContent="center">
              {!is1stform && 
                <Card>
                        <Input  placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleFirstname} value={this.state.firstname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF" placeholder="First Name"/>
                          
                                        
                        <Input  placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleLastname} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF" placeholder="Last Name"/>
                          
                                        
                        <Input  placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleEmail} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF" placeholder="Email Address"/>
                          
                                       
                        <TextInputMask  placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleContact} underlineColorAndroid="transparent"  width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  mask={"+63 9[00] [0000] [000]"} placeholder="Contact No."/>
                  </Card>
                          }           
       {is1stform &&  
                <Card marginTop={10} alignItems="center" justifyContent="center">
                        <Text style={{color:'#FFFFFF'}}>Please add your address, for instance of Home Service.</Text>
                        <Text style={{color:'#FFFFFF'}}>Or you can click continue to fill up later</Text>
                          <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleStreet} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="House No./Street"/>
            
                          
                          <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleBrgy} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="Barangay"/>
            
                          
                          <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleMunc} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="Municipality"/>
            
                         
                          <Input placeholderTextColor="white" fontSize={16} marginTop={10} textAlign="center" onChangeText={this.handleCity} width={width-50} height={35} borderRadius={5} borderWidth={0.6} borderColor="#FFFFFF"  placeholder="City"/>
                </Card>
            }
              <Button backgroundColor="#880E4F" onPress={()=>this.handleIsContinue()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={50} borderRadius={5}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}>CONTINUE</Text>
              </Button>

              {is1stform &&
                <Button backgroundColor="#E91E63" onPress={()=>this.handleGoBack()} alignItems="center" justifyContent="center" marginTop={10} width={width-35} height={50} borderRadius={5}>
                              <Text style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}>Go Back, I want to edit something</Text>
                            
                  </Button>
                }

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