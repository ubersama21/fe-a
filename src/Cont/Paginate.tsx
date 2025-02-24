import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getItem, setPage, } from '../Re/auth/itemsReducers.ts';

function Paginate(){

    const {page,perPage,totalPages,totalItems,
       
    } =useSelector((state:any)=>state.items)
    const dispatch = useDispatch()

    const getIt = async()=>{
        // dispatch(getItem(page,perPage))
        console.log('thuis',page)
        console.log('iam running')
        
    }
    useEffect(()=>{
      getIt()
    },[totalPages,totalItems,page,perPage])
    console.log('aaaa',page)
    const totalpagesi= Array.from({ length: 30 }, (_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPagesii=30; // Misalnya ada 30 halaman
    const range = 5; // Jumlah halaman yang ingin ditampilkan di sekitar halaman aktif dan halaman terakhir
  
    // Fungsi untuk membuat pagination
    const createPagination = () => {
      const visiblePages = [];
  
      // Selalu tampilkan halaman pertama dan terakhir
      visiblePages.push(2);
  
      // Tambahkan halaman-halaman di sekitar halaman aktif
      for (let i = currentPage - range; i <= currentPage + range; i++) {
        if (i > 1 && i < totalPages) {
          visiblePages.push(i);
        }
      }
  
      // Selalu tampilkan halaman terakhir
      if (!visiblePages.includes(totalPagesii )) {
        visiblePages.push(totalPagesii);
      }
  
      // Menambahkan "..." jika ada halaman yang terlewat
      let pagination = [];
      for (let i = 0; i < visiblePages.length; i++) {
        // Menambahkan elipsis jika ada perbedaan yang lebih dari 1 halaman
        if (i > 0 && visiblePages[i] !== visiblePages[i - 1] + 1) {
          pagination.push("...");
        }
        pagination.push(visiblePages[i]);
      }
  
      return pagination;
    };
  return (
    <div>
        <div>
         {createPagination().map((item, index) => (
          <Button
            key={index}
            onClick={() => {
              if (item !== "...") {
                setCurrentPage(item);
              }
            }}
            disabled={item === "..."}
          >
            {item}
          </Button>
        ))}
        </div>
    </div>
  )
}

export default Paginate