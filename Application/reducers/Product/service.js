let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "SERVICE":
			return {
				...state,
				service: action.service,
			}
		case "STYPE":
			return{
				...state,
				types: action.types,
			}
		default:
			return state;
	}


}