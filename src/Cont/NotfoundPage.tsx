import React, { useEffect, useState } from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom'
function NotfoundPage() {
     const [c,setC] = useState(10)
     const navs = useNavigate()
     const countdownInterval = 1000; 
    useEffect(()=>{
        if (c > 0) {
            const timer = setInterval(() => {
                setC((prevC) => prevC - 1); // Decrease c by 1 every second
            }, countdownInterval);

            // Cleanup the interval on component unmount or when countdown ends
            return () => clearInterval(timer);
            } else {
            
            navs('/'); 
            }
    },[c,navs])
  return (
    <div className='nf-section'>
        <div className='nf-cont'>
            <img className='image-nf' src='./icons/404.png' />
            <h1 className='tag-nf-head'>Maaf Page Belum tersedia</h1>
            <p>Kembali ke Home : <span className='redirect-c'>{c}</span></p>
        </div>
    </div>
  )
}

export default NotfoundPage