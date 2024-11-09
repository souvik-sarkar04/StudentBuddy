import {createSlice} from "@reduxjs/toolkit"

//? User is available but he is not instructor -> for such a user, cartSlice is needed

const initialState = {
    //? Error resolving : setUser(null) sets the user to null so in profile page, user is undefined as its data does not persist, hence, it is stored in localStorage
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