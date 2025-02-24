import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Fungsi untuk melaporkan metrik kinerja
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Mengumpulkan dan melaporkan metrik web-vitals
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;