import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAdmx, delAdmxz, getAdmxz } from "../../AZ/AX.ts";




export const addTRXX = createAsyncThunk(
    'amdx/add',
    async(x,thunkAPI)=>{
        try {
            const res = await addAdmx(x)
            return res.data
        } catch (error) {
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`)
            }
    }
)

export const getTRXX = createAsyncThunk(
    'amdx/get',
    async(x,thunkAPI)=>{
        try {
            const res = await getAdmxz(x)
            return res.data
        } catch (error) {
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`)
            
        }
    }
)

export const delTrx = createAsyncThunk(

    'admx/del',
    async(x,thunkAPI)=>{
        try {
            const res = await delAdmxz(x)
            return res.data
        } catch (error) {
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`)
        }
    }
)
const admxSlice = createSlice({
    name: 'admx',
    initialState: {
      loadingAdmx: false,
      messageAdmx:null,
      errorAdmx:false,
      admx: null,
      filterAdmx:null,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(addTRXX.rejected,(state,action)=>{
          
            state.loadingAdmx = false;
            state.errorAdmx = true;
            state.messageAdmx = {type:'failadd',msg:action.payload}
        })
        .addCase(addTRXX.pending,(state,action)=>{
           
            state.loadingAdmx = true;
            state.errorAdmx = false;
            state.messageAdmx = null;
        })
        .addCase(addTRXX.fulfilled,(state,action)=>{
            state.loadingAdmx = false;
            state.messageAdmx = {type:'successadd',msg:action.payload.message}
        })
        .addCase(getTRXX.rejected,(state,action)=>{
          
            state.loadingAdmx = false;
            state.errorAdmx = true;
            state.messageAdmx = {type:'failadd',msg:action.payload}
        })
        .addCase(getTRXX.pending,(state,action)=>{
           
            state.loadingAdmx = true;
            state.errorAdmx = false;
            state.messageAdmx = null;
        })
        .addCase(getTRXX.fulfilled,(state,action)=>{
            state.loadingAdmx = false;
            console.log(action.payload)
            state.admx = action.payload
            // state.messageAdmx = {type:'successadd',msg:action.payload.message}
        })
        .addCase(delTrx.rejected,(state,action)=>{
          
            state.loadingAdmx = false;
            state.errorAdmx = true;
            state.messageAdmx = {type:'faildel',msg:action.payload}
        })
        .addCase(delTrx.pending,(state,action)=>{
           
            state.loadingAdmx = true;
            state.errorAdmx = false;
            state.messageAdmx = null;
        })
        .addCase(delTrx.fulfilled,(state,action)=>{
            state.loadingAdmx = false;
            console.log(action.payload)
            // state.admx = action.payload
            state.messageAdmx = {type:'successdel',msg:action.payload.message}
        })
    }
})

export default admxSlice.reducer