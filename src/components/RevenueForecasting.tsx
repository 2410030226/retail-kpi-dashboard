import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SalesData } from '../types';
import { addDays, format } from 'date-fns';
import { TrendingUp } from 'lucide-react';

interface RevenueForecastingProps {
  salesData: SalesData[];
}

export const RevenueForecasting: React.FC<RevenueForecastingProps> = ({ salesData }) => {
  // Simple moving average forecasting
  const generateForecast = (data: SalesData[], days: number = 7) => {
    const windowSize = 7; // 7-day moving average
    const lastValues = data.slice(-windowSize).map(d => d.revenue);
    const average = lastValues.reduce((sum, val) => sum + val, 0) / windowSize;
    
    const forecast = [];
    const lastDate = new Date(data[data.length - 1].date);
    
    for (let i = 1; i <= days; i++) {
      const forecastDate = addDays(lastDate, i);
      // Add some randomness to make it more realistic
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const forecastValue = average * (1 + variation);
      
      forecast.push({
        date: format(forecastDate, 'yyyy-MM-dd'),
        revenue: Math.round(forecastValue),
        type: 'forecast' as const,
        formattedDate: format(forecastDate, 'MMM dd'),
      });
    }
    
    return forecast;
  };

  const historicalData = salesData.slice(-14).map(item => ({
    ...item,
    type: 'historical' as const,
    formattedDate: format(new Date(item.date), 'MMM dd'),
  }));

  const forecastData = generateForecast(salesData);
  const combinedData = [...historicalData, ...forecastData];

  const totalForecastRevenue = forecastData.reduce((sum, day) => sum + day.revenue, 0);
  const avgDailyForecast = totalForecastRevenue / forecastData.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Revenue Forecasting</h3>
      </div>

      {/* Forecast Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">7-Day Forecast</p>
          <p className="text-2xl font-bold text-purple-900">${totalForecastRevenue.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Avg Daily Forecast</p>
          <p className="text-2xl font-bold text-blue-900">${Math.round(avgDailyForecast).toLocaleString()}</p>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="formattedDate" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number, name: string, props: any) => [
                `$${value.toLocaleString()}`, 
                props.payload.type === 'forecast' ? 'Forecast' : 'Actual'
              ]}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', stroke: '#3b82f6', r: 4 }}
            />
            {/* Separate line for forecast */}
            <Line 
              type="monotone" 
              dataKey={(entry: any) => entry.type === 'forecast' ? entry.revenue : null}
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5,5"
              dot={{ fill: '#8b5cf6', stroke: '#8b5cf6', r: 4 }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-gray-600">Historical Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-purple-500" style={{ backgroundImage: 'repeating-linear-gradient(to right, #8b5cf6 0, #8b5cf6 3px, transparent 3px, transparent 6px)' }}></div>
          <span className="text-gray-600">Forecast</span>
        </div>
      </div>
    </div>
  );
};