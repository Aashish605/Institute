import { createSlice } from '@reduxjs/toolkit'

export const SidebarSlice = createSlice({
    name: 'Sidebar',
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
        openSidebar: (state) => {
            state.isSidebarOpen = true;
        },
    },
})

export const { toggleSidebar, closeSidebar, openSidebar } = SidebarSlice.actions

export default SidebarSlice.reducer