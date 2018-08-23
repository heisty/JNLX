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
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
// imported components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  getScheduledEmployees,
  getLaterScheduled,
  getNever
} from '../../../actions/Population';
class Purchase extends Component {
  componentWillMount(){
    let date = new Date();
    let day = date.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day = days[day];
    let time = date.getHours();
    let suffix = "AM";
    if(time>12){
      time-=12;
      suffix="PM";
    }
    time = time * 60 + date.getMinutes();
    console.warn(day,time);

    this.props.dispatch(getScheduledEmployees(day,time,suffix));
    this.props.dispatch(getLaterScheduled(day,time,suffix));
    this.props.dispatch(getNever(day,time,suffix));
  }

  componentDidMount(){
    this.timer = setInterval(()=>{
    let date = new Date();
    let day = date.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day = days[day];
    let time = date.getHours();
    let suffix = "AM";
    if(time>12){
      time-=12;
      suffix="PM";
    }
    time = time * 60 + date.getMinutes();
    this.props.dispatch(getScheduledEmployees(day,time,suffix));
    this.props.dispatch(getLaterScheduled(day,time,suffix));
    this.props.dispatch(getNever(day,time,suffix));
    console.warn(day,time);
    },1500)
  }
  constructor(props) {
    super(props);
  
    this.state = {
      language: null,
      selectedTime:null
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

  isWait=(item)=>{
    let m_time = Math.floor(item.schedule[0].morning._time/60);
    let min = item.schedule[0].morning._time%60;
    let m_eTime = Math.floor(item.schedule[0].morning._endTime/60);
    let min_e = item.schedule[0].morning._endTime%60;
    if(min_e===0)min_e='00';
    if(!item.schedule[0].afternoon){
        let sorry = "Sorry this employee do not have an afternoon schedule. Morning Schedule is  ";
        let schedule = m_time;
        let endSchedule = m_eTime;
        let notice = `${sorry} ${schedule}:${min}  - ${endSchedule}:${min_e}`;
        Alert.alert(
          'NO SCHEDULED FOR THIS AFTERNOON',
          notice,
          [
            {
              text:"Ok"
            }
          ],
          {
            cancelable:true
          }
          );
    }
  }

  yetAvailable = (item) =>{
    Alert.alert(
      'EMPLOYEE IS NOT YET ON SCHEDULE.',
      'Willing to wait?',
      [

      {
        text: "YES",onPress:()=>this.isWait(item),
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
    const {
      scheduled_staff,
      L_scheduled_staff,
      N_scheduled_staff
    } = this.props;
    return (
      <Container>
      	<Card width={width} height={60} backgroundColor="darkblue" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Purchase Massage</Text>
      	</Card>
      	<Card marginTop={10} width={width} height={30} flexDirection="row" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#000000',fontWeight: 'bold'}}>Sort by </Text>
      <DatePicker
        style={{width: 200,color:'#000000',fontSize:18}}
        time={this.state.selectedTime}
        value={this.state.selectedTime}
        date={this.state.selectedTime}
        mode="time"
        is24Hour={false}
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
        onDateChange={(time) => {this.setState({selectedTime: time})}}
      />

      	</Card>

        <Card marginTop={10} width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Available Employee at {this.state.selectedTime}</Text>
          
        </Card>
        
        <FlatList 
        data={scheduled_staff}
        renderItem={({item})=>{
          return(

            <Button onPress={()=>this.Available()} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>{item.firstname} {item.lastname}</Text>
          </Button>

            );
        }}
        keyExtractor={(item)=>item._id}
        />


          <Card width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Not yet available</Text>
          
        </Card>
        <FlatList 
        data={L_scheduled_staff}
        renderItem={({item})=>{
          return(

            <Button onPress={()=>this.yetAvailable(item)} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>{item.firstname} {item.lastname}</Text>
          </Button>

            );
        }}
        keyExtractor={(item)=>item._id}
        />

          <Card width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Never Available Today</Text>
          
        </Card>
        <FlatList 
        data={N_scheduled_staff}
        renderItem={({item})=>{
          return(

            <Button onPress={()=>this.neverAvailable()} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>{item.firstname} {item.lastname}</Text>
          </Button>

            );
        }}
        keyExtractor={(item)=>item._id}
        />
        
        

      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
  return {
    scheduled_staff: state.population.pop_scheduled.scheduled,
    L_scheduled_staff: state.population.pop_scheduled.L_scheduled,
    N_scheduled_staff: state.population.pop_scheduled.N_scheduled,
  }
}


module.exports = connect(mapStateToProps)(Purchase);