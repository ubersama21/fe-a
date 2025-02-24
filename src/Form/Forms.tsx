import React, { useCallback, useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import './forms.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Forms({title,dx,show,setShow,action,btnN,imgx,}) {


  const {messageItems,loadingItems} = useSelector((state)=>state.items)
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewImg,setPreviewImg] = useState([])
  const [dImg,setDImg] = useState([])

  const hideCont = async()=>{
    setShow(false)

  }
  const dispatch =  useDispatch()
  const Xzs = async(e)=>{
    e.preventDefault()
    const xel = await document.getElementById('frmbrng') as HTMLFormElement;
   
    const data = new FormData(xel)
    if(dImg?.length>0){
      dImg.forEach((id)=>{
        data.append('delimg_id',id)
      })
      
    }
   
 
    try {
      dispatch(action(data))
      
    } catch (error) {
    
      return;
    }
  
  }

  const checkImg = async()=>{
 
    if(imgx&&imgx.length>0){
      setPreviewImg(imgx)
      
    }
  }
  useEffect(()=>{
      checkImg()
  },[show])
    useEffect(()=>{
      if(messageItems !== null){
        
          if(messageItems.type === 'failadd'){
           toast.error(messageItems.msg.toString(), {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
            });
          }
          if(messageItems.type === 'successadd'){
           toast.success(messageItems.msg.toString(),{
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
          })
          const xel = document.getElementById('fmbrg') as HTMLFormElement;
          if(xel) xel.reset()
          setFiles([])
          setPreviewUrls([])
          setPreviewImg([])
          setDImg([])
          setShow(false)
        }
      }
     

    },[messageItems])
  
  

    const handleFileChange = (e) => {
      const selectedFiles = e.target.files;
      if (selectedFiles.length + files.length + previewImg.length> 5) {
        alert("Anda hanya bisa memilih maksimal 5 file.");
        return;
      }
    
      // Mengecek setiap file agar tidak lebih dari 3MB
      const maxSize = 3 * 1024 * 1024; // 3MB dalam byte
      const validFiles = [];
      const invalidFiles = [];
    
      Array.from(selectedFiles).forEach((file) => {
        if (file.size <= maxSize) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      });
    
      // Jika ada file yang melebihi 3MB, beri peringatan
      if (invalidFiles.length > 0) {
        alert("Beberapa file melebihi batas ukuran 3MB dan tidak akan ditambahkan.");
      }
    
      // Jika file yang valid ada, tambahkan ke dalam state
      if (validFiles.length > 0) {
        const newFiles = validFiles;
        setFiles([...files, ...newFiles]);
    
        // Membuat pratinjau gambar untuk file yang valid
        const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
      }
    };
  
    // Fungsi untuk menghapus file yang sudah dipilih
    const handleRemoveFile = (index) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      setPreviewUrls(updatedPreviewUrls);
    };
    const handImgRF = (dz) =>{
      const up = previewImg.filter((x,i)=>x.id !== dz)
      setPreviewImg(up)
      setDImg(d=>[...d,dz])
      
    }
  return (
    <>
  
 
      <div key={title}         className={`formR-sec ${show?'showF':'hideF'}`}>
    
      <div className='formR-cont'>
        <div className='btnH-cont'>
         <Button onClick={hideCont} 
          disabled={loadingItems?true:false}
         className='btn-hide'></Button>
        </div>
      
        <div >
          <h2 className='textR-head'>{title}</h2>
        </div>
        <div>
          <Form id={'frmbrng'} onSubmit={(e)=>{Xzs(e)}}>
            {
              dx && dx.map((x,i)=>{
                
                if(x.type === 'text' && x.nama === 'desk' || x.nama === 'deskripsi'){
                  return(
                  <Form.Group key={x.nama+i} className="mb-3" controlId={`formBasic${x.nama}`}>
                    <Form.Label className='fbi'>{x.label}</Form.Label>
                    <Form.Control
                    defaultValue={x.val?x.val:""}
                    type={x.type} as='textarea' name={x.nama} required placeholder={x.placeholder} 
                
                    />       
                  </Form.Group>
                  )
                  
                }
                if(x.type === 'options'){
                  return (
                    <Form.Group key={x.nama + i} className="mb-3" controlId={`formBasic${x.nama}`}>
                      <Form.Label className='fbi'>{x.label}</Form.Label>
                      <Form.Control as="select" name={x.nama} required>
                        {x.value.map((option, i) => (
                          <option defaultChecked={x.val?x.val:''} key={x.nama+i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  );
                }
                return (
                  <Form.Group   hidden={x.nama === 'brng_id'}  key={x.nama + i} className="mb-3" controlId={`formBasic${x.nama}`}>
                    <Form.Label className='fbi'>{ x.label }</Form.Label>
                    <Form.Control
                      defaultValue={x.val?x.val:""}
                      type={x.type} name={x.nama}
                      required = {x.nama !== 'brng_id'}
                      placeholder={x.placeholder} />
                  </Form.Group>
                );
              })
              
            }
            
            <Form.Group
              className='mb-3' controlId={`formBasicImg`}
            >
              <Form.Label className="fbi">Upload Gambar </Form.Label>
              <div className="mt-2 img-ucont">
                {previewUrls.length > 0 && (
                  <div className="image-preview">
                    {previewUrls.map((url, index) => (
                      
                      <div key={index} className="image-container">
                        <img src={url} alt={`Preview ${index + 1}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                        <Button 
                         disabled={loadingItems?true:false}
                         className='btn-dimg'
                         type="button" onClick={() => handleRemoveFile(index)}>
                          Hapus
                        </Button>
                      </div>
                    ))}
                    
                 </div>
                )}
                {previewImg.length >0 &&(
                   <div className="image-preview">
                   {previewImg.map((url, index) => (
                     
                     <div key={index} className="image-container">
                       <img src={url.url} alt={`Preview ${index + 1}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                       <Button 
                        disabled={loadingItems?true:false}
                        className='btn-dimg'
                        type="button" onClick={() => handImgRF(url.id)}>
                         Hapus
                       </Button>
                     </div>
                   ))}
                   
                </div>
                )}
               </div>

              
               
               <Form.Control
                type="file"
                name="image"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled ={files.length >=5}
              />
           
            </Form.Group>
          
             <Button  variant="primary" type="submit"
              disabled={loadingItems?true:false}
             >{
              btnN?btnN:"Tambah"
             }
              </Button>
          </Form>
         
         </div>
      </div>
    </div>
    {/* )} */}
     </>
  )
}

export default Forms