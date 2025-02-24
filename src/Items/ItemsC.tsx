import { useDispatch, useSelector } from "react-redux";
import LoadItems from "../Cont/LoadItems.tsx";
import Items from "../Cont/Items.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { getIbyName, getItem } from "../Re/auth/itemsReducers.ts";
import './itemsc.css'
import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import boximg from './box.png';

function ItemsC (){
    const {items,messageItems,page,perPage,loadingItems,nextPage,itemsSearch} = useSelector((state:any)=>state.items)
    const dispatch = useDispatch()
    const [barang,setBarang] = useState([])
    const [searchN,setSearchN] = useState('')
    const [nBarang, setNBarang] = useState([])
    const [loadNew,setLoadNew] = useState(false)

    useEffect(()=>{
      getItems(searchN)
    },[])
    const getFirst = async()=>{
      await getItemF()
      
      console.log('selesai...')
    }
    const getItemF = async()=>{
       dispatch(getItem({pageN:page})).then((data)=>{
        setBarang(data?.payload.brng)
        setLoadNew(false)
        window.scrollTo(0, 0, { behavior: 'smooth' });

       })
     
      
    }
    const getItems = async(x:string)=>{
      if(x.length>0){
        await dispatch(getIbyName(x)).then((data)=>{
        setBarang(data.payload.brng)
        setLoadNew(false)
        })
        // console.log(barang)
      }else{
        await getItemF()
      }
    }
    useEffect(()=>{
      if(messageItems !== null){
              if(messageItems.type === 'failitemname')
              toast.error(messageItems.msg, {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                });
          }
    },[messageItems])
    const observer = useRef(null)
 
    const isMobile = window.innerWidth <= 800;
    const lastElementRef = useCallback( async(node) => {
      if (loadingItems) return; 
      if (observer.current) await observer?.current?.disconnect(); 
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && nextPage ) {
          setLoadNew(true);
          getNewItems()
          if(isMobile){
            window.scrollTo(0,1200)
          }else{
            window.scrollTo(0,0)
          }
        }
      }, {
        threshold: 1.0 
      });
    
      if (node) await observer?.current.observe(node); 
    }, [loadingItems]);

    const array = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
    const getNewItems = async()=>{
      // console.log('iam running')
      dispatch(getItem({pageN:nextPage}))
      .then((data)=>{
        if(barang && barang.length >= 30){
          const dt = barang.slice(10,30)
          setBarang([...dt,...data.payload.brng])
          setLoadNew(false)
        }else{
          setBarang(barang=>[...barang,...data.payload.brng])
          setLoadNew(false)
        }
       
      })
      // setLoadNew(false)
    }

  
    return(
        <div className="sec-items" >
         <div className="search-sec">
          <div className={`search-cont active}`}>
            <input className="search-items" type="text" max={50} min={1}
             onChange={(e)=>{setSearchN(e.target.value)}}
             value={searchN}
            />
            <Button className="btn-search" 
             disabled={loadingItems && searchN?.length === 0}
             onClick={(e)=>{getItems(searchN)}}
            >Search</Button>
          </div>
            
         </div>
        <div className='cards-cont'>
         {
           barang === null || barang === undefined && !loadingItems &&
           <div className="empty-items">
               <img src={boximg}
                alt="item-box"
                onError={()=>{}}
               />
               <h1>Barang Tidak Ditemukan</h1>
             </div>
         }
         {
           barang && barang.length>0 &&barang.map((data,i)=>{
              if( barang.length >= 10 && barang.length === i+1){
                return( 
                   <Items last={lastElementRef}  dx={data}/>
                )
              }else{
                return(
                  <Items  dx={data}/>
              )
              }
             
            }
          )
         }
         {
          !loadingItems && loadNew && 
          <div className="load-new" >
            <div className="loader3"></div>
            <h3>Loading</h3>
          </div>
         }
           {
            loadingItems && array.map((_d,i)=>{
              return(
                <LoadItems />
              )
            })
          }
        

       </div>
 
       </div>
        
    )
}

export default ItemsC