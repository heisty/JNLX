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
  Alert,
  CheckBox

} from 'react-native';
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
  getScheduledEmployees,
  getLaterScheduled,
  getNever
} from '../../../actions/Population';


import {
  checkAppointment
} from '../../../actions/Schedule';

class Purchase extends Component {
  componentWillMount(){
    let date = new Date();
    let day = date.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day = days[day];
    let time = date.getHours();
    let mins = date.getMinutes();
    let time_ = `${time}:${mins}`;
    let suffix = "AM";
    if(time>12){
      time-=12;
      suffix="PM";
    }
    time = time * 60 + date.getMinutes();
    console.warn(day,time);

    this.setState({
      scheduledTime: time_,
      suffix_global:suffix,
    })

    this.props.dispatch(getScheduledEmployees(day,time,suffix));
    this.props.dispatch(getLaterScheduled(day,time,suffix));
    this.props.dispatch(getNever(day,time,suffix));
  }

  componentDidMount(){
    this.timer = setInterval(()=>{
      this.defaultOnLoad();
    },1500)
  }
  defaultOnLoad = ()=> {
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

    let mints = date.getMinutes();
    time = time * 60 + mints;
    this.props.dispatch(getScheduledEmployees(day,time,suffix));
    this.props.dispatch(getLaterScheduled(day,time,suffix));
    this.props.dispatch(getNever(day,time,suffix));
    console.warn(day,time,suffix);

    let finaleTime = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({day:day,selectedTime:finaleTime});
  }
  constructor(props) {
    super(props);
  
    this.state = {
      language: null,
      selectedTime:null,
      day:null,
      checked: false,
      as_id: null,
      as_name: null,
      as_fn: null,
      as_ln: null,
      canya: null,
      morning:null,
      afternoon:null,
      am_time:null,
      am_endTime:null,
      pm_time:null,
      pm_endTime:null,
      scheduledTime:null,
      err_mss: null,
      pastispast: false,
      nyAppoint:false,
      isTom:false,
      suffix_global:null,
      finale_time:null,
      staff_:null
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

  Available = (staff,mode) =>{
    let m_time;
    let m_endTime;
    let a_time;
    let a_endTime;
    this.setState({
      as_id: staff._id,
      as_name: staff.username,
      as_fn: staff.firstname,
      as_ln: staff.lastname,
      staff_:staff,
    });


    try{
     m_time = staff.schedule[0].morning._time;
     m_endTime = staff.schedule[0].morning._endTime;
     a_time = staff.schedule[0].afternoon._time;
     a_endTime = staff.schedule[0].afternoon._endTime;
    }
    catch(error){
      console.warn("Oh Fuck",m_time,a_time);
    }

    this.setState({
      am_time:m_time,
      am_endTime:m_endTime,

      pm_time:a_time,
      pm_endTime:a_endTime,

    })

    let scheduleState = this.isVerify(m_time,a_time);

    let morning = this.min2time(m_time,m_endTime);
    let afternoon = this.min2time(a_time,a_endTime);

   this.setState({
      morning:morning,
      afternoon:afternoon,
   });

    let _stime =  this.state.selectedTime;

    let parseTime = _stime.split(':');
    let hour = parseTime[0];
    let mints = parseTime[1];


    let finaleTime = (hour*60)+mints;

    let suffix = 'AM';
    if(hour>12){
      suffix="PM"
    }

    let timeNow = new Date();
    let hourNow = timeNow.getHours();








    if(mode==="available"){


       this.refs.appointEmployee.open();
      }
    if(mode==="unavailable"){
      this.refs.unavailable.open();
    }
    if(mode==="nyavailable"){

      // if(scheduleState==="AM" && hourNow>12)
      // this.setState({
      //   pastispast: true,
      // })
      this.refs.appointNYEmployee.open();
    }
  }

  isVerify=(m_time,a_time)=>{
    let really;
     if(m_time && a_time===undefined){
          really="AM";
      }

      if(m_time===undefined && a_time){
          really="PM";
      } 

      if(m_time && a_time){
        really="BOTH"
      }

      return really; 
  }

  min2time = (time,endTime) =>{
      try{

      let m_h = Math.floor(time/60);
      let mintsx = time%60;
      if(mintsx<10)mintsx=`0${mintsx}`;
      time = `${m_h}:${mintsx}`;

     

      let m_h1 = Math.floor(endTime/60);
      let mintsx1 = endTime%60;
      if(mintsx1<10)mintsx1=`0${mintsx1}`;
      endTime = `${m_h1}:${mintsx1}`;

      

      }
      catch(error){
          
      }

      let timeConverted;

      if(time==="NaN:NaN")timeConverted="No Schedule";
      if(time!=="NaN:NaN" && endTime!=="NaN:NaN")timeConverted=`${time} - ${endTime}`;

      return timeConverted;
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

  handleDateForSchedule = (date) =>{

      this.setState({
        scheduledTime:date,
      })
        
      let timeParse = date.split(':');
      let hour = timeParse[0];
      let mints = timeParse[1];
      let modhour=hour;
      let suffix_ = 'AM';
      if(hour>12){
        suffix_='PM';
        modhour=hour-12;
      }

      



      let finale = (modhour*60)+parseInt(mints);
      let finale_=(hour*60)+parseInt(mints);

      this.setState({
        suffix_global:suffix_,
        finale_time: finale,
      })

      let timenow = new Date();
      let mintsNow = timenow.getMinutes();
      let hourNow = timenow.getHours();
      let _suffix = "AM";
      let modhournow = hourNow;
      if(hourNow>12){
        modhournow=hourNow-12;
        _suffix="PM";
      }

      let finNow = (modhournow*60)+mintsNow;
      let finNow_ = (hourNow*60)+mintsNow;

     

      let {
        am_time,
        am_endTime,
        pm_time,
        pm_endTime
      } = this.state;

      let statex = this.isVerify(am_time,pm_time);

      console.warn("Finale",finale,finNow);

       if(finale_>=finNow_ ){

      if((statex==="AM" || statex==="BOTH") && suffix_==="AM"){
          if(hour>12){
            this.setState({
              err_mss: "No Afternoon Schedule.",
              nyAppoint:false,
            })
            this.refs.onChangeNot.open();
          }

          if(finale>=am_time&&finale<am_endTime){


            
              
              // verify that none has scheduled for morning shift
              this.props.dispatch(checkAppointment("Monday",finale,"PM"));
              

          }

          if(finale<=am_time||finale>=am_endTime){
              this.setState({
              nyAppoint:false,
              err_mss: "Cannot schedule outside scheduled time of staff",
            })
            this.refs.onChangeNot.open();
            console.warn("Reached Subdesu");
          }

          console.warn("Reached Bottom AM");
      }
      if((statex==="PM"||statex==="BOTH")&&suffix_==="PM"){
          if(hour<=12){
             err_mss: "No Morning Schedule."
            this.refs.onChangeNot.open();
          }

          if(finale>=pm_time&&finale<pm_endTime){
              // verify that none has schedule for afternoon shift

          }

          if(finale<=pm_time||finale>=pm_endTime){
              this.setState({
              nyAppoint:false,
              err_mss: "Cannot schedule outside scheduled time of staff PM",
            })
            this.refs.onChangeNot.open();
            console.warn("Reached Subdesu");
          }

          Console.warn("Reached Bottom");


      }
    }
    if(finale_<finNow_){
      this.setState({
              isTom: true,
              err_mss: "Attempting to schedule in the past. \n Focus on the future.",
            })
            this.refs.onChangeNot.open();
    }

    console.warn("FINALE",finale,"FINOW",finNow)
      
  }

  handleDate = (date) =>{
    this.setState({selectedTime: date,checked:false});

    clearInterval(this.timer);
    this.timer=null;
    let _date = new Date(null);

    let day = this.state.day;

    // string manipulation
    let date_field = date.split(':');
    let hours = date_field[0];
    let min = date_field[1];
    let suffix = "AM";
    if(hours>12){
      hours-=12;
      suffix="PM";
    }
    let time = (hours*60)+parseInt(min);
   
    console.warn("SELECTED TIME",hours,min,time,suffix);

    this.props.dispatch(getScheduledEmployees(day,time,suffix));
    this.props.dispatch(getLaterScheduled(day,time,suffix));
    this.props.dispatch(getNever(day,time,suffix));

  }

  handleChecked=()=>{
    clearInterval(this.timer);
    this.timer=null;
     if(this.state.checked===false){
      this.defaultOnLoad();

    }
    this.setState({
      checked: !this.state.checked,
    })

   
  }

  yesOrder = (mode) =>{
    const {
      service
    } = this.props.navigation.state.params;

    const {
      userid,
      username
    } = this.props;
      // let datex = this.state.scheduledTime;
      
      // let hour = timeParse[0];
      // let mints = timeParse[1];
      // let modhour=hour;
      // let suffix_ = 'AM';
      // if(hour>12){
      //   suffix_='PM';
      //   modhour=hour-12;
      // }

      



      // let finale = (modhour*60)+parseInt(mints);


    let date = new Date();
    let day = date.getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day=days[day];
   let status="pending";
    let accepted="false";
    
    let time_ret=this.state.scheduledTime;
    let time_ret_x = time_ret.split(':');
    let h = time_ret_x[0];
    if(h>12)h-=12;
    let m = time_ret_x[1];
    let time = (h*60)+parseInt(m);

    let duration=time+service.duration;

    let suffix=this.state.suffix_global;
    let staff = this.state.staff_;

   





   
        this.props.navigation.navigate("Review",{mode:mode,service:service,userid:userid,username:username,date:date,day:day,status:status
          ,accepted:accepted,duration:duration,time:time,suffix:suffix,staff:staff});
   
    
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

    const {
      service
    } = this.props.navigation.state.params;

    console.warn("AVA",scheduled_staff);


    return (
      <Container>
      	<Card width={width} height={60} backgroundColor="#E91E63" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Purchase {service.title}</Text>
      	</Card>
      	<Card marginTop={10} width={width} height={30} flexDirection="row" alignItems="center" justifyContent="center" >
      			<Text style={{color: '#000000',fontWeight: 'bold'}}>Sort by </Text>
      <DatePicker
        style={{width: 200,color:'#000000',fontSize:18}}
        time={this.state.selectedTime}
        value={this.state.selectedTime}
        date={this.state.selectedTime}
        mode="time"
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
        onDateChange={this.handleDate}
      />

      <CheckBox value={this.state.checked} onValueChange={this.handleChecked}/>
      <Text>Right Now</Text>

      	</Card>
        <Text style={{marginTop:10,color:'#FFFFFF',backgroundColor:'#C2185B'}}>Please Select An Employee From Our List</Text>
        <Card marginTop={10} width={width} height={40} backgroundColor="white" alignItems="flex-start" justifyContent="center">
          <Text style={{color: '#000000',fontWeight: 'bold'}}>Available Employee at {this.state.selectedTime}</Text>
          
        </Card>
        
        <FlatList 
        data={scheduled_staff}
        renderItem={({item})=>{
          return(

            <Button onPress={()=>this.Available(item,"available")} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
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

            <Button onPress={()=>this.Available(item,"nyavailable")} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
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

            <Button onPress={()=>this.Available(item,"unavailable")} borderBottomWidth={0.5} width={width} height={60} backgroundColor="white" flexDirection="row" alignItems="center" >
          <Image resizeMode="contain" style={{width:48,height:48}} source={require('JNL/ICONS/USERPANEL/round.png')} />
          <Text style={{textAlign:'center',marginLeft: 10}}>{item.firstname} {item.lastname}</Text>
          </Button>

            );
        }}
        keyExtractor={(item)=>item._id}
        />

        <Modal style={{width:width,height:height/2.2}} position="bottom" ref="appointEmployee">
          <Card alignItems="center" justifyContent="center">

          <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.as_fn} {this.state.as_ln}</Text>
          <Text style={{fontSize:18,fontWeight:'bold',color:'green'}}>Available</Text>
          <Text style={{fontSize:12,fontWeight:'bold'}}>Schedule</Text>
          <Text style={{fontSize:14,fontWeight:'bold'}}>Morning: {this.state.morning}</Text>
          <Text style={{fontSize:14,fontWeight:'bold'}}>Afternoon: {this.state.afternoon}</Text>
          <Text style={{fontSize:12,fontWeight:'bold'}}>What time?</Text>
          <DatePicker
                  style={{width: 200,color:'#000000',fontSize:18}}
                  time={this.state.scheduledTime}
                  minTime={"7:00"}
                  value={this.state.scheduledTime}
                  date={this.state.scheduledTime}
                  mode="time"
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
                  onDateChange={this.handleDateForSchedule}
                />

          </Card>
          <Card marginTop={3} flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button onPress={()=>this.yesOrder('y')} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#2E7D32">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Select Staff</Text>
            </Button>

            <Button onPress={()=>null} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#C62828">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>View Profile</Text>
            </Button>

          
        </Modal>

        <Modal style={{width:width,height:height/2.1}} position="bottom" ref="appointNYEmployee">
          {(this.state.pastispast===false) && 
              <Card>
            <Card alignItems="center" justifyContent="center">
          
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.as_fn} {this.state.as_ln}</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'royalblue'}}>Not Yet Available</Text>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>Schedule</Text>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>Morning: {this.state.morning}</Text>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>Afternoon: {this.state.afternoon}</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'darkred'}}>Willing to wait?</Text>
                    <Text style={{fontSize:14,fontWeight:'bold',color:'darkred'}}>If so, please schedule a time</Text>
                    
          
                    <DatePicker
                  style={{width: 200,color:'#000000',fontSize:18}}
                  time={this.state.scheduledTime}
                  minTime={"7:00"}
                  value={this.state.scheduledTime}
                  date={this.state.scheduledTime}
                  mode="time"
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
                  onDateChange={this.handleDateForSchedule}
                />
                </Card>
          
                   
                    <Card marginTop={3}>
                      <Button onPress={()=>this.yesOrder("ny")} disabled={this.state.nyAppoint}  alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#2E7D32">
                      <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Yes! Select Staff</Text>
                      </Button>
          
