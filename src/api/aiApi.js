import axios from 'axios';

const API_URL = '/api/ai';

const mockRecognitionResult = {
  name: 'Paracetamol 500mg',
  manufacturer: 'Sun Pharmaceutical Industries',
  category: 'Analgesic / Antipyretic',
  activeIngredient: 'Paracetamol (Acetaminophen)',
  dosageForm: 'Tablet',
  strength: '500mg',
  uses: ['Fever reduction', 'Pain relief', 'Headache', 'Body aches', 'Cold & Flu symptoms'],
  sideEffects: ['Nausea', 'Allergic reactions (rare)', 'Liver damage (overdose)'],
  confidence: 94.7,
  warnings: 'Do not exceed 4g per day. Avoid with alcohol. Consult doctor if symptoms persist beyond 3 days.'
};

export const recognizeMedicine = async (imageFile) => {
  // const formData = new FormData();
  // formData.append('image', imageFile);
  // return axios.post(`${API_URL}/recognize`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockRecognitionResult }), 2000);
  });
};
