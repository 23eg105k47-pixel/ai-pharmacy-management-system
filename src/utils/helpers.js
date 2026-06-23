export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    'In Stock': 'success',
    'Low Stock': 'warning',
    'Out of Stock': 'danger',
    'Active': 'success',
    'Completed': 'info',
    'Pending': 'warning'
  };
  return colors[status] || 'primary';
};
