
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";

/* ---------------------------------------------------------------- */
/*                      Reducers' configuration                     */
/* ---------------------------------------------------------------- */

import user from "../reducers/user"


const reducers = combineReducers({ user });

/* ---------------------------------------------------------------- */
/*                      Persistor configuration                     */
/* ---------------------------------------------------------------- */

const persistConfig = {
	key: "todo",
	storage,
	blacklist: [],
	whitelist: ["user"],
};

const persistedReducers = persistReducer(persistConfig, reducers);


/* ---------------------------------------------------------------- */
/*                        Store configuration                       */
/* ---------------------------------------------------------------- */

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducers,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};