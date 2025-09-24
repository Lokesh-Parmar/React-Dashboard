import React, { useMemo, useState } from 'react';
import { WidgetConfig } from '../../types/widget';
import { useFetch } from '../../hooks/useFetch';

const TableWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const { data, loading, error, refetch } = useFetch<any[]>(config.apiUrl, config.refreshInterval);
  const [sortKey, setSortKey] = useState<string | null>('id');
  const [desc, setDesc] = useState(false);

  const rows = useMemo(() => {
    if (!Array.isArray(data)) return [];
    let r = data.slice(0, config.limit);
    if (sortKey) r = r.slice().sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    if (desc) r = r.reverse();
    return r;
  }, [data, config.limit, sortKey, desc]);

  if (loading) return <div className="p-4">Loading table...</div>;
  if (error) return (
    <div className="p-4">
      <div>Error: {error}</div>
      <button onClick={refetch} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">Retry</button>
    </div>
  );

  return (
    <div className="p-2 overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left cursor-pointer" onClick={() => { setSortKey('id'); setDesc(!desc); }}>ID</th>
            <th className="px-2 py-1 text-left cursor-pointer" onClick={() => { setSortKey('name'); setDesc(!desc); }}>Name</th>
            <th className="px-2 py-1 text-left cursor-pointer" onClick={() => { setSortKey('score'); setDesc(!desc); }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any) => (
            <tr key={r.id} className="border-t">
              <td className="px-2 py-2">{r.id}</td>
              <td className="px-2 py-2">{r.name}</td>
              <td className="px-2 py-2">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TableWidget);
