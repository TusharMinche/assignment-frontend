import React from 'react';
import { FiCreditCard, FiDollarSign, FiCalendar, FiMapPin } from 'react-icons/fi';
import { 
  formatCurrency, 
  formatDate, 
  getAccountStatusLabel, 
  getAccountStatusColor,
  getAccountTypeLabel 
} from '../../utils/formatters';

const CreditAccountCard = ({ account }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FiCreditCard className="text-xl text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {account.subscriberName || 'Unknown Bank'}
            </h3>
            <p className="text-sm text-gray-600">{getAccountTypeLabel(account.accountType)}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccountStatusColor(account.accountStatus)}`}>
          {getAccountStatusLabel(account.accountStatus)}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Account Number</p>
          <p className="font-medium text-gray-800">{account.accountNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Open Date</p>
          <p className="font-medium text-gray-800">{formatDate(account.openDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Credit Limit</p>
          <p className="font-semibold text-gray-800">{formatCurrency(account.creditLimit)}</p>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Current Balance</p>
          <p className="font-semibold text-gray-800">{formatCurrency(account.currentBalance)}</p>
        </div>
        <div className="bg-red-50 rounded p-3">
          <p className="text-xs text-red-600 mb-1">Amount Overdue</p>
          <p className="font-semibold text-red-700">{formatCurrency(account.amountOverdue)}</p>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">Payment Rating</p>
          <p className="font-semibold text-gray-800">{account.paymentRating || 'N/A'}</p>
        </div>
      </div>

      {account.address && (
        <div className="border-t pt-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <FiMapPin className="mt-1 flex-shrink-0" />
            <p>
              {[
                account.address.firstLine,
                account.address.secondLine,
                account.address.thirdLine,
                account.address.city,
                account.address.pinCode,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditAccountCard;