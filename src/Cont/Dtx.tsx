import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { _CnxD, Dxdt, Nxdt } from '../AZ/Jxd.ts'
import { useDispatch, useSelector } from 'react-redux'
import { addItems, addPNJ, delBrngId, gItemId } from '../Re/auth/itemsReducers.ts'
import './dtx.css'
import { Button, Carousel } from 'react-bootstrap'
import Forms from '../Form/Forms.tsx'
import Forms_Penj from '../Form/Forms_Penj.tsx'
import FormDel from '../Form/FormDel.tsx'
import { getRP } from '../TRX/Table.tsx'


function Dtx() {

    const {d} = useParams()
    const {itemsD,loadingItems} = useSelector((state:any)=>state.items)
    const [showC,setShowC] = useState(false)
    const [showE,setShowE] = useState(false)
    const [showD,setShowD] = useState(false)
    const [dx,setDx] = useState([])
    const dispatch = useDispatch()
  
    const ge = async()=>{
        
        const z = await Nxdt(d)
        dispatch(gItemId({z}))
   
    }
    const conv = async()=>{
      if(itemsD!==null){
        const xs = await  _CnxD({ 
           namab:itemsD.nama,
           brng_id:itemsD.id,
           jenis:itemsD.jenis,
           desk:itemsD.deskripsi,
           status:itemsD.status,
           jml:itemsD.satuan_jml,
           berat:itemsD.satuan_berat,
           tpjml:itemsD.type_jml,
           tpbrt:itemsD.type_brt,
           harga:itemsD.harga
         })
         if(xs.length>0){
           setDx(xs)
         }
       }
    }
    useEffect(()=>{
       ge()
       conv()
       
    },[d,showE,showC])

  return (
    <div className='det'>
       
        {itemsD !== null&&
          (
            <div className='det-cont' key={itemsD.nama}>
              <div className='cont-img'>
                <Carousel className='car-container' slide={true}>
              
                {itemsD.gambar.map((data,i)=>{
                  return(
                    <Carousel.Item key={data.nama + i.toString()}>
                      <img
                        className=" img-brng"
                        src={data.url}
                        alt={data.nama}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;  // Cast to HTMLImageElement
                          target.src = '/icons/logowe.png'; // Fallback image
                        }}
                      />
                    </Carousel.Item>
                    
                  )
                })}
             
                
              </Carousel>
              </div>
          
              <div className='item-d'>
                <h1>{itemsD.nama}</h1>
                <p>Harga: <span className='harga-brng'>{getRP(itemsD?.harga) || 'belum ada'}</span></p>
                <p>Status: <span className={`status ${itemsD.status === 'Habis'? 'habis':'ada'}`}>{itemsD.status}</span> </p>
                <p>Jumlah : {itemsD.satuan_jml} {itemsD.type_jml}</p>
                <p>Berat : {itemsD.satuan_berat} {itemsD.type_brt}</p>
                <p>Deskripsi: </p>
                <div className='cont-desk'>
                  <p>{itemsD.deskripsi}</p>
                </div>
              </div>
            </div>
          )
        }
        {itemsD && console.log(itemsD)}
        {
        itemsD !== null &&
           <div className='btn-det'>
                <Button variant='success' onClick={()=>{setShowE(true);setShowC(false);setShowD(false)}}
                   disabled={showC||showD||showE}
                  >Edit</Button>
                <Button variant='success' 
                 onClick={()=>{setShowE(false);setShowC(true);setShowD(false)}}
                 disabled={showC||showD||showE||itemsD.status === 'Habis'}
                 >Terjual</Button>
                <Button variant="danger" 
                 disabled={showC||showD||showE}
                 onClick={()=>{setShowE(false);setShowC(false);setShowD(true)}}
                >Hapus</Button>
              </div>
         }
        <div>
        {/* <Forms_e showE={showE} setShowE={setShowE} dxe={items} title={'EDIT DATA'} /> */}
        <Forms action={addItems} show={showE} setShow={setShowE} dx={dx}
          imgx = {itemsD?.gambar}
          title={'EDIT DATA BARANG'} 
          btnN={'Edit Barang'}
          imx={true}
        />
        <Forms_Penj show={showC} setShow={setShowC}
          itx={itemsD} act={addPNJ}
        />
        <FormDel
         show={showD}
         setShow={setShowD}
         action = {delBrngId}
         it={itemsD}
        />
       
        </div>
    </div>
  )
}

export default Dtx