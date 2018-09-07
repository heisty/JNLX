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

// funcs

import {
  getBooked
}  from '../../../actions/Product';

class Orders extends Component {

  componentDidMount(){
 
    this.reloader = setInterval(()=>{
      this.props.dispatch(getBooked(this.props.userid));
    },1000)
 
  }

  componentWillUnmount(){
    clearInterval(this.reloader);
    this.reloader = null;
  }


  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
  	const {
  		active
  	} = this.props;
    return (

    	<Container>
    		
    		<FlatList
    		data={active}
    		renderItem={({item})=>{
    			return(

    <Card backgroundColor="#FFFFFF" width={width} height={120} borderBottomWidth={0.5} borderBottomColor="gray">
    		<Card flexDirection="row" marginTop={5} alignItems="center">
    			<Card marginLeft={10} marginTop={20} height={64} width={64} backgroundColor="gray">
    		</Card>
    		<Card marginLeft={10} marginTop={20}> 
    				<Text>Massage by Thea Cruz</Text>
    				<Text>Salon Service</Text>
    				<Text>Scheduled 06/26/2018 at 6:00 PM</Text>
    				<Text>Waiting Time: 1h 2m</Text>
    		</Card>
    		</Card>
    		</Card>

    				);
    		}}

    		keyExtractor={(item)=> item._id}

    		/>

    	</Container>
      
    );
  }
}

let mapStateToProps = (state) =>{
	return{
    userid: state.customer.login.userid,
    active: state.product.service.active,
	}
}

module.exports = connect(mapStateToProps)(Orders);