import React, { useState } from 'react';
import Card from '../common/Card';
import CreditAccountCard from './CreditAccountCard';

const CreditAccountsList = ({ creditAccounts }) => {
  const [filter, setFilter] = useState('all');

  const filteredAccounts = creditAccounts?.filter(account => {
    if (filter === 'all') return true;
    if (filter === 'active') return account.accountStatus === '11' || account.accountStatus === '71';
    if (filter === 'closed') return account.accountStatus === '13';
    if (filter === 'overdue') return account.amountOverdue > 0;
    return true;
  }) || [];

  const filters = [
    { value: 'all', label: 'All Accounts' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  return (
    <Card 
      title="Credit Accounts" 
      subtitle={`${creditAccounts?.length || 0} total accounts`}
    >
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No accounts found for the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAccounts.map((account, index) => (
            <CreditAccountCard key={index} account={account} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CreditAccountsList;