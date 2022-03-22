import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userRedux";
import goalReducer from "./goalRedux";
import logReducer from "./logRedux";
import storage from "redux-persist/lib/storage";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from "redux-persist";

const persistConfig = {
	key: 'root',
	version: 1,
	storage
};

const rootReducer = combineReducers({user: userReducer, training: goalReducer, log: logReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	)
});

export let persistor = persistStore(store);
