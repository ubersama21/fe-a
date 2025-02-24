import React, { useEffect, useState } from 'react'
import './tablesd3.css'
import * as d3 from 'd3'


function TablesD3({dx,head,str,end}) {

const [dtx,setDtx] = useState(null)
const [focus,setFocus] = useState(null)
// const [isClick,setIsClick] = useState(false)
let svg
const handlerFocus = async(e,x)=>{
    if(x===focus){
       const tooltip = await d3.select('body').selectAll('.toolt')
       tooltip.remove();
       return setFocus(null)
    }
    setFocus(x)
    
}
const getRP = (x)=>{
    return new Intl.NumberFormat('id-ID',{
        style:'currency',
        currency:'IDR',
        minimumFractionDigits: 0,  
        maximumFractionDigits: 0   
    }).format(x)
    
}

const getDx = async()=>{
    
    d3.select('#svgs').selectAll('*').remove();
    
    
    const regex = /Penjualan Barang (.*?) jumlah/;
    if(dx !== null ){
        if(dx?.length === 0 )return;
        const xsd = dx.reduce((result, item) => {
            const date = new Date(item.updatedAt).toISOString().split('T')[0]; // This gives a consistent date in YYYY-MM-DD format
            const normalizedNama = item.deskripsi.match(regex) ? item.deskripsi.match(regex)[1].toLowerCase().trim() : '';
            const key = item.brng_id + '-' + date + '-' + normalizedNama; 
          
            if (!result[key]) {
              result[key] = {
                brng_id: item.brng_id,
                date: item.updatedAt,
                nama: normalizedNama,
                totalAmount: parseInt(item.amount),
                totalJml: parseInt(item.jml_terjual),
                updatedAt: item.updatedAt,
              };
            }else{
                result[key].totalAmount += parseInt(item.amount);
                result[key].totalJml += parseInt(item.jml_terjual);
            }
          
           
           
          
            return result;
          }, {});
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        
        const data = Object.values(xsd).map((data,i)=>({
            nama:data.nama,
            date: new Date(data.updatedAt),
            amount:data.totalAmount,
            brngId:data.brng_id,
            terjual:data.totalJml,
            color:colorScale(data.nama)
          }))
        const maxAmount = d3.max(data, (d) => d.amount);
        setDtx(data)
      
        const svgContainer = document.getElementById('svgs');
        if(svgContainer){
            const contWidth = svgContainer.offsetWidth; 
            const contHeight = svgContainer.offsetHeight; 
             svg = d3.select('#svgs')
            .append('svg')
            .attr('id','svgc')
            .attr('class','svgc')
            .attr('width', contWidth)
            .attr('height', contHeight);
            const x = d3.scaleTime()
                .domain([new Date(str), new Date(end)])
                .range([0, contWidth-150]);
            svg.append('g')
                    .attr('transform', `translate(70,${contHeight - 30})`)
                    .attr('class','x-axis')
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeDay.every(3)) 
                        .tickFormat(d3.timeFormat('%d'))
                    );
            const y = d3.scaleLinear()
                    .domain([0, maxAmount * 1.1])  
                    .range([contHeight - 30, 10]);
            const yAxis = d3.axisLeft(y)
                          .tickFormat(d3.format(",.0f"));
            svg.append('g')
            .attr('transform', 'translate(70, 0)') 
            .call(yAxis);
            const toolt = d3.select('body')
            .append('div')
                .style('position', 'absolute')
                .attr('class','toolt')
                .style('padding', '8px')
                .style('background-color', 'rgba(0,0,0,0.7)')
                .style('color', 'white')
                .style('border','2px solid white')
                .style('border-radius', '4px')
                .style('visibility', 'hidden') 
                .style('pointer-events', 'none')
                .style('top',0)
                .style('font-size','0.5em');
            const circles = svg.selectAll('.circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class',d=>'circle'+d.nama)
            .attr('cx', d => x(d.date)) 
            .attr('cy', d => y(d.amount)) 
            .attr('r', d=>d.nama === focus ? 6:4) 
            .attr('fill', d=> d.color) 
            .attr('stroke', d=>d.color)
            .attr('transform','translate(61,0)')
            .on('click', function(event, d) { 
                handlerFocus(event, d.nama); 
                const tooltip = d3.select('body').selectAll('.toolt')
                tooltip.transition().duration(200).style('visibility', 'hidden').remove();
                toolt.transition().duration(200).style('visibility', 'visible')
                toolt.html(`Tanggal: ${d3.timeFormat('%d-%m-%Y')(d.date)}<br>Amount: ${getRP(d.amount)} 
                        <br>Nama Barang: ${d.nama} <br>Terjual: ${d.terjual}
                        `);
                        let tooltipX = event.pageX + 5;
                        let tooltipY = event.pageY + 5;
                
                
                        const tooltipWidth = toolt.node().offsetWidth;
                        const tooltipHeight = toolt.node().offsetHeight;
                
                
                        if (tooltipX + tooltipWidth > window.innerWidth) {
                            tooltipX = event.pageX - tooltipWidth ;  
                        }
                
                        
                        if (tooltipY + tooltipHeight > window.innerHeight) {
                            tooltipY = event.pageY - tooltipHeight+50;  
                        }
                
                   
                        toolt.style('left', `${tooltipX+8}px`)
                            .style('top', `${tooltipY}px`);
            })
            .attr('stroke-width', 1)
                .each(function(d) {
                
                        if (d.nama === focus) {
                            d3.select(this).raise();
                            
                        } else {
                          
                            d3.select(this).lower();
                        }
            }).on('mouseover', function(event, d) {
                d3.select(this)
                .attr('r',6)
                const tooltip = d3.select('body').selectAll('.toolt')
                tooltip.transition().duration(200).style('visibility', 'hidden').remove();
                toolt.transition().duration(200).style('visibility', 'visible')
                toolt.html(`Tanggal: ${d3.timeFormat('%d-%m-%Y')(d.date)}<br>Amount: ${getRP(d.amount)} 
                        <br>Nama Barang: ${d.nama} <br>Terjual: ${d.terjual}
                        `);
                        let tooltipX = event.pageX + 5;
                        let tooltipY = event.pageY + 5;
                
                
                        const tooltipWidth = toolt.node().offsetWidth;
                        const tooltipHeight = toolt.node().offsetHeight;
                
                
                        if (tooltipX + tooltipWidth > window.innerWidth) {
                            tooltipX = event.pageX - tooltipWidth;  
                        }
                
                        
                        if (tooltipY + tooltipHeight > window.innerHeight) {
                            tooltipY = event.pageY - tooltipHeight + 50;  
                        }
                
                   
                        toolt.style('left', `${tooltipX+8}px`)
                            .style('top', `${tooltipY}px`);
               
            })
            .on('mouseout',function(event,d){
                d3.select(this)
                .attr('r',d=>d.nama === focus?6:4)
                toolt.transition().duration(200).style('visibility', 'hidden');
                     
                
            })
           
            const line2 = d3.line()
            .x(d => x(d.date)) 
            .y(d => y(d.amount)); 
            const cleanedData = data.filter(d => d.brngId); // Ensure `nama` is not null or undefined

            const groupedData = d3.group(cleanedData, d => d.brngId);
         

             
 
 

    
            groupedData.forEach((nama, values) => {
            
            svg.append('path')
             .attr('transform',`translate(61, 0)`)
             .lower()
            .data([nama]) 
            .attr('d', line2) 
            .attr('fill', 'none') 
            .attr('stroke', nama[0].color) 
            .attr('stroke-width', nama[0].nama === focus ? 4:2) // Set line width
            .attr('class', 'line-' + nama[0].nama);
             });
            

           
        }


    }


}
useEffect(()=>{
      
    getDx()
    Xsrs()
},[dx,focus])
const Xsrs = async()=>{
    const a = await document.getElementById('svgc')
    if(a){
     a.addEventListener('click',(e)=>{
      
      if(e.target === a){
        d3.select('body').selectAll('.toolt').remove()
        setFocus(null)
      }
     })
        
    }
}
useEffect(()=>{
    d3.select('body').selectAll('toolt').remove()
},[])
 return (
    <div className='section-d3'>
         {
            (   dx?.length !== 0 && dx)  &&  (
                
                <div  
                className='cont-d3'
                >
                <h3>{head}</h3>
                <div className='cont-svg'>
                    <div className='svg-cont'  id='svgs' >
                        </div>
                    <div className='cont-brng'>
                      <h6 className='head-contbrng'> Nama Barang :</h6>
                      <div className='brng-cont'>
                        {dtx && [...new Set(dtx.map(d => d.nama))].map((nama, i) =>{
                            return(
                                <p className={`items-nm ${focus===nama?'active':''}`} key={nama+i}
                                onClick={(e)=>{handlerFocus(e,nama)}}
                                >{nama}</p>
                            )
                        })}
                      </div>
                    
                     </div>
                 
               
                </div>
               
             </div>

            )
        }
    </div>
  )
}

export default TablesD3