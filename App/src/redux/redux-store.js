import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./auth-reducer";
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage  : usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
  // other store enhancers if any
);
let store = createStore(reducers, enhancer);
export default store;