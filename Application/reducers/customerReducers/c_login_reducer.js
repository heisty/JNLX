let defaultState = {
	userid: '5b91945c9a2d6d1864fca4cd',
	username: 'JohnG',
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