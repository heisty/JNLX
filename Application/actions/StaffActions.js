import {
	STAFF_SIGNIN,
	GET_APP
} from '../api';
import {
	setAlert
} from './CustomerActions';
import axios from 'axios';

export const staffSignIn=(username,password)=>{
	return function(dispatch){
		return axios.post(STAFF_SIGNIN,{username,password}).then((response)=>{
			let {userid,username} = response.data;
			let ltype="staff";
			dispatch({
				type: "LTYPE",
				ltype
			});
			dispatch(setAlert("Staff Signin Success","Thank you for signing in."));
	}).catch((error)=>{
		dispatch(setAlert("Signin Failed","We cannot sign you in."));
		console.warn("ERROR STAFF SIGN IN",error,error.response);
	})
	}
}

export const getAppointment = (staffid) =>{
	return function(dispatch){
		return axios.post(GET_APP,{staffid}).then((response)=>{
			let {appointment} = response.data;

			let _appointment = appointment.map(function(item){
				return{
					app: item.appointment,
				}
			})

			appointment=_appointment[0].app;


			dispatch({
				type: "DATA_APP",
				appointment
			})

			console.warn(appointment);
		}).catch((error)=>{
			console.warn("GA APP",error,error.response);
		})
	}
}