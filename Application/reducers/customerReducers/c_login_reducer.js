let defaultState = {
	userid: '5b78d5bf51ce382d30fda641',
	username: 'Hack',
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LOGGED_CUSTOMER":
			return{
				...state,
				userid: action.userid,
				username: action.username,
			}
		case "LOGGED_USER_INFO":
			return{
				...state,

				firstname: action.firstname,
				lastname: action.lastname,
				email: action.email,
				contact: action.contact,
				street: action.street,
				brgy: action.brgy,
				munc: action.munc,
				city: action.city

			}
		default:
			return state
	}
}