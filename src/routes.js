import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import MedicineList from './pages/medicines/MedicineList';
import AddMedicine from './pages/medicines/AddMedicine';
import EditMedicine from './pages/medicines/EditMedicine';
import MedicineRecognition from './pages/medicines/MedicineRecognition';
import PatientList from './pages/patients/PatientList';
import AddPatient from './pages/patients/AddPatient';
import PatientDetails from './pages/patients/PatientDetails';
import ReminderList from './pages/reminders/ReminderList';
import AddReminder from './pages/reminders/AddReminder';
import HealthRecords from './pages/health/HealthRecords';
import AddHealthRecord from './pages/health/AddHealthRecord';
import Billing from './pages/billing/Billing';
import Invoice from './pages/billing/Invoice';
import Users from './pages/admin/Users';
import Reports from './pages/admin/Reports';

export const publicRoutes = [
  { path: '/login', element: Login },
  { path: '/register', element: Register },
  { path: '/forgot-password', element: ForgotPassword },
];

export const protectedRoutes = [
  { path: '/dashboard', element: Dashboard },
  { path: '/medicines', element: MedicineList },
  { path: '/medicines/add', element: AddMedicine },
  { path: '/medicines/edit/:id', element: EditMedicine },
  { path: '/medicine-recognition', element: MedicineRecognition },
  { path: '/patients', element: PatientList },
  { path: '/patients/add', element: AddPatient },
  { path: '/patients/:id', element: PatientDetails },
  { path: '/reminders', element: ReminderList },
  { path: '/reminders/add', element: AddReminder },
  { path: '/health-records', element: HealthRecords },
  { path: '/health-records/add', element: AddHealthRecord },
  { path: '/billing', element: Billing },
  { path: '/billing/invoice', element: Invoice },
  { path: '/admin/users', element: Users },
  { path: '/admin/reports', element: Reports },
];
