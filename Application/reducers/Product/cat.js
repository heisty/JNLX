let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "CAT":
			return {
				cat: action.category,
			}
		default:
			return state
	}
}