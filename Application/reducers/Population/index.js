import {
	combineReducers
} from 'redux';
// imported reducers
import populationScheduled from './scheduledStaff';
module.exports = combineReducers({
	pop_scheduled:populationScheduled,
})