import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from './Sidebar/Sidebarslice'
import AuthReducer from './Auth/AuthSlice'

export default configureStore({
    reducer: {
        Sidebar: SidebarReducer,
        auth: AuthReducer,
    },
})