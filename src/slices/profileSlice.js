import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    xp : 0,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setXP(state, value) {
            state.xp = value.payload;
        },
    },
});

export const {setUser, setLoading, setXP} = profileSlice.actions;
export default profileSlice.reducer;