const Reports = () => {
  const reportData = {
    monthlySales: [
      { month: 'Jan', revenue: 85000 },
      { month: 'Feb', revenue: 92000 },
      { month: 'Mar', revenue: 78000 },
      { month: 'Apr', revenue: 105000 },
      { month: 'May', revenue: 115000 },
      { month: 'Jun', revenue: 124500 },
    ],
    topMedicines: [
      { name: 'Paracetamol 500mg', sold: 1250, revenue: 31875 },
      { name: 'Amoxicillin 250mg', sold: 890, revenue: 75650 },
      { name: 'Omeprazole 20mg', sold: 720, revenue: 32400 },
      { name: 'Cetirizine 10mg', sold: 650, revenue: 9750 },
      { name: 'Metformin 500mg', sold: 580, revenue: 20300 },
    ],
    categoryBreakdown: [
      { category: 'Analgesic', count: 450, percentage: 28 },
      { category: 'Antibiotic', count: 320, percentage: 20 },
      { category: 'Antacid', count: 280, percentage: 17 },
      { category: 'Antidiabetic', count: 240, percentage: 15 },
      { category: 'Others', count: 310, percentage: 20 },
    ]
  };

  const maxRevenue = Math.max(...reportData.monthlySales.map(m => m.revenue));

  return (
    <div className="fade-in">
      <div className="page-header">
        <h4><i className="bi bi-bar-chart-line me-2" style={{ color: 'var(--primary-light)' }}></i>Reports & Analytics</h4>
        <p>View pharmacy performance and analytics</p>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Revenue', value: '₹5,99,500', icon: 'bi-currency-rupee', color: 'green', change: '+18%' },
          { label: 'Medicines Sold', value: '4,090', icon: 'bi-capsule', color: 'purple', change: '+12%' },
          { label: 'Avg Order Value', value: '₹245', icon: 'bi-graph-up', color: 'blue', change: '+5%' },
          { label: 'Return Rate', value: '2.3%', icon: 'bi-arrow-return-left', color: 'yellow', change: '-0.5%' },
        ].map((stat, i) => (
          <div className="col-md-3 col-sm-6" key={i}>
            <div className={`stat-card ${stat.color}`}>
              <div className={`stat-card-icon ${stat.color}`}><i className={`bi ${stat.icon}`}></i></div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-change positive"><i className="bi bi-arrow-up"></i> {stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="content-card">
            <div className="content-card-header">
              <h6><i className="bi bi-graph-up me-2"></i>Monthly Revenue</h6>
            </div>
            <div className="content-card-body">
              <div className="d-flex align-items-end gap-3" style={{ height: 200 }}>
                {reportData.monthlySales.map((m, i) => (
                  <div key={i} className="text-center flex-fill">
                    <div style={{
                      height: `${(m.revenue / maxRevenue) * 160}px`,
                      background: 'var(--gradient-1)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'all 0.3s ease',
                      minHeight: 20,
                      cursor: 'pointer',
                      position: 'relative'
                    }} title={`₹${m.revenue.toLocaleString()}`}>
                    </div>
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 8, display: 'block' }}>{m.month}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="content-card h-100">
            <div className="content-card-header">
              <h6><i className="bi bi-pie-chart me-2"></i>Category Split</h6>
            </div>
            <div className="content-card-body">
              {reportData.categoryBreakdown.map((cat, i) => (
                <div className="mb-3" key={i}>
                  <div className="d-flex justify-content-between mb-1">
                    <small style={{ color: 'var(--text-secondary)' }}>{cat.category}</small>
                    <small style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cat.percentage}%</small>
                  </div>
                  <div style={{ height: 6, background: 'var(--dark)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%',
                      width: `${cat.percentage}%`,
                      background: ['var(--gradient-1)', 'var(--gradient-2)', 'var(--gradient-3)', 'var(--gradient-4)', 'var(--gradient-5)'][i],
                      borderRadius: 3,
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="content-card mt-3">
        <div className="content-card-header">
          <h6><i className="bi bi-trophy me-2"></i>Top Selling Medicines</h6>
        </div>
        <div className="content-card-body p-0">
          <div className="table-responsive">
            <table className="table-dark-custom">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topMedicines.map((med, i) => (
                  <tr key={i}>
                    <td><span className="badge-custom badge-primary">#{i + 1}</span></td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{med.name}</td>
                    <td>{med.sold.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹{med.revenue.toLocaleString()}</td>
                    <td>
                      <div style={{ width: 100, height: 6, background: 'var(--dark)', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${(med.sold / 1250) * 100}%`, background: 'var(--gradient-4)', borderRadius: 3 }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
