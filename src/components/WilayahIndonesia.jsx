import { useState, useEffect } from 'react';
import axios from 'axios';

export const WilayahIndonesia = () => {
   const [provinsi, setProvinsi] = useState([]);
   const [selectedProvinsi, setSelectedProvinsi] = useState('');
   const [kabupaten, setKabupaten] = useState([]);
   const [selectedKabupaten, setSelectedKabupaten] = useState('');
   const [kecamatan, setKecamatan] = useState([]);
   const [selectedKecamatan, setSelectedKecamatan] = useState('');
   const [kelurahan, setKelurahan] = useState([]);

   useEffect(() => {
      axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
         .then(response => {
            setProvinsi(response.data);
         });
   }, []);

   useEffect(() => {
      if (selectedProvinsi) {
         axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`)
            .then(response => {
               setKabupaten(response.data);
               setKecamatan([]);
               setKelurahan([]);
            });
      }
   }, [selectedProvinsi]);

   useEffect(() => {
      if (selectedKabupaten) {
         axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabupaten}.json`)
            .then(response => {
               setKecamatan(response.data);
               setKelurahan([]);
            });
      }
   }, [selectedKabupaten]);

   useEffect(() => {
      if (selectedKecamatan) {
         axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`)
            .then(response => {
               setKelurahan(response.data);
            });
      }
   }, [selectedKecamatan]);

   return (
      <div className="container mt-5">
         <div className="my-4">
            <h1 className='fw-semibold'>Daftar Wilayah Indonesia</h1>
         </div>
         <div className="row mb-3">
            <div className="col-md-4">
               <select className="form-select" onChange={(e) => setSelectedProvinsi(e.target.value)}>
                  <option value="">Pilih Provinsi</option>
                  {provinsi.map(p => (
                     <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="row mb-3">
            <div className="col-md-4">
               <select className="form-select" onChange={(e) => setSelectedKabupaten(e.target.value)} disabled={!selectedProvinsi}>
                  <option value="">Pilih Kabupaten</option>
                  {kabupaten.map(k => (
                     <option key={k.id} value={k.id}>{k.name}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="row mb-3">
            <div className="col-md-4">
               <select className="form-select" onChange={(e) => setSelectedKecamatan(e.target.value)} disabled={!selectedKabupaten}>
                  <option value="">Pilih Kecamatan</option>
                  {kecamatan.map(k => (
                     <option key={k.id} value={k.id}>{k.name}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="row mb-3">
            <div className="col-md-4">
               <select className="form-select" onChange={(e) => setSelectedKecamatan(e.target.value)} disabled={!selectedKecamatan}>
                  <option value="">Pilih Kelurahan</option>
                  {kelurahan.map(k => (
                     <option key={k.id} value={k.id}>{k.name}</option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   );
};
