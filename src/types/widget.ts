export enum WidgetType {
  LineChart = 'LINE_CHART',
  Table = 'TABLE',
  List = 'LIST',
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  apiUrl: string;
  refreshInterval: number; // ms
  limit: number;
  title?: string;
}
