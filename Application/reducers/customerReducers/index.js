import {
	combineReducers
} from 'redux';
// imported reducers
import login from './c_login_reducer';
module.exports = combineReducers({
	login,
})