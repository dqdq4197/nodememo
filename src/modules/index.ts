import {combineReducers} from 'redux';
import theme from './theme';
import codememo from './codememo';

const rootReducer = combineReducers({
    theme,
    codememo
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;