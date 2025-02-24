import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import CryptoJS from 'crypto-js'
import { FormBrng, FormEBrng } from '../Form/Dx.ts';

export const Jxd = async(x:string)=>{
    try {
     
        const decoded = await jwtDecode(x);
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
}
const Sx = process.env.REACT_APP_DT
export const Dxdt = async(x:number)=>{

  const encrypted = CryptoJS.AES.encrypt(x.toString(), Sx).toString();
  const cleanedString = encrypted.replace(/\//g, '_')
  return cleanedString
}
export const Nxdt = async(x:string)=>{
  const fx=x.replace(/_/g, '/');
  const dx = CryptoJS.AES.decrypt(fx, Sx);
  const decrypted = dx.toString(CryptoJS.enc.Utf8);
  const nx = parseFloat(decrypted);
  return nx
}
interface ItemsOBJ {
  nama: string;
  val: any;
  type: string;
  label: string;
  placeholder: string;
  min?: number;
  max?: number;
  value: string[];
}
export const _CnxD = async(data)=>{
 
  let xz:ItemsOBJ[] = []


 for (let field of FormEBrng){
  let fieldName = field.nama;
  let fieldType = field.type;

  
  let fieldValue = data[fieldName];

 
  xz.push({
    nama: fieldName,
    val: fieldValue, 
    type: fieldType, 
    label: field.label,
    placeholder: field.placeholder || '',
    min: field.min || undefined,
    max: field.max || undefined,
    value: field.value || []
  });
 }




return xz;
}
export const getHead = async(x)=>{

  const firstItem = Array.isArray(x) ? x[0] : x;
  let keys = Object.keys(firstItem); 
  keys = keys.filter(key => key !== 'color');
  let newObj = [];  
  newObj.push({name:'No'})
  keys.forEach(key => {
    newObj.push({name:key}) 
  });
  
  return newObj
}

export const formatedTime = async(x)=>{
  const formatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",   // Ambil jam
    minute: "2-digit", // Ambil menit
    second: "2-digit", // Ambil detik (jika perlu)
    hour12: false,     // Gunakan format 24 jam
    timeZone: "Asia/Jakarta", // Set zona waktu Indonesia
  });
  const date =  new Date(x)
  const dx = formatter.format(date)
}