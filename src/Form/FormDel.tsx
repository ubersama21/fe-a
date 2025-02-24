import React, { useCallback, useEffect } from 'react'
import './formdel.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function FormDel({show,setShow,action,it}){

    const {messageItems,loadingItems} = useSelector((state)=>state.items)
    const nav = useNavigate()
    const hides = async()=>{
        setShow(false)
    }
    console.log(messageItems)
    const dispatch = useDispatch()
    const delBrngX = async()=>{
        dispatch(action({id:it.id}))
    }
    const retMess = async()=>{
        if(messageItems){
            if(messageItems.type === 'successdel'){
               await toast.success(messageItems?.msg?.toString(),{
                                    position: 'top-center',
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                })
                       setShow(false)
                       nav('/')
                       
           } 
        if(messageItems.type === 'faildel'){
                           toast.error(messageItems.msg.toString(), {
                              position: 'top-center',
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                            });
                          }

        }
    }
    useEffect(()=>{

        retMess()
    },[messageItems])
  return (
    <div className={`fmDel-sec ${show?'show':'hide'}`} >
        <div  className='fmDel-cont'>
            <h3>Konfirmasi</h3>
            <h1>Hapus Item? </h1>
            <div className='btn-conf'>
                <Button
                variant='danger'
                disabled={loadingItems}
                onClick={()=>{delBrngX()}}
                >Ya </Button>
                <Button
                 disabled={loadingItems}
                 onClick={()=>{hides()}}
                >Tidak  </Button>
            </div>
        </div>
    </div>
  )
}

export default FormDel