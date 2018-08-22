import {
	combineReducers
} from 'redux';
// imported reducers
import cat from './cat';
import service from './service';
module.exports = combineReducers({
	cat,
	service,
})