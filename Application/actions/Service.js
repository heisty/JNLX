import {
	GET_SERVICES,
	GET_STYPE
} from '../api';
import axios from 'axios';

export const getService = (category) =>{
	return function(dispatch){
		return axios.post(GET_SERVICES,{category}).then((response)=>{
			
			let {service} = response.data;
			dispatch({
				type: "SERVICE",
				service
			});

			console.warn("inACTIN",service);
		}).catch((error)=>{
			console.warn("ERROR GET SERVICE",error,error.response);
		})
	}

}

export const getServiceType = (service) =>{
	return function(dispatch){
		return axios.post(GET_STYPE,{service}).then((response)=>{
			let types = response.data;

			

			types=data;

			console.warn(data[0].title);

			
			dispatch({
				type: "STYPE",
				types
			})
		}).catch((error)=>{
			console.warn("Error Get Service Type");
		})
	}
}