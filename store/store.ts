import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import counterSlice from '../features/counter/counterSlice';

import api from '../features/api/api';

const combinedReducer = combineReducers({
    counter: counterSlice,
    [api.reducerPath]: api.reducer,
});

const reducer = (
    state: ReturnType<typeof combinedReducer>,
    action: AnyAction
) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () =>
    configureStore({
        // @ts-ignore
        reducer,
        // @ts-ignore
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });

export const store = makeStore();

type Store = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

// export const wrapper = createWrapper(makeStore, { debug: true });
export const wrapper = createWrapper(makeStore);
