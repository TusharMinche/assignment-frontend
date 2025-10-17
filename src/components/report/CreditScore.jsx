import React from 'react';
import Card from '../common/Card';
import { getCreditScoreColor, getCreditScoreBg, getCreditScoreRange } from '../../utils/formatters';

const CreditScore = ({ creditScore }) => {
  const score = creditScore?.score || 0;
  const range = getCreditScoreRange(score);
  const percentage = (score / 900) * 100;

  return (
    <Card title="Credit Score" subtitle="Your current credit score">
      <div className="flex flex-col items-center">
        <div className={`relative w-48 h-48 rounded-full ${getCreditScoreBg(score)} flex items-center justify-center mb-6`}>
          <div className="text-center">
            <p className={`text-6xl font-bold ${getCreditScoreColor(score)}`}>
              {score}
            </p>
            <p className="text-sm text-gray-600 mt-1">/ 900</p>
          </div>
        </div>

        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Poor (300)</span>
            <span>Excellent (900)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                score >= 750 ? 'bg-green-500' : score >= 650 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Score Range</p>
              <p className="text-lg font-semibold text-gray-800">{range.label}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Confidence Level</p>
              <p className="text-lg font-semibold text-gray-800">
                {creditScore?.confidenceLevel || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreditScore;