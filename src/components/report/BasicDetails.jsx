import React from 'react';
import { FiUser, FiPhone, FiCreditCard, FiCalendar } from 'react-icons/fi';
import Card from '../common/Card';
import { formatDate, formatPhoneNumber } from '../../utils/formatters';

const BasicDetails = ({ basicDetails }) => {
  const details = [
    {
      icon: FiUser,
      label: 'Full Name',
      value: basicDetails?.fullName || 'N/A',
    },
    {
      icon: FiPhone,
      label: 'Mobile Phone',
      value: formatPhoneNumber(basicDetails?.mobilePhone),
    },
    {
      icon: FiCreditCard,
      label: 'PAN Number',
      value: basicDetails?.pan || 'N/A',
    },
    {
      icon: FiCalendar,
      label: 'Date of Birth',
      value: formatDate(basicDetails?.dateOfBirth),
    },
  ];

  return (
    <Card title="Basic Details" subtitle="Personal information from credit report">
      <div className="grid md:grid-cols-2 gap-6">
        {details.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <item.icon className="text-xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BasicDetails;