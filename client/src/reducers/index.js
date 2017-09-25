import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import auth from './authReducers'
import cards from './cardsReducer'

export default combineReducers({
  routing: routerReducer,
  auth,
  form: formReducer,
  cards
})