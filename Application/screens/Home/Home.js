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

class Home extends Component {
  render() {
    const {
      width,
      height
    } = Dimensions.get('window');
    return (
      <Container>
      <ScrollView>
      	<Card flex={1} backgroundColor="#FFFFFF">
          <Card width={width} height={150} borderBottomWidth={StyleSheet.hairlineWidth}>
            <Card>
            </Card>
          </Card>

          <Card>
            <Button>
              <Image resizeMode="contain" style={{width: 64,height:64,borderRadius:360}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
            </Button>
          </Card>
          
      	</Card>
        </ScrollView>
      </Container>
    );
  }
}


let mapStateToProps = (state)=>{
	return {
		
	}
}

module.exports = connect(mapStateToProps)(Home);