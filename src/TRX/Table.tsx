
import { Button, Table } from 'react-bootstrap'
import './tables.css'
import { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delTrx } from '../Re/auth/admxReducers.ts';
import { toast } from 'react-toastify';

const filterdHeadDX = async(x)=>{
   
  
  
        let keys = Object.keys(x); // Ambil semua key dari objek
        let newObj = [];  
        newObj.push({name:'No'})
        keys.forEach(key => {
        //   newObj[key] = key; 
          newObj.push({name:key}) // Setiap key di objek baru diisi dengan key-nya sendiri
        });
      
        
    
      
      return newObj
}

export const getRP = (x:number)=>{
  return new Intl.NumberFormat('id-ID',{
      style:'currency',
      currency:'IDR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0   
  }).format(x)
  
}

function TableAdmx ({dx,head,act1}){
    const [heads,setHeads] = useState(null)
    const [bodys,setBodys] = useState(null)
    const {loadingAdmx,messageAdmx} = useSelector((state)=>state.admx)
    const [total,setTotal] = useState(null)
    const dispatch = useDispatch()
    const getDax = async()=>{
        if(dx!==null && dx.length !== 0){
            const x = await filterdHeadDX(dx[0])
            setHeads(x)
            const xz =await dx.filter(x => !(x.id && x.user_name))
            const totalAmount = dx.reduce((total, x) => parseInt(total) + (parseInt(x.amount) || 0), 0);
            console.log(totalAmount)
            setTotal(totalAmount)

        }
    }

    const getDate = (x)=>{
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(new Date(x))
    }
    useEffect(()=>{
       
      getDax()
    },[dx])

    const deleteTRX = async(x)=>{
      dispatch(delTrx(x))
    }
    useEffect(()=>{
          if(messageAdmx !== null){
                
            if(messageAdmx.type === 'faildel'){
              toast.error(messageAdmx.msg.toString(), {
                 position: 'top-center',
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
               });
               
               act1()
             }
              if(messageAdmx.type === 'successdel'){
               toast.success(messageAdmx.msg.toString(), {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                });
                
                act1()
              }
              
            }
    
        },[messageAdmx])
    return(
        <div>
          {(dx&&dx.length===0)&&(<div className='nf-dt'><h3>{head} Tidak Ditemukan</h3></div>)}
          {(dx && dx.length !==0) && (
            <div className="table-dx">
                <h3>{head}</h3>
                <div className='table-container'>
                    <Table  hover  variant='dark'
                        className='table-sec'
                    >
                    <thead>
                    <tr>
                    {heads&&heads.map((x,i)=>
                   (x.name !== 'id' && x.name !== 'user_name' && 
                    x.name !== 'createdAt' && x.name !== 'brng_id' && x.name !=='jml_terjual'
                     )  &&
                   (
                        <th key={i+x.name} 
                        >{x.name}</th>
                    )
                    )}
          
                    <th>
                      Hapus
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                       
                        {
                            dx && dx.map((x,i)=>{
                               return (
                                <tr key={i}>
                                 <td>{i+1   }</td>
                                 <td>
                                    {x.category}
                                 </td>
                                 <td>{getRP(x.amount)}</td>
                                 <td >
                                    {x.deskripsi}
                                 </td>
                                 <td>
                                   {getDate(x.updatedAt)}
                                 </td>
                                 <td>
                                  <Button
                                   variant='danger'
                                   disabled={loadingAdmx}
                                   onClick={()=>{deleteTRX(x.id)}}
                                  >Delete</Button>
                                 </td>
                                </tr>
                                
                               )
                            })
                        }
                       <tr>
                        <td colSpan="6">
                         Sub Total : {getRP(total)}
                        </td>
                       </tr>
                    </tbody>
                    </Table>
                </div>
            </div>
          )}
        </div>
    )
}

export default TableAdmx