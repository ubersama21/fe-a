import { useEffect, useState } from 'react';
import './navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { loginUsers, logoutUser } from '../Re/auth/userReducer.ts';
import { toast } from 'react-toastify';


function NavBar (){

  const [activeIndex, setActiveIndex] = useState(0);
  const nav = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const secNav = [
    '/home',
    '/items',
    '/adm',
    '/cart'
  ]
  useEffect(() => {
    const currentPath = location.pathname;
    const index = secNav.findIndex(path => currentPath.startsWith(path));
    if (index !== -1) {
      setActiveIndex(index); // Update activeIndex berdasarkan path
    }
  }, [location]);
  const ChangeAct = (index) => {
    setActiveIndex(index);
    nav(secNav[index])
  };
  const { user, loading, message } = useSelector((state:any) => state.auth);
  const logoutUs = async()=>{
    dispatch(logoutUser())
    .then((res)=>{
        console.log(res)
    })

  }

 useEffect(()=>{
    if(message){
        if(message.type === "successlogout"){
            toast.success(message.msg.toString(),{
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
        }
        if(message.type === "faillogout"){
            toast.error(message.msg.toString(),{
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
        }
    }
 },[])
    return(
        <div className="sec-navbar">
            <div className="nav-cont">
                <div className="dev1" >
                  <img  src='/icons/logowe.png'
                   className='img-logo'
                  />
                  <div className='menu-cont1'>
                  <h5
                        className={`tag ${activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => ChangeAct(0)} 
                    >
                        Home
                    </h5>
                    <h5
                        className={`tag ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => ChangeAct(1)} 
                    >
                        Items
                    </h5>
                    <h5
                        className={`tag ${activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => ChangeAct(2)} 
                    >
                        Admin
                    </h5>
                    <h5
                        className={`tag ${activeIndex === 3 ? 'active' : ''}`}
                        onClick={() => ChangeAct(3)} 
                    >
                        Keranjang
                    </h5>
                    
                    {user&&
                     <div className='display-name' >
                         <Dropdown >
                            <Dropdown.Toggle className='btn-user' variant="success" id="dropdown-basic">
                            {<h4>{user.name}</h4>}
                            <img className='user-logo' src='/icons/user.png'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e)=>{logoutUs()}}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                       
                     </div>
                    }
                    
                </div>
                </div>
                <div className="dev2">
              
                    <div className='dev2-cont'>
                    <span 
                        className={`span-img ${activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => ChangeAct(0)}
                    >
                        <img className="img-nav" src="/icons/x.png" alt="Home" />
                    </span>
                    <span 
                        className={`span-img ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => ChangeAct(1)}
                    >
                        <img className="img-nav" src="/icons/box.png" alt="Items" />
                    </span>
                    <span 
                        className={`span-img ${activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => ChangeAct(2)}
                    >
                        <img className="img-nav" src="/icons/adm.png" alt="Admin" />
                    </span>
                    <span 
                        className={`span-img ${activeIndex === 3 ? 'active' : ''}`}
                        onClick={() => ChangeAct(3)}
                    >
                        <img className="img-nav" src="/icons/cart2.jpg" alt="Admin" />
                    </span>
                    {user&&
                     <div className='display-name2' >
                         <Dropdown >
                            <Dropdown.Toggle className='btn-user2' variant="success" id="dropdown-basic">
                            <img className='user-logo' src='/icons/user.png'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e)=>{logoutUs()}}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                       
                     </div>
                    }
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
