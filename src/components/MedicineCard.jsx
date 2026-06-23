import { Link } from 'react-router-dom';

const MedicineCard = ({ medicine }) => {
  const statusClass = medicine.status === 'In Stock' ? 'badge-success' : medicine.status === 'Low Stock' ? 'badge-warning' : 'badge-danger';
  
  return (
    <div className="content-card h-100">
      <div className="content-card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="stat-card-icon purple" style={{ width: 40, height: 40, fontSize: '1rem' }}>
            <i className="bi bi-capsule"></i>
          </div>
          <span className={`badge-custom ${statusClass}`}>{medicine.status}</span>
        </div>
        <h6 className="mb-1" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{medicine.name}</h6>
        <small style={{ color: 'var(--text-muted)' }}>{medicine.manufacturer}</small>
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stock</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{medicine.stock} units</div>
          </div>
          <div className="text-end">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price</div>
            <div style={{ fontWeight: 600, color: 'var(--success)' }}>₹{medicine.price}</div>
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <Link to={`/medicines/edit/${medicine.id}`} className="btn-outline-custom flex-fill text-center" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <i className="bi bi-pencil"></i> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
