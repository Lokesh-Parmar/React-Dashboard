import React, { useMemo } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WidgetConfig } from '../../types/widget';
import { useFetch } from '../../hooks/useFetch';

const LineChartWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const { data, loading, error, refetch } = useFetch<any[]>(config.apiUrl, config.refreshInterval);

  const displayData = useMemo(() => (Array.isArray(data) ? data.slice(0, config.limit) : []), [data, config.limit]);

  if (loading) return <div className="p-4">Loading chart...</div>;
  if (error) return (
    <div className="p-4">
      <div>Error: {error}</div>
      <button onClick={refetch} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">Retry</button>
    </div>
  );

  return (
    <div className="h-64 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(LineChartWidget);
