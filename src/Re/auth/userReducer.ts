 
import {createSlice,createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import { getAcx, LoginApi, userLogout } from '../../AZ/AX.ts';
import { Jxd } from '../../AZ/Jxd.ts';


export const loginUsers = createAsyncThunk(
    'auth/login', // Nama action
    async (x, thunkAPI) => {
      const { name, password } = x;
      try {
        const res = await LoginApi(name,password)
  
        return res
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            return thunkAPI.rejectWithValue(error.response.data.message); 
          }
       
        return thunkAPI.rejectWithValue(`${error.message}`);
      }
      
    }
  );

export const getAx = createAsyncThunk(
    'auth/token',
    async(x,thunkAPI)=>{
        try {
            const res = await getAcx()
            const ax = await Jxd(res.data.acc)
            return ax
        } catch (error) {
        
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`);
        }
    }
)
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async(x,thunkAPI)=>{
    try {
      const res = await userLogout()
      return res.data
    } catch (error) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`);

    }
  }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: false,
      loading: false,
      message:null,
      error:null,
      user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUsers.pending, (state) => {
          state.loading = true;
          state.message = null;
         
        })
        .addCase(loginUsers.fulfilled, (state, action) => {
           
             state.isAuthenticated = true;
             state.loading = false;
             state.message = {type:'successlogin',msg:action.payload.data.message}
        })
        .addCase(loginUsers.rejected, (state, action) => {
             state.isAuthenticated = false;
             state.message = {type:'faillogin',msg:action.payload}
             state.loading = false;
             state.user= null;
        })
        .addCase(getAx.pending,(state)=>{
            state.loading = true;
            state.message = null;
        })
        .addCase(getAx.fulfilled,(state,action)=>{ 
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.message = null;
        })
        .addCase(getAx.rejected,(state,action)=>{
          
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.message = {type:'failtok',msg:"Please Login"};
        })
        .addCase(logoutUser.pending,(state)=>{
              state.loading = true;
              state.message = null;
          })
          .addCase(logoutUser.fulfilled,(state,action)=>{ 
              state.isAuthenticated = false;
              state.user = null;
              state.loading = false;
              state.message = {type:'successlogout',msg:"Berhasil Logout"};
          })
          .addCase(logoutUser.rejected,(state,action)=>{
              console.log(action.payload,'dasda')
              state.loading = false;
              state.message = {type:'faillogout',msg:"Gagal Logout"};
          })
    },
  });

  export default authSlice.reducer