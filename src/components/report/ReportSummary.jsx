import React from 'react';
import { FiCheckCircle, FiXCircle, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

const ReportSummary = ({ reportSummary }) => {
  const summaryItems = [
    {
      icon: FiCheckCircle,
      label: 'Total Accounts',
      value: reportSummary?.totalAccounts || 0,
      color: 'blue',
    },
    {
      icon: FiCheckCircle,
      label: 'Active Accounts',
      value: reportSummary?.activeAccounts || 0,
      color: 'green',
    },
    {
      icon: FiXCircle,
      label: 'Closed Accounts',
      value: reportSummary?.closedAccounts || 0,
      color: 'gray',
    },
    {
      icon: FiDollarSign,
      label: 'Current Balance',
      value: formatCurrency(reportSummary?.currentBalanceAmount),
      color: 'purple',
    },
    {
      icon: FiDollarSign,
      label: 'Secured Amount',
      value: formatCurrency(reportSummary?.securedAccountsAmount),
      color: 'green',
    },
    {
      icon: FiDollarSign,
      label: 'Unsecured Amount',
      value: formatCurrency(reportSummary?.unsecuredAccountsAmount),
      color: 'orange',
    },
    {
      icon: FiAlertCircle,
      label: 'Last 7 Days Enquiries',
      value: reportSummary?.last7DaysCreditEnquiries || 0,
      color: 'red',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    gray: 'bg-gray-100 text-gray-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <Card title="Report Summary" subtitle="Overview of your credit accounts">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className={`inline-flex p-2 rounded-lg mb-2 ${colorClasses[item.color]}`}>
              <item.icon className="text-xl" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-sm text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ReportSummary;