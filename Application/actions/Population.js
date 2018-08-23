import {
	GET_SCHEDULED,
	GET_LATER_SCHEDULED,
	GET_NEVER
} from '../api';
import axios from 'axios';
exports.getScheduledEmployees=(day,time,suffix)=>{
	return function(dispatch){
		return axios.post(GET_SCHEDULED,{day,time,suffix}).then((response)=>{
			let staff = response.data.staff;
			dispatch({
				type:"SCHED_STAFF",
				staff
			})
			console.warn(staff);
			console.warn("GS SUCCEED",staff);
		}).catch((error)=>{
			console.warn("GET SCHEDULE ERROR",error,error.response);
		})
	}
}

exports.getLaterScheduled=(day,time,suffix)=>{
	return function(dispatch){
		return axios.post(GET_LATER_SCHEDULED,{day,time,suffix}).then((response)=>{
			let staff = response.data.staff;
			dispatch({
				type:"LATER_STAFF",
				staff
			})
			console.warn(staff);
			console.warn("GLS SUCCEED",staff);
		}).catch((error)=>{
			console.warn("GET SCHEDULE LATER ERROR",error,error.response);
		})
	}
}

exports.getNever=(day,time,suffix)=>{
	return function(dispatch){
		return axios.post(GET_NEVER,{day,time,suffix}).then((response)=>{
			let staff = response.data.staff;
			dispatch({
				type:"NEVER_STAFF",
				staff
			})
			console.warn(staff);
			console.warn("NEVEr S SUCCEED",staff);
		}).catch((error)=>{
			console.warn("GET SCHEDULE NEVER ERROR",error,error.response);
		})
	}
}