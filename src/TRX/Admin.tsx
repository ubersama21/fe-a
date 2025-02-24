
import { Button, Form, Table } from 'react-bootstrap'
import './admin.css'
import { Madmx } from '../Form/Dx.ts'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getTRXX } from '../Re/auth/admxReducers.ts'
import TableAdmx from './Table.tsx'
import TablesD3 from './TablesD3.tsx'



function AdmxTSX (){
    const [start,setStart] = useState(null)
    const [end,setEnd] = useState(null)
    const dispatch = useDispatch()
    const {admx,loadingAdmx} = useSelector((state)=>state.admx)
    const [peng,setPeng] = useState(null)
    const [pend,setPend] = useState(null)
    const getDate = async()=>{
        const dateToday = new Date()
        const year = dateToday.getFullYear();
        const month = dateToday.getMonth(); // Bulan sekarang (0-11)

     
      const startDate = new Date(year, month, 2);
      setStart(startDate.toISOString().split('T')[0]);

      
      const lastDate = new Date(year, month + 1, 1);
      setEnd(lastDate.toISOString().split('T')[0]);
 
    }
    const changeStrDate = async(e)=>{
        setStart(e)
    }
    const changeEndDate = async(e)=>{
        setEnd(e)
    }
    const Validty = async()=>{
       
        const startDate = new Date(start);
        const endDate = new Date(end);

  
        if (endDate <= startDate) {
           
            return toast.warning('Tanggal akhir harus lebih besar dari tanggal mulai!',{
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });  
        }
        const diffTime = Math.abs(endDate - startDate); // Menghitung selisih waktu dalam milidetik
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Mengonversi milidetik ke hari
      
        // Mengecek apakah selisih hari antara start dan end berada dalam rentang 5 hingga 30 hari
        if (diffDays < 5) {
          console.log('Rentang tanggal minimal 5 hari.');
          return toast.warning('Rentang tanggal minimal 5 hari.',{
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });  ;  
        }
      
        if (diffDays > 30) {
          console.log('Rentang tanggal maksimal 30 hari.');
          return toast.warning('Rentang tanggal maksimal 30 hari.',{
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });   
        }
    
        dispatch(getTRXX({start,end}))
       
    }
    useEffect(()=>{ 
        getDate()
        if(start !== null && end !==null){
            Validty()
        }
       
    },[])
    const Filtered = async()=>{
      
        if(admx !== null){
            const ax = await admx.data.filter((da,i)=>da.category === 'Pengeluaran')
            setPeng(ax)
            const as = await admx.data.filter((da,i)=>da.category === 'Pendapatan')
            setPend(as)
           
        }
        
    }
   useEffect(()=>{
    Filtered()
   },[admx])
    return (
        <div className='section-admx' id='admx'>

            <div className='cont-fil'>
             <Form id='filtD'>
                  <Form.Group   className="mb-3" controlId={`formBasicM`}>
                    <Form.Label className='fbi'>Start :</Form.Label>
                    <Form.Control  onChange={(e)=>{changeStrDate(e.target.value)}}
                     name='start' type='date'
                     defaultValue={start}
                    >
                   
                    </Form.Control>
                   
                  </Form.Group>
                  <Form.Group   className="mb-3" controlId={`formBasicM`}>
                    <Form.Label className='fbi'>End :</Form.Label>
                    <Form.Control onChange={(e)=>{changeEndDate(e.target.value)}}
                     name='end' type='date'
                     defaultValue={end}
                    >
                   
                    </Form.Control>
                   
                  </Form.Group>
                  
             </Form>
             <Button 
              onClick={Validty}
              disabled={loadingAdmx}
             >Check</Button>
            </div>
            <div> 
                <TableAdmx dx = {peng} head="Data Pengeluaran" act1={Validty}/>
                <TableAdmx dx = {pend} head="Data Pendapatan" act1={Validty}/>
               
             
                <TablesD3 dx={pend} head={'Data Pendapatan'} str={start} end={end} />
            </div>
            
        </div>
    )
}

export default AdmxTSX