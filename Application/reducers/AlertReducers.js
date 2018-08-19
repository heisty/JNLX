let defaultState = {

	header: null,
	message: null,
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "ALERT":
			return {
				header: action.header,
				message: action.message,
			}
		default: 
			return state
	}
}