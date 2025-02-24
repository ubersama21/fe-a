import React, { useEffect } from 'react'
import { Form,Button } from 'react-bootstrap'
import './login.css'
import { toast } from 'react-toastify'
import { LoginApi } from '../AZ/AX.ts'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAx, loginUsers } from '../Re/auth/userReducer.ts'


function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isAuthenticated, loading, message } = useSelector((state:any) => state.auth);
  const handlerLogin = async(e:React.FormEvent)=>{
    e.preventDefault()
    const xel = await document.getElementById('form-login') as HTMLFormElement;
    const data = new FormData(xel)
    const y = data.get('name')
    const z = data.get('password')
    dispatch(loginUsers({name:y,password:z}))
    
  }
  useEffect(()=>{
    if(message !== null){
        if(message.type === 'faillogin')
        toast.error(message.msg.toString(), {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        if(message.type === 'successlogin')
         toast.success(message.msg.toString(),{
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        })
    }
   
    if(isAuthenticated){
        navigate('/')
    }
  },[message,isAuthenticated])
 useEffect(()=>{
    dispatch(getAx())
 },[])
  return (
    <div className='container-section'>
        
        <div className='login-sec'>
     
        <Form className='login' id='form-login' onSubmit={(e)=>{handlerLogin(e)}}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className='tE'>Nama</Form.Label>
                <Form.Control type="text" name='name' required placeholder="Username" />
                {/* <Form.Text  className="text-muted tM">
                Kami Tidak Akan Membagikan Info Alamat Email Anda
                </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='tE'>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
            </Form.Group>
            <Form.Group className="mb-3 tE"  controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" required/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading?true:false}>
                Submit
            </Button>
        </Form>
        </div>
    </div>
  )
}

export default Login