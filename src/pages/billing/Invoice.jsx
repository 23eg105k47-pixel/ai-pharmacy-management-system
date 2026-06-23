import { useLocation, Link } from 'react-router-dom';

const Invoice = () => {
  const { state: data } = useLocation();

  if (!data) {
    return (
      <div className="fade-in text-center py-5">
        <i className="bi bi-receipt d-block" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
        <h5 className="mt-3" style={{ color: 'var(--text-primary)' }}>No Invoice Data</h5>
        <p style={{ color: 'var(--text-muted)' }}>Create a bill first to generate an invoice.</p>
        <Link to="/billing" className="btn-primary-custom"><i className="bi bi-plus-lg"></i> Create Bill</Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h4>Invoice</h4>
          <p>Invoice #{data.invoiceNo}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-outline-custom" onClick={() => window.print()}>
            <i className="bi bi-printer"></i> Print
          </button>
          <Link to="/billing" className="btn-primary-custom">
            <i className="bi bi-plus-lg"></i> New Bill
          </Link>
        </div>
      </div>

      <div className="invoice-card">
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="sidebar-brand-icon" style={{ width: 36, height: 36, fontSize: '1rem' }}><i className="bi bi-capsule"></i></div>
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>PharmAI</h5>
            </div>
            <small style={{ color: 'var(--text-muted)' }}>AI-Powered Pharmacy Management</small>
          </div>
          <div className="text-end">
            <h5 style={{ color: 'var(--primary-light)', fontWeight: 700 }}>INVOICE</h5>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>#{data.invoiceNo}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date: {data.date}</div>
          </div>
        </div>

        <div className="p-3 mb-4" style={{ background: 'var(--dark)', borderRadius: 8 }}>
          <small style={{ color: 'var(--text-muted)' }}>Bill To</small>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem' }}>{data.patientName}</div>
        </div>

        <div className="table-responsive mb-4">
          <table className="table-dark-custom">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.medicineName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td style={{ fontWeight: 600 }}>₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row justify-content-end">
          <div className="col-md-5">
            <div className="p-3" style={{ background: 'var(--dark)', borderRadius: 12 }}>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)' }}>₹{data.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>Discount ({data.discount}%)</span>
                <span style={{ color: 'var(--danger)' }}>-₹{data.discountAmt.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>GST (18%)</span>
                <span style={{ color: 'var(--text-primary)' }}>₹{data.tax.toFixed(2)}</span>
              </div>
              <hr style={{ borderColor: 'var(--border-color)' }} />
              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Total</span>
                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>₹{data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>Thank you for choosing PharmAI. For queries, contact support@pharmai.com</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
