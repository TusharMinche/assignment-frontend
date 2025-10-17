export const ACCOUNT_TYPES = {
  '10': 'Credit Card',
  '51': 'Personal Loan',
  '52': 'Business Loan',
  'R': 'Revolving Credit',
  'I': 'Installment Loan',
};

export const ACCOUNT_STATUS = {
  '11': 'Active',
  '13': 'Closed',
  '53': 'Written Off',
  '71': 'Active with Issues',
};

export const CREDIT_SCORE_RANGES = {
  EXCELLENT: { min: 750, max: 900, label: 'Excellent' },
  GOOD: { min: 650, max: 749, label: 'Good' },
  FAIR: { min: 550, max: 649, label: 'Fair' },
  POOR: { min: 300, max: 549, label: 'Poor' },
};
