
import { useEffect, useState } from 'react'
import './subtabled3.css'
import * as d3 from 'd3'
import axios from 'axios'
import { toast } from 'react-toastify'
import SubTable from './SubTable.tsx'
import { getHead } from '../AZ/Jxd.ts'
function SubTabled3 ({start}){


    const [dat,setDat] = useState([])
  

    const getDt = async()=>{
        const d = new Date(start).toISOString().split('T')[0]

        try {
            const dt = await axios.get(`https://ush-api.vercel.app/trans/byd?date=${d}`,{
                withCredentials:true,
                headers:  {
                    "Content-Type":"application/json"
                 },
            })
        
            if(dt.data?.data){
                const regex = /Penjualan Barang (.*?) jumlah/;
                const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
                const data = Object.values(dt.data.data).map((data,i)=>{
                     const date = new Date(data.updatedAt)
                    //  const time = formatter.format(date)
                     const nama = data.deskripsi.match(regex) ? data.deskripsi.match(regex)[1].toLowerCase().trim() : '';
     
                     return{
                         nama:nama,
                         time:data.updatedAt,
                         amount:data.amount,
                         jml:data.jml_terjual,
                         color:colorScale(nama)
                     }
                   })
          
              setDat(data)
            }else{
                setDat([])
            }
        } catch (error) {
            return toast.error('Tidak Dapat Terhubung ke database',{
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
              });
        }     
        
    }


  
      
    const D3table = async()=>{
       
        d3.select('#svgtb').selectAll('*').remove();
        const svgContainer = document.getElementById('svgtb');
        if(svgContainer){
            const contWidth = svgContainer.offsetWidth; 
            const contHeight = svgContainer.offsetHeight;
            const  svg = d3.select('#svgtb')
            .append('svg')
            .attr('id','svgctb')
            .attr('class','svgctb')
            .attr('width', contWidth)
            .attr('height', contHeight);
      
            const startOfDay = new Date(start).setHours(0,0,0,0)
            const endOfDay = new Date(startOfDay).setHours(23,59,0,0)
         
            const  x = d3.scaleTime()
                       .domain([startOfDay,endOfDay])
                       .range([0, contWidth - 150]);
         
           
             svg.append('g')
                .attr('transform', `translate(70,${contHeight - 30})`)
                .attr('class','x-axis')
                .call(d3.axisBottom(x)
                .ticks(d3.timeHour.every(3)) 
                .tickFormat(d3.timeFormat('%H'))
                );
             const  y = d3.scaleLinear()
                        .domain([0, 500000 * 1.1])  
                        .range([contHeight - 30, 10]);
              const yAxis = d3.axisLeft(y)
                            .tickFormat(d3.format(",.0f"));
              svg.append('g')
                 .attr('transform', 'translate(70, 0)') 
                 .call(yAxis);
   
                      
                      
          
          
            return {svg,x,y}
        
    
    }
}
    const [focus,setFocus] = useState(null)

    const handlerFoc = async(x)=>{
         if(x===focus){
               const tooltip = await d3.select('body').selectAll('.toolt')
               tooltip.remove();
               return setFocus(null)
            }
            setFocus(x)
    }
    const updateChart = async()=>{
        const {svg,x,y} = await D3table()
        if(dat.length>0){
            svg.selectAll('.circle')
             
             .data(dat)
             .enter()
             .append('circle') 
             .attr('class', d=>'circletb'+d.nama)
             .attr('cx', (d)=>{
                 return x(new Date(d.time))
             })
             .attr('cy', d => y(d.amount)) 
             .attr('r', d=>d.nama === focus?6:4) 
             .attr('fill', d => d.color) 
             .attr('stroke', d => d.color) 
             .attr('stroke-width', 1)
             .attr('transform', 'translate(70, 0)')
             .on('click',(e,d)=>{
                handlerFoc(d.nama)
             })
             .each(function(d) {
                             
                                     if (d.nama === focus) {
                                         d3.select(this).raise();
                                         
                                     } else {
                                       
                                         d3.select(this).lower();
                                     }
            })
            //  .style('transform','translateX(13px)');
         }
        }
        
    

    useEffect(()=>{
        getDt()
        D3table()
    },[start,])

    const [headTB,setHeadTB] = useState([])
    const [tableTD,setTableTD] = useState([])
    const getDtTb = async()=>{
        if(dat.length>0){
            const head = await getHead(dat)
            setHeadTB(head)
            const dtb = await dat.map((x)=>{
                const {color, ...res } = x
                return res
            })
            setTableTD(dtb)
        }
        else{
            setHeadTB([])
            setTableTD([])
        }
    }
    useEffect(()=>{
      
        updateChart()
        getDtTb()
    },[dat,focus])
   
    return(
        <div className="d3-cont">
            <div className='svg-cont-subtable' id='svgtb'/>
            <div className='brng-nm'>
                <SubTable headT={'Barang'} headTB={headTB} tdTB={tableTD}
                  selected={true}
                  
                  handler = {handlerFoc}
                />
            </div>
        </div>
    )
}


export default SubTabled3