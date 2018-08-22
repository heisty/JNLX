import {
	STAFF_SIGNIN
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