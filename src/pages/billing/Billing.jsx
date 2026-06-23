import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([{ medicineName: '', quantity: 1, price: 0 }]);
  const [patientName, setPatientName] = useState('');
  const [discount, setDiscount] = useState(0);

  const addItem = () => setItems([...items, { medicineName: '', quantity: 1, price: 0 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx, field, value) => {
    const updated = [...items];
    updated[idx][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const discountAmt = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmt) * 0.18;
  const total = subtotal - discountAmt + tax;

  const handleGenerate = () => {
    const invoiceData = { patientName, items, subtotal, discount, discountAmt, tax, total, date: new Date().toISOString().split('T')[0], invoiceNo: `INV-${Date.now().toString().slice(-6)}` };
    navigate('/billing/invoice', { state: invoiceData });
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h4>Create Bill</h4>
        <p>Generate invoice for patient purchases</p>
      </div>

      <div className="content-card" style={{ maxWidth: 900 }}>
        <div className="content-card-body form-dark">
          <div className="mb-4">
            <label className="form-label">Patient Name *</label>
            <input type="text" className="form-control" placeholder="Enter patient name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          </div>

          <h6 className="mb-3" style={{ color: 'var(--text-primary)' }}><i className="bi bi-cart me-2"></i>Medicine Items</h6>
          {items.map((item, idx) => (
            <div className="row g-2 mb-2 align-items-end" key={idx}>
              <div className="col-md-5">
                {idx === 0 && <label className="form-label">Medicine</label>}
                <input type="text" className="form-control" placeholder="Medicine name" value={item.medicineName} onChange={(e) => updateItem(idx, 'medicineName', e.target.value)} />
              </div>
              <div className="col-md-2">
                {idx === 0 && <label className="form-label">Qty</label>}
                <input type="number" className="form-control" min="1" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', e.target.value)} />
              </div>
              <div className="col-md-2">
                {idx === 0 && <label className="form-label">Price (₹)</label>}
                <input type="number" className="form-control" min="0" step="0.01" value={item.price} onChange={(e) => updateItem(idx, 'price', e.target.value)} />
              </div>
              <div className="col-md-2">
                {idx === 0 && <label className="form-label">Total</label>}
                <div className="form-control" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--success)', fontWeight: 600 }}>
                  ₹{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
              <div className="col-md-1">
                {items.length > 1 && (
                  <button className="btn-danger-custom w-100" onClick={() => removeItem(idx)} style={{ padding: '10px' }}>
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <button className="btn-outline-custom mt-2" onClick={addItem}>
            <i className="bi bi-plus"></i> Add Item
          </button>

          <hr style={{ borderColor: 'var(--border-color)', margin: '24px 0' }} />

          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Discount (%)</label>
              <input type="number" className="form-control" min="0" max="100" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
            </div>
            <div className="col-md-8">
              <div className="p-3 mt-md-4" style={{ background: 'var(--dark)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>Discount ({discount}%)</span>
                  <span style={{ color: 'var(--danger)' }}>-₹{discountAmt.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>GST (18%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{tax.toFixed(2)}</span>
                </div>
                <hr style={{ borderColor: 'var(--border-color)' }} />
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Total</span>
                  <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="btn-primary-custom" onClick={handleGenerate} disabled={!patientName || items.some(i => !i.medicineName)}>
              <i className="bi bi-receipt"></i> Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
