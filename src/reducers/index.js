import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import events from './events'

// 各reducerを結合する
export default combineReducers({ events, form })