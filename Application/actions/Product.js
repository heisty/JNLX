import {
	GET_CAT
} from '../api';
import axios from 'axios';

export const getCat=()=>{
	return function(dispatch){
		return axios.post(GET_CAT).then((response)=>{
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