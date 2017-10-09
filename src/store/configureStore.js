import { createStore, applyMiddleware, compose } from 'redux'
import videoApp from '../reducers/index'
import thunkMiddleware from 'redux-thunk'
export default function createAppStore(initialState) {
    const  store = createStore(videoApp,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunkMiddleware), initialState);
    return store
}