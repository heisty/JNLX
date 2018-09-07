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
		case "BOOKED":

			let active = [];
			let pending = [];
			let completed = [];

			let axe = action.booked;

			try{
			
			axe.forEach(function(item){
				item.appointment.map(function(itemx){

					if(itemx.status==="pending"){

						let name = {
							staffname: `${item.firstname} ${item.lastname}`
						}

						pending.push(itemx);
						pending.push(name);
					}
					if(itemx.status==="active"){
						active.push(itemx);
					}

				});
				


			})
		}
		catch(error){
			console.warn("TAE",error)
		}

			console.warn("AXE":axe);
			console.warn(pending);


		




			return {
				...state,
				pending,
				active
			}
		default:
			return state;
	}


}