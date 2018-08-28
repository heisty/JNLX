let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "CHECK_APP":
				return {
					found: action.found,
				}
		default:
				return state;
	}
}