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
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

class Settings extends Component {
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');
    return (
      <Container>
      	
      	<Card>

      		<Card width={width} height={60} alignItems="center" justifyContent="center" backgroundColor="#FFFFFF">
      			<Text style={{color: '#00000',fontSize: 16,fontWeight: 'bold'}}>Change Password</Text>
      		</Card>

      	</Card>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
	return {

	}
}

module.exports = connect(mapStateToProps)(Settings);