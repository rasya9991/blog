import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserReducer from './reducers/UserSlice'
import PostReducer from './reducers/PostsSlice'
import SinglePageReducer from './reducers/SinglePageSlice'
const rootReducer = combineReducers({
    UserReducer,
    PostReducer,
    SinglePageReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']