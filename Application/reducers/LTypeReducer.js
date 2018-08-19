let defaultState = {
	type: null
}
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LTYPE": 
		return{
			ltype: action.ltype,
		}
		default: 
		return state
	}
}