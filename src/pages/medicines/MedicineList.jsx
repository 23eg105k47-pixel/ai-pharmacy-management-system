import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicines, deleteMedicine } from '../../api/medicineApi';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      await deleteMedicine(id);
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()) ||
    m.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h4>Medicine Inventory</h4>
          <p>Manage your pharmacy medicines and stock levels</p>
        </div>
        <Link to="/medicines/add" className="btn-primary-custom">
          <i className="bi bi-plus-lg"></i> Add Medicine
        </Link>
      </div>

      <div className="content-card mb-4">
        <div className="content-card-body">
          <div className="row align-items-center g-3">
            <div className="col-md-6">
              <div className="navbar-search w-100" style={{ maxWidth: '100%' }}>
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search medicines by name, category, manufacturer..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end gap-2">
              <button className={`btn-outline-custom ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')} style={{ padding: '8px 14px' }}>
                <i className="bi bi-list"></i>
              </button>
              <button className={`btn-outline-custom ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} style={{ padding: '8px 14px' }}>
                <i className="bi bi-grid-3x3-gap"></i>
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>{filtered.length} medicines</span>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="content-card">
          <div className="content-card-body p-0">
            <div className="table-responsive">
              <table className="table-dark-custom">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Category</th>
                    <th>Batch No</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((med) => (
                    <tr key={med.id}>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{med.name}</div>
                        <small style={{ color: 'var(--text-muted)' }}>{med.manufacturer}</small>
                      </td>
                      <td><span className="badge-custom badge-primary">{med.category}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}>{med.batchNo}</td>
                      <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹{med.price}</td>
                      <td style={{ fontWeight: 600 }}>{med.stock}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{med.expiryDate}</td>
                      <td>
                        <span className={`badge-custom badge-${med.status === 'In Stock' ? 'success' : med.status === 'Low Stock' ? 'warning' : 'danger'}`}>
                          {med.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Link to={`/medicines/edit/${med.id}`} className="btn-outline-custom" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button className="btn-danger-custom" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleDelete(med.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((med) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={med.id}>
              <div className="content-card h-100">
                <div className="content-card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="stat-card-icon purple" style={{ width: 40, height: 40, fontSize: '1rem' }}><i className="bi bi-capsule"></i></div>
                    <span className={`badge-custom badge-${med.status === 'In Stock' ? 'success' : med.status === 'Low Stock' ? 'warning' : 'danger'}`}>{med.status}</span>
                  </div>
                  <h6 className="mb-1" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{med.name}</h6>
                  <small style={{ color: 'var(--text-muted)' }}>{med.manufacturer}</small>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Stock</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.stock}</div>
                    </div>
                    <div className="text-end">
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Price</div>
                      <div style={{ fontWeight: 600, color: 'var(--success)' }}>₹{med.price}</div>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <Link to={`/medicines/edit/${med.id}`} className="btn-outline-custom flex-fill text-center" style={{ padding: '6px', fontSize: '0.8rem' }}>
                      <i className="bi bi-pencil"></i> Edit
                    </Link>
                    <button className="btn-danger-custom flex-fill" style={{ padding: '6px', fontSize: '0.8rem' }} onClick={() => handleDelete(med.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineList;
