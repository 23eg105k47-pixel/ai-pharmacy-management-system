import axios from 'axios';

const API_URL = '/api/medicines';

const mockMedicines = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', manufacturer: 'Sun Pharma', price: 25.50, stock: 450, expiryDate: '2027-06-15', status: 'In Stock', batchNo: 'BP2024-001' },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', manufacturer: 'Cipla Ltd', price: 85.00, stock: 12, expiryDate: '2026-12-20', status: 'Low Stock', batchNo: 'BP2024-002' },
  { id: 3, name: 'Omeprazole 20mg', category: 'Antacid', manufacturer: 'Dr. Reddys', price: 45.00, stock: 200, expiryDate: '2027-03-10', status: 'In Stock', batchNo: 'BP2024-003' },
  { id: 4, name: 'Metformin 500mg', category: 'Antidiabetic', manufacturer: 'Lupin Ltd', price: 35.00, stock: 5, expiryDate: '2026-09-25', status: 'Low Stock', batchNo: 'BP2024-004' },
  { id: 5, name: 'Cetirizine 10mg', category: 'Antihistamine', manufacturer: 'Mankind Pharma', price: 15.00, stock: 300, expiryDate: '2027-08-30', status: 'In Stock', batchNo: 'BP2024-005' },
  { id: 6, name: 'Azithromycin 500mg', category: 'Antibiotic', manufacturer: 'Zydus Cadila', price: 120.00, stock: 0, expiryDate: '2026-11-15', status: 'Out of Stock', batchNo: 'BP2024-006' },
  { id: 7, name: 'Ibuprofen 400mg', category: 'NSAID', manufacturer: 'Abbott India', price: 30.00, stock: 180, expiryDate: '2027-05-20', status: 'In Stock', batchNo: 'BP2024-007' },
  { id: 8, name: 'Atorvastatin 10mg', category: 'Statin', manufacturer: 'Ranbaxy', price: 55.00, stock: 95, expiryDate: '2027-01-18', status: 'In Stock', batchNo: 'BP2024-008' }
];

export const getMedicines = async () => {
  // return axios.get(API_URL);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockMedicines }), 300);
  });
};

export const getMedicineById = async (id) => {
  // return axios.get(`${API_URL}/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockMedicines.find(m => m.id === parseInt(id)) }), 200);
  });
};

export const addMedicine = async (medicine) => {
  // return axios.post(API_URL, medicine);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { ...medicine, id: Date.now() } }), 300);
  });
};

export const updateMedicine = async (id, medicine) => {
  // return axios.put(`${API_URL}/${id}`, medicine);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { ...medicine, id } }), 300);
  });
};

export const deleteMedicine = async (id) => {
  // return axios.delete(`${API_URL}/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: 'Deleted successfully' } }), 300);
  });
};
