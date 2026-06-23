import axios from 'axios';

const API_URL = '/api/reminders';

const mockReminders = [
  { id: 1, patientName: 'Rajesh Sharma', medicineName: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice Daily', time: '08:00 AM, 08:00 PM', startDate: '2026-06-01', endDate: '2026-07-01', status: 'Active', notes: 'Take after meals' },
  { id: 2, patientName: 'Sunita Patel', medicineName: 'Omeprazole 20mg', dosage: '1 capsule', frequency: 'Once Daily', time: '07:00 AM', startDate: '2026-06-10', endDate: '2026-07-10', status: 'Active', notes: 'Take before breakfast' },
  { id: 3, patientName: 'Amit Kumar', medicineName: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Three Times', time: '08:00 AM, 02:00 PM, 08:00 PM', startDate: '2026-06-15', endDate: '2026-06-30', status: 'Active', notes: 'Take with food' },
  { id: 4, patientName: 'Kavitha Reddy', medicineName: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once Daily', time: '10:00 PM', startDate: '2026-05-20', endDate: '2026-06-20', status: 'Completed', notes: 'Take before bed' },
  { id: 5, patientName: 'Mohammed Ali', medicineName: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Once Daily', time: '09:00 PM', startDate: '2026-06-01', endDate: '2026-09-01', status: 'Active', notes: 'Take at bedtime' }
];

export const getReminders = async () => {
  // return axios.get(API_URL);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockReminders }), 300);
  });
};

export const addReminder = async (reminder) => {
  // return axios.post(API_URL, reminder);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { ...reminder, id: Date.now() } }), 300);
  });
};
