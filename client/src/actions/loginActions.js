import axios from 'axios'
import { push } from 'react-router-redux'
import * as Actions from '../constants/actionTypes'

const API_URL = 'http://localhost:3000/api'

export const errorHandler = (dispatch, error, type) => {
  let errorMessage = ''
  try {
    if (error.data.error){
      errorMessage = error.data.error
    } else if (error.data){
      errorMessage = error.data
    } else {
      errorMessage = error
    }
  } catch(e) {
    errorMessage = 'There was an error processing your request'
  }

  if(error.status === 401){
    dispatch({
      type: type,
      payload: errorMessage
    })
  } else {
    dispatch({
      type: type,
      payload: error
    })
    dispatch(push('/login'))
  }
  logoutUser()
}

const fetchToken = (route, params, dispatch) => {
  axios.post(`${API_URL}${route}`, params)
    .then(response => {
      dispatch({ type: Actions.AUTH_USER, user: response.data.user, token: response.data.token })
      dispatch(push('/dashboard'))
    })
    .catch((error) => {
      if (error){errorHandler(dispatch, error.response, Actions.AUTH_ERROR)}
    })
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    fetchToken('/auth/login', { email, password}, dispatch )
  }
}

export const registerUser = ({ email, firstName, lastName, password }) => {
  return (dispatch) => {
    fetchToken('/auth/register', { email, firstName, lastName, password }, dispatch)
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: Actions.UNAUTH_USER })
    dispatch(push('/login'))
  }
}

export const protectedTest = (jwtCookie) => {
  return (dispatch) => {
    if(jwtCookie){
      axios.get(`${API_URL}/protected/isprotected`, {
        headers: { 'Authorization': jwtCookie }
      })
        .then(response => {
          dispatch({
            type: Actions.PROTECTED_TEST,
            payload: response.data.content
          })
        })
        .catch((error) => {
          if(error){errorHandler(dispatch, error, Actions.AUTH_ERROR)}
        })
    } else {
      dispatch(push('/login'))
    }
  }
}