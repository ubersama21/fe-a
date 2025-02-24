import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Set scroll ke atas setiap kali lokasi URL berubah
    window.scrollTo(0, 0);
  }, [location]); // Dependensi `location` memastikan efek ini dijalankan setiap kali URL berubah

  return null; // Tidak perlu elemen UI, cukup melaksanakan scroll
}

export default ScrollToTop;