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
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
// import MaskInput from '../../components/MaskInput';


// import funcs

class StaffHome extends Component {
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');
    return (
      <Container>
      		<Card width={width} height={50} backgroundColor="#C2185B" justifyContent="center">
      			<Text style={{color: '#FFFFFF',fontSize:14,marginLeft:10}}>Appointments Log</Text>
      		</Card>

      		<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button width={width-60} height={100} backgroundColor="#880E4F" alignItems="center" justifyContent="center">
      			<Text style={{color: '#FFFFFF',fontSize:10,marginLeft:10}}>Appointment ID  </Text>
      			<Text style={{color: '#FFFFFF',fontSize:30,marginLeft:10}}>Massage Service</Text>
      			<Text style={{color: '#FFFFFF',fontSize:15,marginLeft:10}}>John Kramer</Text>
      		</Button>
      		</Card>


      </Container>
    );
  }
}



module.exports = StaffHome;