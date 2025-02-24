import { Placeholder } from "react-bootstrap";





export const FormEBrng=[
    {
        nama:"namab",
        type:'text',
        placeholder:"Nama Barang",
        label:"Nama "
    },
    {
        nama:"brng_id",
        type:'number',
        Placeholder:"ID Barang",
        label:"ID BARANG"

    },
    {
        nama:"jenis",
        type:"text",
        placeholder:"Jenis Barang",
        label:"Jenis "
    },
    {
        nama:"desk",
        type:'text',
        placeholder:"Deskripsi Barang",
        label:"Deskripsi"
    },
    {
        nama:"status",
        type:'options',
        value:[
            "Tersedia",
            "Habis"
        ],
        label:"Status "
    },
    {
        nama:"jml",
        type:'number',
        placeholder:"Jumlah Barang",
        label:"Jumlah",
        min:1,
        max:100,

    },
    {
        nama:"berat",
        type:"number",
        placeholder:"Berat",
        label:"Berat",
        min:1,
        max:1000,
    },
    {
        nama:"tpjml",
        type:"options",
        value:[
            "Pack",
            "Pcs"
        ],
        label:"Tipe Jumlah"
    },
  
    {
        nama:"tpbrt",
        type:"options",
        value:[
            "Kg",
            "Gr"
        ],
        label:"Tipe Berat"
    },
    {
        nama:"harga",
        type:"number",
        placeholder:'harga barang',
        label:"Harga",
        min:200,
        max:1000000000,
    },
]

export const FormBrng = [
    
    {
        nama:"namab",
        type:'text',
        placeholder:"Nama Barang",
        label:"Nama "
    },
    {
        nama:"jenis",
        type:"text",
        placeholder:"Jenis Barang",
        label:"Jenis "
    },
    {
        nama:"desk",
        type:'text',
        placeholder:"Deskripsi Barang",
        label:"Deskripsi"
    },
    {
        nama:"status",
        type:'options',
        value:[
            "Tersedia",
            "Habis"
        ],
        label:"Status "
    },
    {
        nama:"jml",
        type:'number',
        placeholder:"Jumlah Barang",
        label:"Jumlah",
        min:1,
        max:100,

    },
    {
        nama:"berat",
        type:"number",
        placeholder:"Berat",
        label:"Berat",
        min:1,
        max:1000,
    },
    {
        nama:"tpjml",
        type:"options",
        value:[
            "Pack",
            "Pcs"
        ],
        label:"Tipe Jumlah"
    },
  
    {
        nama:"tpbrt",
        type:"options",
        value:[
            "Kg",
            "Gr"
        ],
        label:"Tipe Berat"
    },
    {
        nama:"harga",
        type:"number",
        placeholder:'harga barang',
        label:"Harga",
        min:200,
        max:1000000000,
    },
  
]

export const admxData = [
    {
        nama:"amount",
        type:"number",
        placeholder:'Jumlah ',
        label:"Jumlah",
        min:100,
        max:1000000000,
    } ,{
        nama:"category",
        type:"options",
        value:[
            "Pengeluaran",
            "Pendapatan"
        ],
        label:"Kategori"
    }, {
        nama:"deskripsi",
        type:'text',
        placeholder:"Deskripsi",
        label:"Deskripsi"
    },

]

export const Madmx = [
    { name: "Januari", value: 0 },
    { name: "Februari", value: 1 },
    { name: "Maret", value: 2 },
    { name: "April", value: 3 },
    { name: "Mei", value: 4 },
    { name: "Juni", value: 5 },
    { name: "Juli", value: 6 },
    { name: "Agustus", value: 7 },
    { name: "September", value: 8 },
    { name: "Oktober", value: 9 },
    { name: "November", value: 10 },
    { name: "Desember", value: 11 }
];

export const Yadmx = [
    {
        name:'2025',value:2025
    },
    {
        name:'2026',value:2026
    },
]
// export const itemsData = [
//     {
//       brng: [
//         { nama:"Sayur A", jml: 1, desk: "Tester A", status: "Tersedia", jenis: "sayuran", harga: 10000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur B", jml: 1, desk: "Tester B", status: "Tersedia", jenis: "sayuran", harga: 12000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur C", jml: 1, desk: "Tester C", status: "Tersedia", jenis: "sayuran", harga: 15000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur D", jml: 1, desk: "Tester D", status: "Tersedia", jenis: "sayuran", harga: 11000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur E", jml: 1, desk: "Tester E", status: "Tersedia", jenis: "sayuran", harga: 9000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur F", jml: 1, desk: "Tester F", status: "Tersedia", jenis: "sayuran", harga: 13000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur G", jml: 1, desk: "Tester G", status: "Tersedia", jenis: "sayuran", harga: 14000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur H", jml: 1, desk: "Tester H", status: "Tersedia", jenis: "sayuran", harga: 16000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur I", jml: 1, desk: "Tester I", status: "Tersedia", jenis: "sayuran", harga: 17000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur J", jml: 1, desk: "Tester J", status: "Tersedia", jenis: "sayuran", harga: 18000, berat: 1, tpjml: 1, tpbrt: "Kg" }
//       ],
//       page: 1,
//       next:2,
//     },
//     {
//       brng: [
//         { nama:"Sayur K", jml: 1, desk: "Tester K", status: "Tersedia", jenis: "sayuran", harga: 20000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur L", jml: 1, desk: "Tester L", status: "Tersedia", jenis: "sayuran", harga: 22000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur M", jml: 1, desk: "Tester M", status: "Tersedia", jenis: "sayuran", harga: 21000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur N", jml: 1, desk: "Tester N", status: "Tersedia", jenis: "sayuran", harga: 25000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur O", jml: 1, desk: "Tester O", status: "Tersedia", jenis: "sayuran", harga: 23000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur P", jml: 1, desk: "Tester P", status: "Tersedia", jenis: "sayuran", harga: 24000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur Q", jml: 1, desk: "Tester Q", status: "Tersedia", jenis: "sayuran", harga: 25000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur R", jml: 1, desk: "Tester R", status: "Tersedia", jenis: "sayuran", harga: 26000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur S", jml: 1, desk: "Tester S", status: "Tersedia", jenis: "sayuran", harga: 27000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur T", jml: 1, desk: "Tester T", status: "Tersedia", jenis: "sayuran", harga: 28000, berat: 1, tpjml: 1, tpbrt: "Kg" }
//       ],
//       page: 2,
//       next:3,
//     },
//     {
//       brng: [
//         { nama:"Sayur U", jml: 1, desk: "Tester U", status: "Tersedia", jenis: "sayuran", harga: 29000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur V", jml: 1, desk: "Tester V", status: "Tersedia", jenis: "sayuran", harga: 30000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur W", jml: 1, desk: "Tester W", status: "Tersedia", jenis: "sayuran", harga: 31000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur X", jml: 1, desk: "Tester X", status: "Tersedia", jenis: "sayuran", harga: 32000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur Y", jml: 1, desk: "Tester Y", status: "Tersedia", jenis: "sayuran", harga: 33000, berat: 1, tpjml: 1, tpbrt: "Kg" },
//         { nama:"Sayur Z", jml: 1, desk: "Tester Z", status: "Tersedia", jenis: "sayuran", harga: 34000, berat: 1, tpjml: 1, tpbrt: "Kg" }
//       ],
//       page: 3,
//       next:1,
//     }
//   ];
  