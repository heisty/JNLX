let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "SCHED_STAFF":
			return {
				...state,
				scheduled: action.staff,
			}
		case "LATER_STAFF":
			return {
				...state,
				L_scheduled: action.staff,
			}
		case "NEVER_STAFF":
			return {
				...state,
				N_scheduled: action.staff,
			}
		default:
			return state
	}
}