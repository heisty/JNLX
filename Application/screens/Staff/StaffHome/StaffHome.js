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

import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
// import MaskInput from '../../components/MaskInput';


// import funcs

import {
  getAppointment
} from '../../../actions/StaffActions';

class StaffHome extends Component {

  constructor(props) {
    super(props);
  
    this.state = {

      ac_customer:null,
      ac_service:null,
      ac_time:null,
      ac_suffix:null

    };
  }

  componentWillMount(){
    
  }

  componentDidMount(){
    this.timerApp = setInterval(()=>{
      this.props.dispatch(getAppointment(this.props.staffid));

    },1000);

  }

	itemClicked=(item)=>{
	this.setState({
    ac_service: item.servicename,
    ac_customer: item.username,
    ac_time: item.time,
    ac_suffix: item.suffix
  })
	this.refs.modal1.open();
	
	}

	handleAcceptAppointment=()=>{

		this.refs.alertModal.open();

		setTimeout(()=>
		{
			this.refs.alertModal.close();
			this.refs.modal1.close();

		},1000)
	}

	handleRejectAppointment = () =>{
			
		this.refs.alertErrorModal.open();

		setTimeout(()=>
		{
			this.refs.alertErrorModal.close();
			this.refs.modal1.close();

		},1000)

	}
  render() {
  	const {
  		width,height
  	} = Dimensions.get('window');

    const {
      appointment
    } = this.props;

    const {
      ac_customer,
      ac_service,
      ac_time,
      ac_suffix
    } = this.state;

    console.warn(appointment);

    return (
      <Container>

      		<Card width={width} height={50} backgroundColor="#AD1457" alignItems="center" flexDirection="row">
      			<Button onPress={()=>this.props.navigation.openDrawer()}>
      			<Image resizeMde="contain" style={{width:32,height:32}} source={require('JNL/ICONS/app/menu.png')}/>
      			</Button>
      			<Text style={{color: '#FFFFFF',fontSize:14,marginLeft:10}}>LadyLyn Salon</Text>
      		</Card>

      		<Card marginTop={10} width={width} height={20} backgroundColor="#FFFFF" justifyContent="center">
      			<Text style={{color: '#00000',fontSize:14,marginLeft:10}}>Appointments Log</Text>
            <Text style={{color: '#00000',fontSize:14,marginLeft:10}}>Below are request appointments.</Text>
      		</Card>
      		
      		<Card flex={1} marginTop={10} alignItems="center" justifyContent="center">
      		<ScrollView>


      		<FlatList
            data={appointment}
            renderItem={({item})=>{
              return(
                
                <Button onPress={()=>this.itemClicked(item)} marginTop={10}  width={width-60} height={100} borderRadius={6} backgroundColor="#880E4F" alignItems="center" justifyContent="center">
                <Text style={{color: '#FFFFFF',fontSize:10,marginLeft:10}}>{item._id}</Text>
                <Text style={{color: '#FFFFFF',fontSize:30,marginLeft:10}}>{item.servicename}</Text>
                <Text style={{color: '#FFFFFF',fontSize:15,marginLeft:10}}>{item.username}</Text>
                </Button>

              ); 
            }}

            keyExtractor={(item)=>item._id}
          />




      		</ScrollView>

      		</Card>
      		
      	<Modal style={{height:height/2}} position={"bottom"} ref={"modal1"}>
         		<Card alignItems="center" justifyContent="center">
         		<Text>Request for Appointment</Text>
         			<Card marginTop={10} width={width-60} alignItems="center" justifyContent="center" padding={10}>
         					
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Service Requested for Appointment</Text>
         						<Text>{ac_service}</Text>
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Customer Name</Text>
         					<Text>{ac_customer}</Text>
         					<Text style={{borderBottomWidth: 1,fontWeight:'bold'}}>Time of Appointment</Text>
         					<Text>{Math.floor(ac_time/60)}:{((ac_time%60)<10)?`0${ac_time%60}`:ac_time%60} {ac_suffix}</Text>

         			</Card>

         			

         		</Card>

         		<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      			<Button onPress={()=>this.handleAcceptAppointment()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#4CAF50">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Accept Appointment</Text>
      			</Button>

      			<Button onPress={()=>this.handleRejectAppointment()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#EC407A">
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Reject Appointment</Text>
      			</Button>

        </Modal>

        

        <Modal style={{height:120,width:width-100,backgroundColor: '#FFFFFF',borderRadius:6,alignItems:'center',justifyContent:'center',flexDirection: 'row'}} position={"center"} ref="alertModal">
        	<Text style={{color: '#AD1457',fontSize:18,fontWeight:'bold'}}>Appointment Accepted</Text>
        	<Image resizeMde="contain" style={{width:32,height:32,marginLeft:5}} source={require('JNL/ICONS/app/success.png')}/>
        </Modal>

        <Modal style={{height:120,width:width-100,backgroundColor: '#F44336',borderRadius:6,alignItems:'center',justifyContent:'center',flexDirection: 'row'}} position={"center"} ref="alertErrorModal">
        	<Text style={{color: '#FFFFFF',fontSize:18,fontWeight:'bold'}}>Appointment Rejected</Text>
        	<Image resizeMde="contain" style={{width:32,height:32,marginLeft:5}} source={require('JNL/ICONS/app/decline.png')}/>
        </Modal>

     


      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
  return {
     staffid: state.staff.login.userid,
     appointment: state.staff.data.appointment,

  } 
}


module.exports = connect(mapStateToProps)(StaffHome);