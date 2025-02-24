import React, { useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './items.css'
import { useNavigate } from 'react-router-dom';
import { Dxdt } from '../AZ/Jxd.ts';
function Items({dx,last}:{dx:any,last:any}) {

  const [formattedDeskripsi, setFormattedDeskripsi] = useState()
  const [imageSrc, setImageSrc] = useState(`${dx?.gambar[0]?.url}`);

  const fallbackImage = '/icons/logowe.png'
  const navig = useNavigate()
  const handleImageError = () => {
    setImageSrc(fallbackImage); 
  };

  const mans = async (x: string) => {
    const daftarKata = x.split(/\s+/);
    
    if (x.length > 10) {
      return x.slice(0, 10) + " ...";
    } else {
      return x;
    }
  };
 
  useEffect(() => {
    const formatDeskripsi = async () => {
       const formatted = await mans(dx.deskripsi) ;
        setFormattedDeskripsi(formatted); 
    };

    formatDeskripsi(); 
   
  
  }, [dx]); 

  const getD =  async(x:string)=>{
    const xs = await Dxdt(x)
    navig(`/items/de/${xs}`)
  }
  return (
 
     <Card ref={last}  key={dx.nama+"_card"}  className='card' onClick={(e)=>{getD(dx.id)}}>

      <div className='imgc-cont'>
        <Card.Img   className='img-it' variant="top" 
        src={imageSrc}
        onError={handleImageError}
        />
    
      </div>
     
      <Card.Body>
        <div></div>
        
        <Card.Title className='t-card'>{dx.nama}</Card.Title>
        <Card.Text as={'div'}>
         <article className='prod'>
          <p className={`prodStats ${dx.status==="Tersedia"?'ada':'habis'}`}><strong className='p-stats'>Status:</strong> {dx.status} </p>
          <p><strong>Deskripsi:</strong> {formattedDeskripsi}</p>
          <p className='hrg-prod'><strong className='p-hrg'>Harga:</strong> Rp.{dx.harga}</p>
          {/* <p><strong>Stock:</strong> {dx.satuan_jml}</p> */}
         </article>
        </Card.Text>
       
        {/* <Button variant="primary"
          onClick={()=>getD(dx.id)}
         
        >
          Details
        </Button> */}
      </Card.Body>
     </Card>
    
  )
}

export default Items