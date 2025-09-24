import React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDashboard } from '../../context/DashboardContext';
import Widget from './Widget';
import SortableWidget from './SortableWidget';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useDashboard();
  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = state.widgets.findIndex(w => w.id === String(active.id));
    const newIndex = state.widgets.findIndex(w => w.id === String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(state.widgets, oldIndex, newIndex);
    dispatch({ type: 'REORDER_WIDGETS', payload: reordered });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={state.widgets.map(w => w.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {state.widgets.map((w) => (
            <SortableWidget key={w.id} id={w.id}>
              <Widget widget={w} />
            </SortableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Dashboard;
