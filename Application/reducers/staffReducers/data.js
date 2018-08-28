
let defaultState = {
	
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "DATA_APP":
			return {
				appointment: action.appointment,
			}
		default:
			return state
	}
}
