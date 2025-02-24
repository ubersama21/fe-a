
import axios, { AxiosRequestConfig } from 'axios'


const URLAPI = process.env.REACT_APP_API || "http://localhost:4544/"
export const LoginApi = async(x:string,z:string)=>{
    try {
        const res = await axios.post(`${URLAPI}user/login`,
        {
      
            name:x,
            password:z
           
        },
        {
            headers:{
                "Content-Type":'application/json'
            },
            withCredentials:true
        }

        ).catch((err)=>{
            throw err
        })
       
        return res
    } catch (error) {
        throw error
    }
}

export const getAcx = async()=>{
    try {
        const res = await axios.get(`${URLAPI}token/reftok`,{
            headers:{
                "Content-Type":"application-json"
            },
            withCredentials:true,
        })
        return res
    } catch (error) {
        throw error
    }
}
const Axs = axios.create();
Axs.interceptors.request.use(
    async(config)=>{
        const x = await getAcx()
       
        if(config.headers){
            config.headers['Authorization'] = `Bearer ${x.data.acc}`
        }
       
        return config
    },
    (error)=>{
   
        return Promise.reject(error);
    }
)
export const userLogout = async()=>{
    try {
        const logout  =  await Axs.delete(`${URLAPI}user/logout`,{
            headers:{
                "Content-Type":"application-json"
            },
            withCredentials:true,
        })
        return logout
    } catch (error) {
        throw(error)
    }
 
}
export const Ritms = async(x:any
)=>{

    try {
        const xz = await Axs.post(`${URLAPI}brg/ade`,x,{
            headers:
                {
                  'Content-Type': 'multipart/form-data'
                },
            withCredentials:true    
        })
        return xz
    } catch (error) {
        throw error
    }

}

export const getItems = async(page:number,perPage:number)=>{
    try {
        const d = await axios.get(`${URLAPI}brg/vp/${page}/${perPage}`,
            {
                headers:    {
                    "Content-Type":"application-json"
                },
                withCredentials:true    
            }
        )
        return d
    } catch (error) {
        throw error
    }
}

export const getItemsId = async(x:number)=>{
   const {z} = x
    try {
        const xz = await axios.get(`${URLAPI}brg/vi/${z}`,
            {
                headers:    {
                    "Content-Type":"application-json"
                },
                withCredentials:true    
            }
        )
        return xz
    } catch (error) {
        throw error
    }
}

export const addPenj = async(x:any)=>{

    try {
        const xz = await Axs.post(`${URLAPI}trans/addpnj/`,
        {
            category:x.category,
            amount:x.amount,
            deskripsi:x.deskripsi,
            brng_id:x.brng_id,
            jml:x.jml
        },
            {
         
            headers:
                {
                   "Content-Type":"application/json"
                },
            withCredentials:true    
        })
        return xz
    } catch (error) {
        throw error
    }
}
export const delBrng = async(x:any)=>{
    try {
     const xs  = await Axs.delete(`${URLAPI}brg/delete?id=${x.id}`,
                {
                headers:
                    {
                       "Content-Type":"application/json"
                    },
                withCredentials:true    
            })
   
      return xs
    } catch (error) {
      throw error
    }
}

export const addAdmx = async(x:any)=>{
        
    try {
        const xz = await Axs.post(`${URLAPI}trans/add`,
        {
            amount:x.amount,
            category:x.category,
            deskripsi:x.deskripsi
        }
        ,
        {
         
            headers:
                {
                   'Content-Type': 'application/json'
                },
            withCredentials:true    
        }

    )
        return xz
    } catch (error) {
        throw error
    }
}


export const getAdmxz = async(x:any)=>{
    
    try {
        const xs  = await axios.get(`${URLAPI}trans/trx?month=${x.start}&year=${x.end}`,
            {
         
                headers:
                    {
                       'Content-Type': 'application/json'
                    },
                withCredentials:true    
            }
        )
        return xs
    } catch (error) {
        throw error
    }
}

export const delAdmxz = async(x:any)=>{


    try {
        const xz = await Axs.delete(`${URLAPI}trans/deltrx?id_trx=${x}`,
            {
            headers:
                {
                   "Content-Type":"application/json"
                },
            withCredentials:true    
        })
        return xz
    } catch (error) {
        throw error
    }
}

export const getItByName = async(x:any)=>{
  
    try {
        const xz = await axios.get(`${URLAPI}brg/vn/${x}`,{
            headers:
                {
                   "Content-Type":"application/json"
                },
            withCredentials:true    
        })
        return xz
    } catch (error) {
        throw error
    }
}