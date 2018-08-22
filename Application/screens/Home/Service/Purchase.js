'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
  Image,
  TimePickerAndroid,
  FlatList,
  ToastAndroid,
  Alert

} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
//import DatePicker from 'react-native-ui-xg';
//import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

class Purchase extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      language: null,
     date:"2016-05-15"
    };
  }
	openTimePicker = ()=>{
	 try {
  const {action, hour, minute} = TimePickerAndroid.open({
    is24Hour: false, // Will display '2 PM'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    // Selected hour (0-23), minute (0-59)
    console.warn(action,hour);
    
  }

  
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}

	}

  Available = () =>{
    Alert.alert(
      'Great, Please choose type of service.',
      'Here or there.',
      [

      {
        text: "SALON",onPress: ()=> this.handleContinue(),
      },
      {
        text:"HOME"
      },
      

      ],
      {
        cancelable: true
      }
      );
  }

  yetAvailable = () =>{
    Alert.alert(
      'EMPLOYEE IS NOT YET ON SCHEDULE.',
      'Willing to wait?',
      [

      {
        text: "YES",
      },
      {
        text:"NO"
      },
      {
        text: "HOME SERVICE"
      }

      ],
      {
        cancelable: true
      }
      );
  }

  neverAvailable = () => {

    Alert.alert(
      'EMPLOYEE IS NOT AVAILABLE TODAY',
      'Perhaps another day.',
      [

      {
        text: "OK",
      },
      {
        text: "HOME SERVICE"
      }

      ],
      {
        cancelable: true
      }
      );

  }

  handleContinue = () =>{
    const {
      navigate
    } = this.props.navigation;

    navigate('Review');
  }

  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
    return (
      <Container>
      	<Card width={width} height={60} backgroundColor="darkblue" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Purchase Massage</Text>
      	</Card>
      	<Card marginTop={10} width={width} height={30} flexDirection="row" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#000000',fontWeight: 'bold'}}>Sort by </Text>
      	</Card>

        <Card width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Available Employee at Right Now</Text>
          
        </Card>
        <Button onPress={()=>this.Available()} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>James Bond</Text>
          </Button>


          <Card width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Not yet available</Text>
          
        </Card>
        <Button onPress={()=>this.yetAvailable()}  borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>James Bond</Text>
          </Button>

          <Card width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Never Available Today</Text>
          
        </Card>
        <Button onPress={()=>this.neverAvailable()} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>James Bond</Text>
          </Button>
        
        

      </Container>
    );
  }
}



module.exports = Purchase;