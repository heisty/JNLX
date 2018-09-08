'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Image,
  Alert,
	FlatList
} from 'react-native';
import moment from 'moment-timezone';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modalbox';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  getBooked
}  from '../../../actions/Product';
import {
  cancelOrder,
  updateOrder
} from '../../../actions/Schedule';
let months = [
            'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept',
            'Oct','Nov','Dec'

          ];

class Pending extends Component {

  constructor(props) {
    super(props);
  
    this.state = {

      newtime:null,
      newdate:null,
      suffix:null,
      aid:null,
      appid:null,
      date_:null

    };
  }


  componentDidMount(){
    
    this.reloader = setInterval(()=>{
      this.props.dispatch(getBooked(this.props.userid));
    },1000)
 
  }

  componentWillUnmount(){
    clearInterval(this.reloader);
    this.reloader = null;
  }

  cancelOrder = (staffid,app_id) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure to cancel?',
      [
        {text: "Yes, I'll cancel",onPress: ()=> this.onCancel(staffid,app_id)},
        {text: "No",onPress:()=> null}

      ]

      );
  }

  onCancel = (staffid,app_id) => {

    console.warn(staffid,app_id);
    this.props.dispatch(cancelOrder(staffid,app_id));

  }

  reSchedule = (aid,appid) => {
    console.log("INSIDE RESCHED",aid,appid);
    console.warn("RESCHED");
    this.setState({
      aid:aid,
      appid:appid
    })
    this.refs.resched.open();
  }

  handleNewSched = (time) => {

    // datenow

    let d_ = new Date();
    let fy = d_.getFullYear();
    let my = d_.getMonth();
    let dy = d_.getDate();



    // datethem

    let parsetime = time.split(' ');

    console.log("LOGGGGGGGGGAWDAWDAWD",parsetime[0]);

    let pp2 = parsetime[0].split('-');

    let yr_ = pp2[0];
    let month_ = pp2[1];
    let day_ = pp2[3];

    if(yr_>fy || yr_<fy){
      Alert.alert(
        'Wazzzz. No!',
        'Its 2018, in case you didnt know',
        [
          {
            text: 'K',
          }
        ]

        );
    }

    if(month_ > my || month_ < my){

      Alert.alert(
        'Wazzzz. No no!',
        `Its ${months[my]} in case you didnt know`,
        [
          {
            text: 'K',
          }
        ]

        );

    }





      // if ok

    if(1==0){
       
    let time_ = parsetime[1].split(':');
    let hr = time_[0];
    let mt = time_[1];
    let suffix = "AM";
    if(hr>12){
      hr-=12;
      suffix="PM";
    }

    let _time = (hr*60)+parseInt(mt);
    }

    
    
    

    this.setState({
        newtime:_time,
        newdate: time,
        suffix: suffix,
        date_:time,
    })



  }

  onUpdate = () => {
    let {
      newtime,
      newdate,
      suffix,
      aid,
      appid
    } = this.state;

    console.log("LOGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",newdate,suffix,newtime);

    this.props.dispatch(updateOrder(aid,appid,newtime,suffix,newdate));

  }

  render() {
  	const {
  		width,
  		height
  	} = Dimensions.get('window');
  	const {
  		pending
  	} = this.props;
    return (

    	<Container>
    		
    		

    		<FlatList
    		data={pending}
    		renderItem={({item})=>{

          

          let date_ret = moment.tz(item.date,"Asia/Manila").toDate();
          let month = months[date_ret.getMonth()];
          let dd = date_ret.getDate();
          let yr = date_ret.getFullYear();

          let ret_ = `${month}. ${dd} ${yr}`;



          let datenow = new Date();
          let mnow = months[datenow.getMonth()];
          let dnow = datenow.getDate();
          let yrnow = datenow.getFullYear();

          let rnow =  `${mnow}. ${dnow} ${yrnow}`;



    			return(

    				<Card backgroundColor="#FFFFFF" width={width} height={140} borderBottomWidth={0.5} borderBottomColor="gray">
    		<Card flexDirection="row" marginTop={5} alignItems="center">
    			<Card marginLeft={10} marginTop={20} height={64} width={64} backgroundColor="gray">
    		</Card>
    		<Card marginLeft={10} marginTop={20}> 
    				<Text>{item.servicename} by {item.staffname}</Text>
    				<Text>Salon Service</Text>
    				<Text>Scheduled {(ret_===rnow) ? "Today":ret_} at {`${Math.floor(item.time/60)}:${(item.time%60)<10?`0${item.time%60}`:item.time%60}`} {item.suffix}</Text>
    				
            <Card flexDirection="row">
    					<Button onPress={()=>this.cancelOrder(item.staffid,item._id)} alignItems="center" justifyContent="center" width={100} height={40} borderRadius={8} backgroundColor="red" >
    						<Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>CANCEL</Text>
    					</Button>
    					<Button onPress={()=>this.reSchedule(item.staffid,item._id)} alignItems="center" justifyContent="center" marginLeft={10} width={100} height={40} borderRadius={8} backgroundColor="green" >
    						<Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>RESCHEDULE</Text>
    					</Button>
    				</Card>
    		</Card>
    		</Card>
    		</Card>
    		);}}
    		keyExtractor={(item)=>item._id}
    		/>


        <Modal style={{width:width,height:height/3}} position="bottom" ref="resched">
          
          <Card marginTop={10} alignItems="center" justifyContent="center">  
          <Text>New Schedule</Text>
          <DatePicker
                  style={{width: 200,color:'#000000',fontSize:18}}
                  
                  
                  date={this.state.date_}
                  mode="datetime"
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
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={this.handleNewSched}
                />


                <Button onPress={()=>this.onUpdate()} marginTop={10} backgroundColor="royalblue" borderRadius={5} width={width/1.5} height={60} alignItems="center" justifyContent="center">
            <Text style={{color: '#FFFFFF'}}>Update</Text>
           </Button>


           </Card>

           


        </Modal>


    		
    	</Container>
      
    );
  }
}

let mapStateToProps = (state) =>{
	return{
    userid: state.customer.login.userid,
    pending: state.product.service.pending,
	}
}

module.exports = connect(mapStateToProps)(Pending);