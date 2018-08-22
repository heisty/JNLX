import {
	CUST_SIGNUP,
	CUST_SIGNIN,
	CUST_ADDRESS,
	CUST_INFO,
	CUST_UPDATE
} from '../api';
import {
	staffSignIn
} from './StaffActions';
import axios from 'axios';


export const customerSignup = (username,password,firstname,lastname,email,contact,street,brgy,munc,city)=>{
	return function(dispatch){
		return axios.post(CUST_SIGNUP,{username,password,firstname,lastname,email,contact,street,brgy,munc,city}).then((response)=>{
			let {userid,username} = response.data;
			dispatch({
				type: "LTYPE",
				ltype: "customer"
			})
			dispatch({
				type: "LOGGED_CUSTOMER",
				userid,
				username

			});

			dispatch(setAlert("Signup Success","Thank you for signing up."));
		}).catch((error)=>{
			console.warn("THIS",error,error.response);
			dispatch(setAlert("Signup Failed","We cannot sign you up."));
		})
	}
}

export const customerUpdate = (userid,firstname,lastname,email,contact,street,brgy,munc,city)=>{
	return function(dispatch){

		return axios.post(CUST_UPDATE,{userid,firstname,lastname,email,contact,street,brgy,munc,city}).then((response)=>{
			
			dispatch(setAlert("Update Success","Information Updated"));
			dispatch(customerInfo(userid));
		}).catch((error)=>{
			console.warn("THIS",error,error.response);
			dispatch(setAlert("Update Failed","No can update."));
		})
	}
}

export const customerSignIn = (username,password) => {
	return function(dispatch){
		return axios.post(CUST_SIGNIN,{username,password}).then((response)=>{
			let {userid,username} = response.data;
			dispatch(setAlert("Signin Success","Thank you for signing in."));

		}).catch((error)=>{
			dispatch(staffSignIn(username,password));
			//dispatch(setAlert("Signin Failed","We cannot sign you in."));
		})
	}
}

export const customerInfo = (userid) =>{
	return function(dispatch){
		return axios.post(CUST_INFO,{userid}).then((response)=>{
			let {userinfo} = response.data;

			let data = userinfo.map(function(item){
				return{
					userid: item._id,
					username: item.username,
					firstname: item.firstname,
					lastname: item.lastname,
					email: item.email,
					contact: item.contact,
					street: item.street,
					brgy: item.brgy,
					munc: item.munc,
					city: item.city
				}
			})

			console.warn("DATA",data);


			dispatch({
				type: "LOGGED_USER_INFO",
				firstname: data[0].firstname,
				lastname: data[0].lastname,
				email: data[0].email,
				contact: data[0].contact,
				street: data[0].street,
				brgy: data[0].brgy,
				munc: data[0].munc,
				city: data[0].city
				
			})
		}).catch((error)=>{
			console.warn("ERROR CUSTOMER INFO",error,error.response)
		})
	}
}

export const setAlert = (header,message) =>({
	type: "ALERT",
	header,
	message
});


