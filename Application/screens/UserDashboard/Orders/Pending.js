'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Image,
	FlatList
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

class Pending extends Component {
  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
  	const {
  		orders
  	} = this.props;
    return (

    	<Container>
    		
    		

    		<FlatList
    		data={orders}
    		renderItem={({item})=>{
    			return(

    				<Card backgroundColor="#FFFFFF" width={width} height={140} borderBottomWidth={0.5} borderBottomColor="gray">
    		<Card flexDirection="row" marginTop={5} alignItems="center">
    			<Card marginLeft={10} marginTop={20} height={64} width={64} backgroundColor="gray">
    		</Card>
    		<Card marginLeft={10} marginTop={20}> 
    				<Text>Massage by Thea Cruz</Text>
    				<Text>Salon Service</Text>
    				<Text>Scheduled 06/26/2018 at 6:00 PM</Text>
    				<Card flexDirection="row">
    					<Button alignItems="center" justifyContent="center" width={100} height={40} borderRadius={8} backgroundColor="red" >
    						<Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>CANCEL</Text>
    					</Button>
    					<Button alignItems="center" justifyContent="center" marginLeft={10} width={100} height={40} borderRadius={8} backgroundColor="green" >
    						<Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>RESCHEDULE</Text>
    					</Button>
    				</Card>
    		</Card>
    		</Card>
    		</Card>
    		);}}
    		keyExtractor={(item)=>item._id}
    		/>
    		
    	</Container>
      
    );
  }
}

let mapStateToProps = (state) =>{
	return{

	}
}

module.exports = connect(mapStateToProps)(Pending);