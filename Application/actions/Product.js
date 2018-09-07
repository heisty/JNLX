import {
	GET_CAT,
	BOOKED
} from '../api';
import axios from 'axios';

export const getCat=(catfor)=>{
	return function(dispatch){
		return axios.post(GET_CAT,{catfor}).then((response)=>{
			let {category} = response.data;
			dispatch({
				type: "CAT",
				category
			})
		}).catch((error)=>{
			console.warn("GET CAT ERROR",error,error.response);
		})
	}
}

export const getBooked = (userid) =>{

	return function(dispatch){
		return axios.post(BOOKED,{userid}).then((response)=>{
			
			let booked = response.data.booked;
			dispatch({
				type: "BOOKED",
				booked
			});

		}).catch((error)=>{
			console.warn("BOOKED ERROR",error,error.response);
		})
	}
}