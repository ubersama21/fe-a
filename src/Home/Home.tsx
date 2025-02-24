import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAx } from '../Re/auth/userReducer.ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, Placeholder } from 'react-bootstrap'
import Forms from '../Form/Forms.tsx'
import './home.css'
import { admxData, FormBrng, } from '../Form/Dx.ts';
import { addItems, getItem, setPage } from '../Re/auth/itemsReducers.ts'
import Items from '../Cont/Items.tsx'
import Paginate from '../Cont/Paginate.tsx'
import { array } from 'joi'
import LoadItems from '../Cont/LoadItems.tsx'
import { addTRXX } from '../Re/auth/admxReducers.ts'
import Forms_trx from '../Form/Forms_trx.tsx'
import SubTable from './SubTable.tsx'
import SubTabled3 from './SubTabled3.tsx'
import axios from 'axios'
import { getHead } from '../AZ/Jxd.ts'
import LoadingPages from '../Cont/LoadingPages.tsx'


function Home() {

  const [hideAdd,setHideAdd] = useState(false)
  const [show,setShow] = useState(false)
  const [show2,setShow2] = useState(false)
  const [date,setDate] = useState(null)
  const [itemStat,setItemStat] = useState({})
  const [items,setItems] = useState([])
  const [headTB,setHeadTB] = useState([])
  const [pageLoad,setPageLoad] = useState(true)
  
  const showCont = async()=>{
    setShow(true)
  }
  const showCont2 = async()=>{
    setShow2(true)
  }

  const getIt = async()=>{
    setPageLoad(true)
    const date = new Date()
    setDate(date)
    try {
      const dt = await axios.get('https://ush-api.vercel.app/trans/alls')
      setItemStat(dt.data)
    } catch (error) {
      return toast.error('Tidak Dapat Terhubung ke database',{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    setHideAdd(false)
  }
const getB = async()=>{
  setPageLoad(true)

  try {
    const dt = await axios.get('https://ush-api.vercel.app/trans/allb')
    const head = await getHead(dt.data.brng.map((d,i)=>({
      id: d.id,
      nama: d.nama,
      status: d.status,
      jumlah: d.satuan_jml,
      details:'',
    })))
    setHeadTB(head)
    setItems(dt.data.brng)
    setPageLoad(false)
  } catch (error) {
    return toast.error('Gagal mendapatkan data barang',{
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }
}
  useEffect(()=>{
  
    getIt()
    getB()
   
  },[show])

  const handlerD3 = async(e)=>{
    e.preventDefault()
    setDate(new Date(e.target.value))
  }


 



  return (

    <>
    {pageLoad?<LoadingPages/>:''}
   
    <div className='home-sec'
      
    >
        <div>
  
        <div className='btn-addSec'>
          <button className={`btn-addss ${hideAdd?'active':'hide'}`}
           onClick={()=>{setHideAdd((prevHide) => !prevHide)}}
          >
            <p className='addbtn'>&#x2B;</p>
            </button>
          <div className={`btn-addCont ${hideAdd?'active':'hide'}`}>
            <Button onClick={showCont} className='btn-addsss btn-reg'>Tambah Barang</Button>
            <Button onClick={showCont2} className='btn-addsss btn-reg'>Tambah Pengeluaran</Button>
          </div>
          
        </div>
      </div>
      <div>
        <Forms   show={show} setShow={setShow} title={'Tambah Barang'} dx={FormBrng}
          action={addItems}
        />
         <Forms_trx   show={show2} setShow={setShow2} title={'Tambah ADM'} dx={admxData} 
          action={addTRXX}
        />
      
      </div>
      <div>
        
      </div>
      <div className='sec-panel'>
        <div className='cont-panel'>
          <div className='panel1'>
            <div className='total-prod'>
              <h3>{itemStat && itemStat.totalBrng ? itemStat.totalBrng : '0'} / Total Produk</h3>
            </div>
            <div className='total-stock'>
              <h3>{itemStat && itemStat.totjml ? itemStat.totjml : '0'}  / Total Stock</h3>
            </div>
          </div>
          <div className='panel2'>
            <div className='prod-db'>
                <h3 className='tagstats'>Status Database</h3>
                <div className='stats-cont'>
                  <div className='stats'>
                    <h4>Mongo:</h4>
                    <h3 className={`tag ${itemStat && itemStat.stats1 === 'Active'? 'active':'nonactive'}`}>{itemStat && itemStat.stats1 ? itemStat.stats1 : 'Non Active'}</h3>
                  </div>
                  <div className='stats'>
                  <h4>Postgree:</h4>
                  <h3 className={`tag ${itemStat && itemStat.stats2 === 'Active'? 'active':'nonactive'}`}>{itemStat && itemStat.stats2 ? itemStat.stats2 : 'Non Active'}</h3>
                  </div>
                 
                </div>
            </div>
          </div>
          <div className='cont-panel2'>
            <div className='stats-prod'>
              <h3 className='head-sub'>Status Produk</h3>
              <div className='table-stats'>
                 <SubTable headT={'Barang Tersedia'} headTB={headTB}
                 tdStsTB={items.filter((x) => x?.status === 'Tersedia')}

                 />
              </div>
              <div className='table-stats'>
                 <SubTable headT={'Barang Habis'} headTB={headTB}
                  tdStsTB={items.filter((x) => x?.status !== 'Tersedia')}
                 />
              </div>
            </div>
            <div className='stats-penj'>
              <h3 className='head-sub'>Status Penjualan</h3>
              <div>
                <input
                className='intime'
                type='date' defaultValue={date?.toISOString().split('T')[0]}
                onChange={(e)=>{handlerD3(e)}}
                />
              </div>
              <div>
                <div className='d3-sec'>
                  <SubTabled3 start={date} />
                </div>
                
              </div>
             
             
            </div>
          </div>
       </div>
        
       
      </div>
      
    </div>
    </>
  )
}

export default Home