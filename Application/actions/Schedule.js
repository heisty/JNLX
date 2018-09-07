import {
	CHECK_APPOINTMENT,
	SET_APPOINTMENT,
	MY_POS
} from '../api';
import axios from 'axios';

export const checkAppointment = (day,time,suffix) => {
		return function(dispatch){
			return axios.post(CHECK_APPOINTMENT,{day,time,suffix}).then((response)=>{
				let {found} = response.data;
				dispatch({
						type: "CHECK_APP",
						found,
				})
			}).catch((error)=>{
				console.warn("CHECKAPP error",error,error,response);
			})
		}
}

export const setAppointment = (
	userid,
	username,
	staffid,
	serviceid,
	servicename,
	date,
	status,
	accepted,
	time,
	duration,
	suffix
	) =>{
	return function(dispatch){
		return axios.post(SET_APPOINTMENT,{
	userid,
	username,
	staffid,
	serviceid,
	servicename,
	date,
	status,
	accepted,
	time,
	duration,
	suffix}).then((response)=>{

		}).catch((error)=>{
			console.warn("SA error",error,error.response);
		})
	}
}

export const getPos = (userid) =>{
	return function(dispatch){
		return axios.post(MY_POS,{userid}).then((response)=>{

			let pos = response.data.pos;
			let data_n = response.data.data_n;
			dispatch({
				type: "POS",
				pos,
				data_n
			})
			console.warn(pos);

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}