import React from 'react';
import { WidgetConfig, WidgetType } from '../../types/widget';
import LineChartWidget from '../Widgets/LineChartWidget';
import TableWidget from '../Widgets/TableWidget';
import ListWidget from '../Widgets/ListWidget';

const Widget: React.FC<{ widget: WidgetConfig }> = ({ widget }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-2 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{widget.title}</h3>
      </div>
      <div className="h-full">
        {widget.type === WidgetType.LineChart && <LineChartWidget config={widget} />}
        {widget.type === WidgetType.Table && <TableWidget config={widget} />}
        {widget.type === WidgetType.List && <ListWidget config={widget} />}
      </div>
    </div>
  );
};

export default Widget;
