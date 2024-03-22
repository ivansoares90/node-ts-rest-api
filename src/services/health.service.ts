export interface HealthStatus {
  status: string;
  timestamp: string;
}

export const getHealthStatus = (): HealthStatus => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}; 