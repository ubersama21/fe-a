import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route, useNavigate, Navigate,} from 'react-router-dom'
import Login from './Login/Login.tsx';
import Home from './Home/Home.tsx';
import {ToastContainer} from 'react-toastify' 
import Dtx from './Cont/Dtx.tsx';
import AdmxTSX from './TRX/Admin.tsx';
import NavBar from './Navbars/NavBar.tsx';
import ItemsC from './Items/ItemsC.tsx';
import LoadingPages from './Cont/LoadingPages.tsx';
import ScrollToTop from './Cont/ScrollToTop.ts';
import AuthRoute from './AuthR/AuthRoute.tsx';
import NotfoundPage from './Cont/NotfoundPage.tsx';
// import 'react-toastify/dist/ReactToastify.css';
function App() {
  const nav = useNavigate()


 
  return (
    <>
      <ScrollToTop/>
      <NavBar/>
      <Routes>
         <Route path="/" element={<Navigate to="/home" replace />} />
        <Route  path='/home' element={<AuthRoute><Home/></AuthRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/items" element={<AuthRoute><ItemsC/></AuthRoute>}/>
        <Route path="/items/de/:d" element={<AuthRoute><Dtx/></AuthRoute>}/>  
        <Route path='/adm' element={<AuthRoute><AdmxTSX/></AuthRoute>}/>
        <Route path='*'  element={<NotfoundPage/>} />
      </Routes>
   
    <ToastContainer/>
    </>
   
  );
}

export default App;