                      <Button onPress={()=>null} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#C62828">
                      <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>View Profile</Text>
                      </Button>
                      </Card>
                    </Card>
          }

          {(this.state.pastispast===true) &&

              <Card alignItems="center" justifyContent="center">
              <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.as_fn} {this.state.as_ln}</Text>

                 <Text>
                     DONE SCHEDULE
                 </Text>
                 <Text style={{fontSize:12,fontWeight:'bold'}}>Schedule</Text>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>Morning: {this.state.morning}</Text>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>Afternoon: {this.state.afternoon}</Text>
              </Card>

          }
          
        </Modal>


        <Modal style={{width:width,height:height/3}} position="bottom" ref="unavailable">
          <Card alignItems="center" justifyContent="center">

          <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.as_fn} {this.state.as_ln}</Text>
          <Text style={{fontSize:23,fontWeight:'bold',color:'red'}}>Not Available Today</Text>
          
          </Card>
          
          
        </Modal>


        <Modal style={{width:width,height:130}} position="bottom" ref="onChangeNot">

          <Card height={80} alignItems="center" justifyContent="center">
            <Text style={{textAlign:'center'}}>{this.state.err_mss}</Text>
            <Text style={{textAlign:'center'}}>Or do you want this schedule for tomorrow? at your chosen time</Text>
          </Card>

          {this.state.isTom===true &&
            <Card>

              <Button onPress={()=>this.yesOrder("tom")} disabled={this.state.nyAppoint}  alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="#2E7D32">
                      <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Schedule for Tomorrow</Text>
                      </Button>

            </Card>

          }

       </Modal>
        
        

      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
  return {
    scheduled_staff: state.population.pop_scheduled.scheduled,
    L_scheduled_staff: state.population.pop_scheduled.L_scheduled,
    N_scheduled_staff: state.population.pop_scheduled.N_scheduled,
    checkapp: state.schedule.schedule.found,
    userid: state.customer.login.userid,
    username: state.customer.login.username,
  }
}


module.exports = connect(mapStateToProps)(Purchase);