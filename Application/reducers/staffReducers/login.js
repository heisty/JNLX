let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LOGGED_STAFF":
			return{
				userid:action.userid,
				username:action.username,
			}
		default:
		return state
	}
}