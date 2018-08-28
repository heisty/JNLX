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
import Modal from 'react-native-modalbox';
// imported components
import DatePicker from 'react-native-datepicker';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

class Report extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	activeMode: 'Daily',

	  };
	}

	handleMode = (mode) =>{
		this.setState({
			activeMode: mode,
		});

		this.refs.mode.close();
	}
  render() {
  	const {
  		width,height
  	} =Dimensions.get('window');
    return (
      <Container backgroundColor="#FFFFFF">
      	<Card >

      		<Card marginTop={10} alignItems="center" justifyContent="center">
      			<DatePicker
        				style={{width: 200,color:'#000000',fontSize:18}}
        				
        				mode="date"
        				is24Hour={true}
        				confirmBtnText="Confirm"
        				cancelBtnText="Cancel"
        				customStyles={{
          				dateIcon: {
            				position: 'absolute',
            				left: 0,
            				top: 4,
            				marginLeft: 0
          				},
          				dateInput: {
            				marginLeft: 36
          				}
          
        				}}
        				
      				/>

      				<Text style={{fontWeight: 'bold',fontSize:12}}>View Reports by</Text>
      				<Button onPress={()=>this.refs.mode.open()} width={width/2} height={30} backgroundColor="#2196F3" alignItems="center" justifyContent="center">
      					<Text style={{color: '#FFFFFF',fontWeight: 'bold',fontSize:15}}>{this.state.activeMode}</Text>
      				</Button>
      			
      		</Card>

      		

      	</Card>

      	<Modal style={{width:width-100,height:200}} position="center" ref="mode">
      			<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      			<Button onPress={()=>this.handleMode("Daily")} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#F8BBD0">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Daily</Text>
      			</Button>

      			<Button onPress={()=>this.handleMode("Weekly")} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#EC407A">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Weekly</Text>
      			</Button>

      			<Button onPress={()=>this.handleMode("Monthly")} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#F8BBD0">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Monthly</Text>
      			</Button>

      			<Button onPress={()=>this.handleMode("Yearly")} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#EC407A">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Yearly</Text>
      			</Button>

      			
      		</Modal>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
	return {

	}
}

module.exports = connect(mapStateToProps)(Report);