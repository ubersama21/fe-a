import { Button, Table } from "react-bootstrap"
import './subtable.css'
import { useEffect } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Dxdt } from "../AZ/Jxd.ts"

function SubTable ({headT,headTB,tdTB,selected,handler,tdStsTB}){

    const nav = useNavigate()
    const goDet = async(x)=>{
      
        const xs = await Dxdt(x)
          nav(`/items/de/${xs}`)

    }

    return(
        <Table  hover className="subs-table">
        <thead >
            <tr className="headtag">
                <th colSpan={headTB?.length >0 ? headTB.length :6} className="head-t">{headT || "No Heading Table"}</th>
            </tr>
          <tr className="heading-subtable">
            {/* <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th> */}
            {
              headTB && headTB.length>0?
              headTB.map((d,i)=>{
                return(
                  <th key={i} hidden={d.name==='id'}>{d.name}</th>
                )
              }):
              <th colSpan={6} className="span-none">Tidak Ada Data</th>
            }
          </tr>
        </thead>
        <tbody>
          {tdTB && tdTB.length>0?
            tdTB.map((x,i)=>{
              return(
               <tr key={x.nama+i} onClick={(e)=>{ selected && handler(x.nama)}}   
               >
                <td>{i+1}</td>
                <td>{x.nama}</td>
                <td>{new Date(x.time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',hour12: false})}</td>
                <td>{x.amount}</td>
                <td>{x.jml}</td>
              </tr>    
              )
            }):
            ""
          }
          {tdStsTB && tdStsTB.length>0?
           tdStsTB.map((x,i)=>{
            return(
             <tr key={x.nama+i}  
             >
              <td>{i+1}</td>
              <td>{x.nama}</td>
              <td>{x.status}</td>
              <td>{x.satuan_jml}</td>
              <td><Button
               onClick={(e)=>{goDet(x.id)}}
              >Details</Button></td>
            </tr>    
            )
          }):
          ""
        
          }
        </tbody>
      </Table>
    )
}

export default SubTable