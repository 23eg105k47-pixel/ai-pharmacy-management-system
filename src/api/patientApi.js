import axios from 'axios';

const API_URL = '/api/patients';

const mockPatients = [
  { id: 1, name: 'Rajesh Sharma', age: 45, gender: 'Male', phone: '9876543210', email: 'rajesh@email.com', address: '12 MG Road, Hyderabad', bloodGroup: 'O+', allergies: 'Penicillin', condition: 'Hypertension', lastVisit: '2026-06-15', doctor: 'Dr. Priya Singh' },
  { id: 2, name: 'Sunita Patel', age: 32, gender: 'Female', phone: '9876543211', email: 'sunita@email.com', address: '45 Banjara Hills, Hyderabad', bloodGroup: 'A+', allergies: 'None', condition: 'Diabetes Type 2', lastVisit: '2026-06-18', doctor: 'Dr. Vikram Rao' },
  { id: 3, name: 'Amit Kumar', age: 58, gender: 'Male', phone: '9876543212', email: 'amit@email.com', address: '78 Jubilee Hills, Hyderabad', bloodGroup: 'B+', allergies: 'Sulfa drugs', condition: 'Arthritis', lastVisit: '2026-06-20', doctor: 'Dr. Priya Singh' },
  { id: 4, name: 'Kavitha Reddy', age: 28, gender: 'Female', phone: '9876543213', email: 'kavitha@email.com', address: '23 Madhapur, Hyderabad', bloodGroup: 'AB-', allergies: 'Aspirin', condition: 'Asthma', lastVisit: '2026-06-10', doctor: 'Dr. Anil Mehta' },
  { id: 5, name: 'Mohammed Ali', age: 67, gender: 'Male', phone: '9876543214', email: 'ali@email.com', address: '56 Secunderabad', bloodGroup: 'O-', allergies: 'None', condition: 'Cardiac Disease', lastVisit: '2026-06-22', doctor: 'Dr. Vikram Rao' }
];

export const getPatients = async () => {
  // return axios.get(API_URL);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockPatients }), 300);
  });
};

export const getPatientById = async (id) => {
  // return axios.get(`${API_URL}/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockPatients.find(p => p.id === parseInt(id)) }), 200);
  });
};

export const addPatient = async (patient) => {
  // return axios.post(API_URL, patient);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { ...patient, id: Date.now() } }), 300);
  });
};
