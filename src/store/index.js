import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  createLogger(),
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
  autoRehydrate()
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

persistStore(store, {whitelist: ['auth']})

// In case redux-persist rehydrate gets out of wack
// persistStore(store).purge()


export default store