import {
	combineReducers
} from 'redux';

// imported reducers
import customer from './customerReducers';
import alert from './AlertReducers';
import ltype from './LTypeReducer';

module.exports = combineReducers({
	customer,
	alert,
	ltype

})