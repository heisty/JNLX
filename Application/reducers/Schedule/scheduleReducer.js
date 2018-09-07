let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "CHECK_APP":
				return {
					found: action.found,
				}
		case "POS": 
			return{
				pos: action.pos,
				length: action.data_n,
			}
		default:
				return state;
	}
}