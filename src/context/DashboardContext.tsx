import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { WidgetConfig, WidgetType } from '../types/widget';

type State = { widgets: WidgetConfig[] };

type Action =
  | { type: 'ADD_WIDGET'; payload: WidgetConfig }
  | { type: 'REMOVE_WIDGET'; payload: string }
  | { type: 'UPDATE_WIDGET'; payload: WidgetConfig }
  | { type: 'REORDER_WIDGETS'; payload: WidgetConfig[] }
  | { type: 'SET_WIDGETS'; payload: WidgetConfig[] };

const initialWidgets: WidgetConfig[] = [
  {
    id: 'w1',
    type: WidgetType.LineChart,
    apiUrl: '/api/line',
    refreshInterval: 5000,
    limit: 20,
    title: 'Line Chart',
  },
  {
    id: 'w2',
    type: WidgetType.Table,
    apiUrl: '/api/table',
    refreshInterval: 10000,
    limit: 10,
    title: 'Table',
  },
  {
    id: 'w3',
    type: WidgetType.List,
    apiUrl: '/api/list',
    refreshInterval: 8000,
    limit: 5,
    title: 'List',
  },
];

const initialState: State = { widgets: initialWidgets };

const DashboardContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_WIDGET':
      return { ...state, widgets: [...state.widgets, action.payload] };
    case 'REMOVE_WIDGET':
      return { ...state, widgets: state.widgets.filter(w => w.id !== action.payload) };
    case 'UPDATE_WIDGET':
      return { ...state, widgets: state.widgets.map(w => (w.id === action.payload.id ? action.payload : w)) };
    case 'REORDER_WIDGETS':
      return { ...state, widgets: action.payload };
    case 'SET_WIDGETS':
      return { ...state, widgets: action.payload };
    default:
      return state;
  }
}

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem('dashboard_widgets_v1', JSON.stringify(state.widgets));
    } catch (e) {}
  }, [state.widgets]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dashboard_widgets_v1');
      if (raw) dispatch({ type: 'SET_WIDGETS', payload: JSON.parse(raw) });
    } catch (e) {}
  }, []);

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used inside DashboardProvider');
  return ctx;
};
