import axios from 'axios';

const API_URL = '/api/health';

const mockHealthRecords = [
  { id: 1, patientName: 'Rajesh Sharma', date: '2026-06-15', bloodPressure: '140/90', heartRate: 78, temperature: 98.6, weight: 82, bloodSugar: 145, notes: 'BP slightly elevated, advised lifestyle changes', doctor: 'Dr. Priya Singh' },
  { id: 2, patientName: 'Sunita Patel', date: '2026-06-18', bloodPressure: '120/80', heartRate: 72, temperature: 98.4, weight: 65, bloodSugar: 210, notes: 'Blood sugar high, adjusted medication dosage', doctor: 'Dr. Vikram Rao' },
  { id: 3, patientName: 'Amit Kumar', date: '2026-06-20', bloodPressure: '130/85', heartRate: 80, temperature: 99.1, weight: 78, bloodSugar: 110, notes: 'Joint pain persisting, recommended physiotherapy', doctor: 'Dr. Priya Singh' },
  { id: 4, patientName: 'Mohammed Ali', date: '2026-06-22', bloodPressure: '150/95', heartRate: 85, temperature: 98.8, weight: 90, bloodSugar: 130, notes: 'Cardiac checkup, ECG normal', doctor: 'Dr. Vikram Rao' }
];

export const getHealthRecords = async () => {
  // return axios.get(API_URL);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockHealthRecords }), 300);
  });
};

export const addHealthRecord = async (record) => {
  // return axios.post(API_URL, record);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { ...record, id: Date.now() } }), 300);
  });
};
