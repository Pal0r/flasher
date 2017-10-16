import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST } from '../constants/actionTypes';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false, user: {}, token: ''}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, user: action.user, token: action.token };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: undefined, token: '' };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false, user: undefined, token: '' };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    default:
      return state
  }
}