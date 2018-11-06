import { combineReducers } from 'redux';
import CityReducers from './CityReducers';
import CityList from './CityList';


const rootReducer = combineReducers({
    CityList,
    CityReducers
});

export default rootReducer;