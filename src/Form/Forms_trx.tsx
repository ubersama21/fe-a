import React, { useCallback, useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import './forms.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Forms_trx({title,dx,show,setShow,action}) {


  // const {messageItems,loadingItems} = useSelector((state)=>state.items)
   const {messageAdmx,loadingAdmx} = useSelector((state)=>state.admx)
  const hideCont = async()=>{
    setShow(false)

  }
  const dispatch =  useDispatch()
  const Xzs = async(e)=>{
    e.preventDefault()
    const xel = await document.getElementById('fmtrx') as HTMLFormElement;
   
    const data = new FormData(xel)
    
    const a  = data.get('category')
    const b = data.get('amount')
    const c = data.get('deskripsi')

 
    try {
      dispatch(action({category:a,amount:b,deskripsi:c}))
      
    } catch (error) {
    
      return;
    }
  
  }


 
    useEffect(()=>{
      if(messageAdmx !== null){
        
          if(messageAdmx.type === 'failadd'){
           toast.error(messageAdmx.msg.toString(), {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
            });
          }
          if(messageAdmx.type === 'successadd'){
           toast.success(messageAdmx.msg.toString(),{
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
          })
          const xel = document.getElementById('fmbrg') as HTMLFormElement;
          if(xel) xel.reset()
       
          setShow(false)
        }
      }
     

    },[messageAdmx])
  
  

 
  
 
  return (
    <>
  
 
      <div key={title}         className={`formR-sec ${show?'showF':'hideF'}`}>
    
      <div className='formR-cont'>
        <div className='btnH-cont'>
         <Button onClick={hideCont} 
          disabled={loadingAdmx?true:false}
         className='btn-hide'></Button>
        </div>
      
        <div >
          <h2 className='textR-head'>{title}</h2>
        </div>
        <div>
          <Form id='fmtrx' onSubmit={(e)=>{Xzs(e)}}>
            {
              dx && dx.map((x,i)=>{
                
                if(x.type === 'text' || x.nama === 'desk'){
                  return(
                  <Form.Group key={x.nama+i} className="mb-3" controlId={`formBasic${x.nama}`}>
                    <Form.Label className='fbi'>{x.label}</Form.Label>
                    <Form.Control
                    defaultValue={x.val?x.val:""}
                    type={x.type} as='textarea' name={x.nama} required placeholder={x.placeholder} 
                
                    />       
                  </Form.Group>
                  )
                  
                }
                if(x.type === 'options'){
                  return (
                    <Form.Group key={x.nama + i} className="mb-3" controlId={`formBasic${x.nama}`}>
                      <Form.Label className='fbi'>{x.label}</Form.Label>
                      <Form.Control as="select" name={x.nama} required>
                        {x.value.map((option, i) => (
                          <option defaultChecked={x.val?x.val:''} key={x.nama+i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  );
                }
                return (
                  <Form.Group   hidden={x.nama === 'brng_id'}  key={x.nama + i} className="mb-3" controlId={`formBasic${x.nama}`}>
                    <Form.Label className='fbi'>{ x.label }</Form.Label>
                    <Form.Control
                      defaultValue={x.val?x.val:""}
                      type={x.type} name={x.nama}
                      required = {x.nama !== 'brng_id'}
                      placeholder={x.placeholder} />
                  </Form.Group>
                );
              })
              
            }
           
             <Button  variant="primary" type="submit"
              disabled={loadingAdmx?true:false}
             >{
              "Tambah"
             }
              </Button>
          </Form>
         
         </div>
      </div>
    </div>
    {/* )} */}
     </>
  )
}

export default Forms_trx