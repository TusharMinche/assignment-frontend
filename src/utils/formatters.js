export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString || dateString === '00010201') return 'N/A';
  
  // Format: YYYYMMDD
  if (dateString.length === 8) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    const date = new Date(`${year}-${month}-${day}`);
    
    if (isNaN(date.getTime())) return 'N/A';
    
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
  
  return 'N/A';
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return 'N/A';
  
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  
  // Format: +91 98191 37672
  if (phone.length === 10) {
    return `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
  }
  
  return phone;
};

export const getCreditScoreColor = (score) => {
  if (score >= 750) return 'text-green-600';
  if (score >= 650) return 'text-yellow-600';
  return 'text-red-600';
};

export const getCreditScoreBg = (score) => {
  if (score >= 750) return 'bg-green-100';
  if (score >= 650) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const getAccountStatusLabel = (status) => {
  const statusMap = {
    '11': 'Active',
    '13': 'Closed',
    '53': 'Written Off',
    '71': 'Active',
  };
  
  return statusMap[status] || status;
};

export const getAccountStatusColor = (status) => {
  const colorMap = {
    '11': 'bg-green-100 text-green-800',
    '13': 'bg-gray-100 text-gray-800',
    '53': 'bg-red-100 text-red-800',
    '71': 'bg-blue-100 text-blue-800',
  };
  
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getAccountTypeLabel = (type) => {
  const typeMap = {
    '10': 'Credit Card',
    '51': 'Personal Loan',
    '52': 'Business Loan',
  };
  
  return typeMap[type] || type;
};

export const truncateText = (text, length = 50) => {
  if (!text) return 'N/A';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const getCreditScoreRange = (score) => {
  if (score >= 750) return { min: 750, max: 900, label: 'Excellent' };
  if (score >= 650) return { min: 650, max: 749, label: 'Good' };
  if (score >= 550) return { min: 550, max: 649, label: 'Fair' };
  return { min: 300, max: 549, label: 'Poor' };
};