import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addMedicine } from '../../api/medicineApi';

const AddMedicine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: '', manufacturer: '', price: '', stock: '', expiryDate: '', batchNo: '', description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addMedicine({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: parseInt(formData.stock) > 12 ? 'In Stock' : parseInt(formData.stock) > 0 ? 'Low Stock' : 'Out of Stock'
      });
      navigate('/medicines');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Link to="/medicines" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Add New Medicine</h4>
        </div>
        <p>Fill in the details to add a new medicine to inventory</p>
      </div>

      <div className="content-card" style={{ maxWidth: 800 }}>
        <div className="content-card-body">
          <form onSubmit={handleSubmit} className="form-dark">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Medicine Name *</label>
                <input type="text" name="name" className="form-control" placeholder="e.g. Paracetamol 500mg" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Analgesic">Analgesic</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Antacid">Antacid</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Antihistamine">Antihistamine</option>
                  <option value="NSAID">NSAID</option>
                  <option value="Statin">Statin</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Manufacturer *</label>
                <input type="text" name="manufacturer" className="form-control" placeholder="e.g. Sun Pharma" value={formData.manufacturer} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Batch Number *</label>
                <input type="text" name="batchNo" className="form-control" placeholder="e.g. BP2024-001" value={formData.batchNo} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Price (₹) *</label>
                <input type="number" name="price" className="form-control" placeholder="0.00" step="0.01" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock Quantity *</label>
                <input type="number" name="stock" className="form-control" placeholder="0" value={formData.stock} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Expiry Date *</label>
                <input type="date" name="expiryDate" className="form-control" value={formData.expiryDate} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows="3" placeholder="Optional description..." value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-primary-custom" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg"></i> Save Medicine</>}
              </button>
              <Link to="/medicines" className="btn-outline-custom">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
