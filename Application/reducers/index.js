import {
	combineReducers
} from 'redux';

// imported reducers
import customer from './customerReducers';
import alert from './AlertReducers';
import ltype from './LTypeReducer';
import product from './Product';
import population from './Population';
module.exports = combineReducers({
	customer,
	alert,
	ltype,
	product,
	population

})