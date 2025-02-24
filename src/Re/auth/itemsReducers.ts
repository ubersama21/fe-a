import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPenj, delBrng, getItByName, getItems, getItemsId, Ritms } from "../../AZ/AX.ts";




export const addItems = createAsyncThunk(
    'items/add',
    async(x,thunkAPI)=>{
        
     
        try {
            const r = await Ritms(x)
          
            return r.data
        } catch (error) {
      
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`); 
        }
    }
)
export const getItem = createAsyncThunk(
    'items/get',
    async(x,thunkAPI)=>{
      
    
        const {pageN} = x
      
        try {
       
                const r = await getItems(pageN,10)
                return await r.data
        } catch (error) {
      
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`); 
        }
    }
)

export const gItemId = createAsyncThunk(
  'items/id',
  async(x,thunkAPI)=>{

    try {
      const r = await getItemsId(x)
      return r.data
    } catch (error) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
    
  }
)
export const addPNJ = createAsyncThunk(
  'items/sold',
  async(x,thunkAPI)=>{


    try {
      const r = await addPenj(x)
      return await r.data
    } catch (error) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
    
  }
)
export const delBrngId = createAsyncThunk(
  'items/del',
  async(x,thunkAPI)=>{
    try {
      const xz  = await delBrng(x)
  
      return await xz.data
    } catch (error) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
  }
)

export const getIbyName = createAsyncThunk(
  'item/name',
  async(x,thunkAPI)=>{
    try {
      const xz = await getItByName(x)
      return await xz.data
    } catch (error) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
  }
)

export const getNewItem = createAsyncThunk(
  'item/new',
  async(x,thunkAPI)=>{
    
        try {
                const r = await getItems(pageN,10)
                return await r.data
        } catch (error) {
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`); 
        }
  }
)
const itemsSlice = createSlice({
    name: 'items',
    initialState: {
      loadingItems: false,
      messageItems:null,
      error:null,
      items: null,
      itemsSearch:null,
      page:1,
      nextPage:null,
      totalPage:null,
      totalItems:null,
      itemsD:null,
      perPage:10,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            state.loadingItems = true;
          },
        setPerPage: (state, action) => {
            state.perPage = action.payload; 
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addItems.pending, (state) => {
          state.loadingItems = true;
          state.messageItems = null;
         
        })
        .addCase(addItems.fulfilled, (state, action) => {
           
            console.log(action.payload)
             state.loadingItems = false;
             state.messageItems = {type:'successadd',msg:action.payload.message}
        })
        .addCase(addItems.rejected, (state, action) => {
         
             state.messageItems = {type:'failadd',msg:action.payload}
             state.loadingItems = false;
             state.items= null;
             state.itemsSearch = null;
        })
        .addCase(getItem.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            state.items = null;
            state.itemsSearch = null;
            state.nextPage = null;
          })
          .addCase(getItem.fulfilled, (state, action) => {
               state.items = action.payload.brng
               state.itemsSearch = null;
               state.loadingItems = false;
               state.itemsD = null;
               state.nextPage = action.payload.nextPage;
              //  state.totalPage = action.payload.totalPages;
              //  state.totalItems = action.payload.totalItems;
              //  state.messageItems = {type:'successlogin',msg:action.payload.data.messageItems}
          })
          .addCase(getItem.rejected, (state, action) => {
             
               state.messageItems = {type:'failget',msg:action.payload}
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          .addCase(gItemId.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            // state.items= null;
           
          })
          .addCase(gItemId.fulfilled, (state, action) => {
          
               state.loadingItems = false;
               state.itemsD = action.payload.brng;
               state.items = null;
              //  state.nextPage = action.payload.next;
              //  state.totalPage = action.payload.totalPages;
              //  state.totalItems = action.payload.totalItems;
              //  state.messageItems = {type:'successlogin',msg:action.payload.data.messageItems}
          })
          .addCase(gItemId.rejected, (state, action) => {
             
               state.messageItems = {type:'failget',msg:action.payload}
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          .addCase(addPNJ.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            // state.items= null;
           
          })
          .addCase(addPNJ.fulfilled, (state, action) => {
          
               state.loadingItems = false;
               state.items = null;
               state.messageItems = {type:'successtrx',msg:action.payload.message}
          })
          .addCase(addPNJ.rejected, (state, action) => {
             
               state.messageItems = {type:'failtrx',msg:action.payload}
               state.loadingItems = false;
               state.items= null;
          })
          .addCase(delBrngId.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
          
           
          })
          .addCase(delBrngId.fulfilled, (state, action) => {
                console.log('dasdas',action.payload)
               state.loadingItems = false;
               state.messageItems = {type:'successdel',msg:action.payload.message};
          })
          .addCase(delBrngId.rejected, (state, action) => {
               state.messageItems = {type:'faildel',msg:action.payload}
               state.loadingItems = false;
               state.items= null;
          })
          .addCase(getIbyName.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            state.items = null;
            state.itemsSearch = null;
            state.nextPage = null;
           
          })
          .addCase(getIbyName.fulfilled, (state, action) => {
               state.nextPage = null;
               state.loadingItems = false;
               state.items = null;
               state.itemsSearch = action.payload.brng
               
          })
          .addCase(getIbyName.rejected, (state, action) => {
         
               state.messageItems = {type:'failitemname',msg:"Maaf barang tidak ditemukan !!"}
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          
     
    },
  });
  export const { setPage,setPerPage  } = itemsSlice.actions;
  export default itemsSlice.reducer