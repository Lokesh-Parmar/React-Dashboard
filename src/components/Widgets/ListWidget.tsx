import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { useFetch } from '../../hooks/useFetch';

const ListWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const { data, loading, error, refetch } = useFetch<any[]>(config.apiUrl, config.refreshInterval);

  if (loading) return <div className="p-4">Loading list...</div>;
  if (error) return (
    <div className="p-4">
      <div>Error: {error}</div>
      <button onClick={refetch} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">Retry</button>
    </div>
  );

  const items = Array.isArray(data) ? data.slice(0, config.limit) : [];

  return (
    <ul className="p-2 list-disc list-inside">
      {items.map((it: any) => (
        <li key={it.id}>{it.text || it.name || JSON.stringify(it)}</li>
      ))}
    </ul>
  );
};

export default React.memo(ListWidget);
