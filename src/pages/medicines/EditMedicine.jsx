import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getMedicineById, updateMedicine } from '../../api/medicineApi';

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '', category: '', manufacturer: '', price: '', stock: '', expiryDate: '', batchNo: '', description: ''
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMedicineById(id);
        if (res.data) {
          setFormData({
            name: res.data.name || '',
            category: res.data.category || '',
            manufacturer: res.data.manufacturer || '',
            price: res.data.price || '',
            stock: res.data.stock || '',
            expiryDate: res.data.expiryDate || '',
            batchNo: res.data.batchNo || '',
            description: res.data.description || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMedicine(id, {
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

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Link to="/medicines" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Edit Medicine</h4>
        </div>
        <p>Update medicine details and stock information</p>
      </div>

      <div className="content-card" style={{ maxWidth: 800 }}>
        <div className="content-card-body">
          <form onSubmit={handleSubmit} className="form-dark">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Medicine Name *</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
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
                <input type="text" name="manufacturer" className="form-control" value={formData.manufacturer} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Batch Number *</label>
                <input type="text" name="batchNo" className="form-control" value={formData.batchNo} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Price (₹) *</label>
                <input type="number" name="price" className="form-control" step="0.01" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock Quantity *</label>
                <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Expiry Date *</label>
                <input type="date" name="expiryDate" className="form-control" value={formData.expiryDate} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-primary-custom" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</> : <><i className="bi bi-check-lg"></i> Update Medicine</>}
              </button>
              <Link to="/medicines" className="btn-outline-custom">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMedicine;
