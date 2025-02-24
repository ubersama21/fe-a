import React, { useCallback, useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { _CnxD } from '../AZ/Jxd.ts';
import './fmpj.css';

function Forms_Penj({show,setShow,itx,act  }){
  const {messageItems,loadingItems  } = useSelector((state)=>state.items)
  const dispatch = useDispatch()

  const adds = async()=>{
    const xel = await document.getElementById('fmtrx') as HTMLFormElement;
    if(xel){
      const data = new FormData(xel)
      const xs = data.get('jml')
      data.append('brng_id',itx.id)
      data.append('deskripsi',`Penjualan Barang ${itx.nama} jumlah ${xs}`)
      data.append('category','Pendapatan')
      data.append('amount',itx?.harga * xs)
      dispatch(act({
        category:"Pendapatan",
        deskripsi:`Penjualan Barang ${itx.nama} jumlah ${xs}`,
        jml:xs,
        amount:itx?.harga * xs,
        brng_id:itx?.id,
        
      }))
      for (let [key, value] of data.entries()) {
        console.log(key, value);
    }
    }
  }
  const msgx = async()=>{
    if(messageItems){
      if(messageItems.type ==="successtrx"){
        toast.success(messageItems.msg.toString(),{
                     position: 'top-center',
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                 })
        const xel = await document.getElementById('fmtrx') as HTMLFormElement;
        if(xel) xel.reset()
        setShow(false)
    }
      if(messageItems.type === 'failtrx'){
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
    msgx()
  },[messageItems])
  
  return (
    <>
      <div   className={`formS 
          ${show?'show':'hide'}
        `} >
        <div className='btnF-hide'
        >
          <Button
          className='btn2-hide'
          onClick={()=>{setShow(false)}}
          disabled={loadingItems}
          ></Button>
        </div>
        <div
        className='fromS-cont'
        >
       
          <Form id='fmtrx'
          className='formPenj'
          >
            <Form.Group  className="mb-3 count" controlId={`formBasicC`}>
                <Form.Label className='fbi'>
                  Jumlah
                </Form.Label>
                <Form.Control className='frmCount '
                defaultValue={1}
                min={1}
                required
                name='jml'
                >
                
                </Form.Control>
            </Form.Group>
          </Form>
       
        </div>
        <div  className='btn-add'>
          <Button
            onClick={()=>{adds()}}
            disabled={loadingItems}
          >
            Kirim
          </Button>
        </div>
      </div>
   
    </>
  )
}

export default Forms_Penj