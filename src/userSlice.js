import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    users: [],
    isLoading: false,
}

export const getAllUser = createAsyncThunk(
    'user/getAllUser', 
    async () => {
        try {
            const {data} = await axios.get("http://localhost:3001/users")
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData) => {
        try {
            const {data} = await axios.post("http://localhost:3001/users", userData)
            return data
        } catch (error) {
            console.log(error)
            throw new Error('მომხმარებლის დამატებისას მოხდა შეცდომა!')
        }
    },
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData) => {
        try {
            const {data} = await axios.put(`http://localhost:3001/users/${userData._id}`, userData)
            return data
        } catch (error) {
            console.log(error)
            throw new Error('მომხმარებლის რედაქტირებისას მოხდა შეცდომა!')
        }
    },
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (_id) => {
        try {
            await axios.delete(`http://localhost:3001/users/${_id}`)
            return _id
        } catch (err) {
            throw new Error('მომხმარებლის წაშლისას მოხდა შეცდომა!')
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            // Users list
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload.data
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false
            })

            // Add user
            .addCase(addUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users.push(action.payload.user)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false
            })

            // Update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.users.findIndex((user) => user._id === action.payload.user._id)
                state.users[index] = action.payload.user
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
            })

            // Remove user
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = state.users.filter((user) => user._id !== action.payload)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const {} = userSlice.actions
export default userSlice.reducer
